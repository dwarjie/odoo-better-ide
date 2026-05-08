import { EditorConfig } from '@/types/Config.types';
import { EditorView } from 'codemirror';

export const getFontFamily = (config: EditorConfig) => {
	return EditorView.theme({
		'.cm-content': {
			fontFamily: `"${config.fontFamily}", monospace`,
		},
	});
};

export const getFontSize = (config: EditorConfig) => {
	return EditorView.theme({
		'.cm-content, .cm-gutter': {
			fontSize: `${config.fontSize}px`,
		},
	});
};
