import { python } from '@codemirror/lang-python';
import { xml } from '@codemirror/lang-xml';
import { json } from '@codemirror/lang-json';
import { LanguageSupport } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { EditorTheme } from '@/types/Config.types';

// themes
import { andromeda } from '@fsegurai/codemirror-theme-andromeda';
import { basicDark } from '@fsegurai/codemirror-theme-basic-dark';
import { basicLight } from '@fsegurai/codemirror-theme-basic-light';
import { catppuccinMocha as catpuccin } from '@fsegurai/codemirror-theme-catppuccin-mocha';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { highContrastDark } from '@fsegurai/codemirror-theme-high-contrast-dark';
import { highContrastLight } from '@fsegurai/codemirror-theme-high-contrast-light';
import { monokai } from '@fsegurai/codemirror-theme-monokai';
import { oneDark } from '@codemirror/theme-one-dark';
import { solarizedDark } from '@fsegurai/codemirror-theme-solarized-dark';
import { solarizedLight } from '@fsegurai/codemirror-theme-solarized-light';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';
import { tokyoNightDay } from '@fsegurai/codemirror-theme-tokyo-night-day';
import { vsCodeDark as vscodeDark } from '@fsegurai/codemirror-theme-vscode-dark';
import { vsCodeLight as vscodeLight } from '@fsegurai/codemirror-theme-vscode-light';
import { Extension } from '@codemirror/state';

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
			case 'qweb':
			case 'xml':
				return xml();
			case 'javascript':
				return json();
			default:
				return python();
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
