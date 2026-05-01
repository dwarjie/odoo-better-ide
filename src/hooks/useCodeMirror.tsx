import React, { useCallback, useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { Compartment, EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { Logger } from '@/services/Logger.service';
import useLanguageConfig from './useLanguageConfig';
import { codeMirrorService } from '@/services/CodeMirror.service';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';
import useThemeConfig from './useThemeConfig';

interface Props {
	initialDoc: string;
	config: EditorConfigType;
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
	config,
	mode,
	onChange,
}: Props): UseCodeMirrorReturn<T> => {
	const refContainer = useRef<T | null>(null);
	const [editorView, setEditorView] = React.useState<EditorView | null>(null);
	const editorViewRef = useRef<EditorView | null>(null);

	// Config compartment
	const fontFamilyCompartment = useRef<Compartment>(new Compartment());
	const fontSizeCompartment = useRef<Compartment>(new Compartment());
	const { languageCompartment } = useLanguageConfig({
		editorView,
		mode,
	});
	const { themeCompartment } = useThemeConfig({
		editorView,
		theme: config.theme,
	});

	const getFontFamily = () => {
		return EditorView.theme({
			'.cm-content': {
				fontFamily: `"${config.fontFamily}", monospace`,
			},
		});
	};

	const getFontSize = () => {
		return EditorView.theme({
			'.cm-content, .cm-gutter': {
				fontSize: `${config.fontSize}px`,
			},
		});
	};

	useEffect(() => {
		if (!refContainer.current) return;

		const state = EditorState.create({
			doc: initialDoc,
			extensions: [
				basicSetup,
				indentUnit.of('    '),
				keymap.of([indentWithTab]),
				indentationMarkers(),
				themeCompartment.of(codeMirrorService.getTheme(config.theme)),
				languageCompartment.of(codeMirrorService.getLanguageMode(mode)),
				fontFamilyCompartment.current.of(getFontFamily()),
				fontSizeCompartment.current.of(getFontSize()),
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

	// Reconfigure font family when config.fontFamily changes
	useEffect(() => {
		const view = editorViewRef.current;
		if (!view) return;

		view.dispatch({
			effects: fontFamilyCompartment.current.reconfigure(getFontFamily()),
		});
	}, [config.fontFamily]);

	// Reconfigure font size when config.fontSize changes
	useEffect(() => {
		const view = editorViewRef.current;
		if (!view) return;

		view.dispatch({
			effects: fontSizeCompartment.current.reconfigure(getFontSize()),
		});
	}, [config.fontSize]);

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
