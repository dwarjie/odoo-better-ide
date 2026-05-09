import { EditorTheme } from '@/types/Config.types';
import {
	Completion,
	CompletionContext,
	CompletionResult,
	startCompletion,
} from '@codemirror/autocomplete';
import { json } from '@codemirror/lang-json';
import {
	globalCompletion,
	localCompletionSource,
	pythonLanguage,
} from '@codemirror/lang-python';
import {
	autoCloseTags,
	completeFromSchema,
	xml,
	xmlLanguage,
} from '@codemirror/lang-xml';
import { EditorView } from 'codemirror';

// themes
import { getModelCompletions } from '@/data/OdooModelCompletion';
import { buildOdooXmlSchemaV19 } from '@/data/OdooXMLCompletion.v19';
import { OdooFieldMap, XmlSchema } from '@/types';
import { filterPythonOptions } from '@/utils/Completion.utils';
import { Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { andromeda } from '@fsegurai/codemirror-theme-andromeda';
import { basicDark } from '@fsegurai/codemirror-theme-basic-dark';
import { basicLight } from '@fsegurai/codemirror-theme-basic-light';
import { catppuccinMocha as catpuccin } from '@fsegurai/codemirror-theme-catppuccin-mocha';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { highContrastDark } from '@fsegurai/codemirror-theme-high-contrast-dark';
import { highContrastLight } from '@fsegurai/codemirror-theme-high-contrast-light';
import { monokai } from '@fsegurai/codemirror-theme-monokai';
import { solarizedDark } from '@fsegurai/codemirror-theme-solarized-dark';
import { solarizedLight } from '@fsegurai/codemirror-theme-solarized-light';
import { tokyoNightDay } from '@fsegurai/codemirror-theme-tokyo-night-day';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';
import { vsCodeDark as vscodeDark } from '@fsegurai/codemirror-theme-vscode-dark';
import { vsCodeLight as vscodeLight } from '@fsegurai/codemirror-theme-vscode-light';
import { odooService } from './Odoo.service';
import { buildOdooXmlSchemaV18 } from '@/data/OdooXMLCompletion.v18';
import { buildOdooXmlSchemaV17 } from '@/data/OdooXMLCompletion.v17';
import { buildOdooXmlSchemaV16 } from '@/data/OdooXMLCompletion.v16';
import { buildOdooXmlSchemaV15 } from '@/data/OdooXMLCompletion.v15';
import { autoCloseSelfClosingTag } from '@/extension/autoCloseSelfClosingTag';

export class CodeMirrorService {
	private static codeMirrorInstance: CodeMirrorService | null = null;

	private currentOdooVersion: number = 0;
	private completionModel: string | null = null;
	private pageModel: string | null = null;
	// Cache keyed by model name — persists for the lifetime
	// of the singleton (i.e. the page session)
	private fieldCache = new Map<string, OdooFieldMap>();

	static getInstance(): CodeMirrorService {
		if (!CodeMirrorService.codeMirrorInstance) {
			CodeMirrorService.codeMirrorInstance = new CodeMirrorService();
		}

		return CodeMirrorService.codeMirrorInstance;
	}

	setCompletionModel(model: string): void {
		this.completionModel = model;
	}

	setPageModel(model: string): void {
		this.pageModel = model;
	}

	private async getFields(model: string | null): Promise<OdooFieldMap> {
		if (!model) return {};
		// Return cached fields if available
		if (this.fieldCache.has(model)) {
			return this.fieldCache.get(model)!;
		}

		// Fetch and cache
		const fields = await odooService.fetchModelFields(model);
		if (fields) {
			this.fieldCache.set(model, fields);
		}

		return fields ?? {};
	}

	async getXmlSchema(odooVersion: number): Promise<XmlSchema | null> {
		if (!this.completionModel) return null;

		const fieldCompletions = await this.getFields(this.completionModel);
		if (!fieldCompletions) return null;

		if (odooVersion >= 19) return buildOdooXmlSchemaV19(fieldCompletions);
		if (odooVersion >= 18) return buildOdooXmlSchemaV18(fieldCompletions);
		if (odooVersion >= 17) return buildOdooXmlSchemaV17(fieldCompletions);
		if (odooVersion >= 16) return buildOdooXmlSchemaV16(fieldCompletions);
		if (odooVersion >= 15) return buildOdooXmlSchemaV15(fieldCompletions);

		return buildOdooXmlSchemaV15(fieldCompletions);
	}

	private buildFieldCompletions(fields: OdooFieldMap): Completion[] {
		return Object.entries(fields).map(([fieldName, field]) => ({
			label: fieldName,
			detail: field.type,
			info: field.help ?? field.string,
			type: 'property',
			boost: 99,
		}));
	}

	private async customOdooPythonCompletion(
		context: CompletionContext,
	): Promise<CompletionResult | null> {
		const charBefore = context.state.sliceDoc(context.pos - 1, context.pos);
		const word = context.matchBefore(/\w+(\.\w+)*$/);

		// Dot trigger → show model fields
		if (charBefore === '.') {
			if (!this.completionModel) return null;

			const fields = await this.getFields(this.completionModel);
			return {
				from: context.pos,
				options: this.buildFieldCompletions(fields),
				validFor: /^\w*$/,
			};
		}

		if (!word) return null;
		if (word.from === word.to && !context.explicit) return null;

		const initialCompletion = await globalCompletion(context);
		if (!initialCompletion) return null;

		// Merge boosted field completions into global completion
		// so they always appear but are prioritized
		if (this.completionModel || this.pageModel) {
			const fields = await this.getFields(this.completionModel);
			const fieldCompletions = this.buildFieldCompletions(fields);
			const modelCompletions = getModelCompletions(this.pageModel);

			return {
				...initialCompletion,
				options: [
					...modelCompletions,
					...fieldCompletions,
					...filterPythonOptions(initialCompletion.options),
				],
			};
		}

		return {
			...initialCompletion,
			options: filterPythonOptions(initialCompletion.options),
		};
	}

	private async customOdooXmlCompletion(
		context: CompletionContext,
	): Promise<CompletionResult | null> {
		const schema = await this.getXmlSchema(this.currentOdooVersion);
		if (!schema?.elements || !schema?.attributes) return null;

		const completionSource = completeFromSchema(
			schema.elements,
			schema.attributes,
		);

		return completionSource(context);
	}

	getCompletion(mode: string, odooVersion: number): Extension | Extension[] {
		this.currentOdooVersion = odooVersion;

		switch (mode) {
			case 'python':
				return [
					pythonLanguage,
					pythonLanguage.data.of({
						autocomplete: this.customOdooPythonCompletion.bind(this),
					}),
					pythonLanguage.data.of({
						autocomplete: localCompletionSource,
					}),
				];
			case 'qweb':
			case 'xml':
				return [
					autoCloseTags,
					xmlLanguage,
					xmlLanguage.data.of({
						autocomplete: this.customOdooXmlCompletion.bind(this),
					}),
					autoCloseSelfClosingTag,
					// Re-trigger completion when cursor enters quotes
					EditorView.updateListener.of((update) => {
						if (!update.docChanged) return;
						const cursor = update.state.selection.main.head;
						const charBefore = update.state.sliceDoc(cursor - 1, cursor);
						const charAfter = update.state.sliceDoc(cursor, cursor + 1);

						// Cursor is now sitting inside "" — explicitly start completion
						if (charBefore === '"' && charAfter === '"') {
							startCompletion(update.view);
						}
					}),
				];
			case 'javascript':
				return [json()];
			default:
				return [xml()];
		}
	}

	getTheme(theme: EditorTheme): Extension {
		switch (theme) {
			case 'andromeda':
				return andromeda;
			case 'basic-dark':
				return basicDark;
			case 'basic-light':
				return basicLight;
			case 'catpuccin':
				return catpuccin;
			case 'github-dark':
				return githubDark;
			case 'github-light':
				return githubLight;
			case 'high-contrast-dark':
				return highContrastDark;
			case 'high-contrast-light':
				return highContrastLight;
			case 'monokai':
				return monokai;
			case 'one-dark':
				return oneDark;
			case 'solarized-dark':
				return solarizedDark;
			case 'solarized-light':
				return solarizedLight;
			case 'tokyo-night-storm':
				return tokyoNightStorm;
			case 'tokyo-night-day':
				return tokyoNightDay;
			case 'vscode-dark':
				return vscodeDark;
			case 'vscode-light':
				return vscodeLight;
			default:
				return oneDark;
		}
	}

	/**
	 * Set the value of the editor view
	 *
	 * @param editorView - The editor view
	 * @param value - The value to set
	 */
	setValue(editorView: EditorView, value: string) {
		editorView.dispatch({
			changes: {
				from: 0,
				to: editorView.state.doc.length,
				insert: value,
			},
		});
	}
}

export const codeMirrorService = CodeMirrorService.getInstance();
