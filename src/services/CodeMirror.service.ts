import { python } from '@codemirror/lang-python';
import { xml } from '@codemirror/lang-xml';
import { json } from '@codemirror/lang-json';
import { LanguageSupport } from '@codemirror/language';
import { EditorView } from 'codemirror';

export class CodeMirrorService {
	private static codeMirrorInstance: CodeMirrorService | null = null;

	static getInstance(): CodeMirrorService {
		if (!CodeMirrorService.codeMirrorInstance) {
			CodeMirrorService.codeMirrorInstance = new CodeMirrorService();
		}

		return CodeMirrorService.codeMirrorInstance;
	}

	/**
	 * Get the language mode based on the mode string
	 *
	 * @param mode - The mode string
	 * @returns The language mode
	 */
	getLanguageMode(mode: string): LanguageSupport {
		switch (mode) {
			case 'python':
				return python();
				break;
			case 'qweb':
			case 'xml':
				return xml();
				break;
			case 'javascript':
				return json();
				break;
			default:
				return python();
				break;
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
