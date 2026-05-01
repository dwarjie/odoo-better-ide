import React, { useCallback, useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { Logger } from '@/services/Logger.service';
import useLanguageConfig from './useLanguageConfig';
import { oneDark } from '@codemirror/theme-one-dark';
import { codeMirrorService } from '@/services/CodeMirror.service';

interface Props {
	initialDoc: string;
	mode: string;
	onChange?: (state: EditorState) => void;
}

type UseCodeMirrorReturn<T extends Element> = [
	React.RefObject<T | null>,
	EditorView | null,
	(content: string) => void,
];

const useCodeMirror = <T extends Element>({
	initialDoc,
	mode,
	onChange,
}: Props): UseCodeMirrorReturn<T> => {
	const refContainer = useRef<T | null>(null);
	const [editorView, setEditorView] = React.useState<EditorView | null>(null);
	const editorViewRef = useRef<EditorView | null>(null);

	const { languageCompartment } = useLanguageConfig({
		editorView,
		mode,
	});

	useEffect(() => {
		if (!refContainer.current) return;

		const fontTheme = EditorView.theme({
			'.cm-content': {
				fontFamily: '"JetBrains Mono", monospace',
			},
		});

		const state = EditorState.create({
			doc: initialDoc,
			extensions: [
				oneDark,
				fontTheme,
				basicSetup,
				indentUnit.of('    '),
				keymap.of([indentWithTab]),
				languageCompartment.of(codeMirrorService.getLanguageMode(mode)),
				indentationMarkers(),
				EditorView.updateListener.of((update) => {
					if (update.docChanged && onChange) {
						onChange && onChange(update.state);
					}
				}),
			],
		});

		const view = new EditorView({
			state,
			parent: refContainer.current,
		});

		editorViewRef.current = view;
		setEditorView(view);

		return () => {
			view.destroy();
			editorViewRef.current = null;
		};
	}, [refContainer]);

	const updateCodeMirrorContent = useCallback((content: string) => {
		const view = editorViewRef.current;
		if (!view) {
			Logger.error('Editor view is not initialized');
			return;
		}

		const currentContent = view.state.doc.toString();
		if (currentContent === content) return;

		codeMirrorService.setValue(view, content);
	}, []);

	return [refContainer, editorView, updateCodeMirrorContent];
};

export default useCodeMirror;
