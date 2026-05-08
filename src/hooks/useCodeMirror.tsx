import { codeMirrorService } from '@/services/CodeMirror.service';
import { Logger } from '@/services/Logger.service';
import { odooService } from '@/services/Odoo.service';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';
import { getModelIdElem } from '@/utils';
import { getFontFamily, getFontSize } from '@/utils/Config.utils';
import { fetchModelIdValue } from '@/utils/OdooRPC.utils';
import { autocompletion } from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';
import { indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { basicSetup } from 'codemirror';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useFontConfig from './useFontConfig';
import useLanguageConfig from './useLanguageConfig';
import useThemeConfig from './useThemeConfig';

interface Props {
	odooVersion: number;
	initialDoc: string;
	config: EditorConfigType;
	mode: string;
	onChange?: (state: EditorState) => void;
}

type UseCodeMirrorReturn<T extends Element> = [
	React.RefObject<T | null>,
	EditorView | null,
	(content: string) => void,
	() => void,
];

const useCodeMirror = <T extends Element>({
	odooVersion,
	initialDoc,
	config,
	mode,
	onChange,
}: Props): UseCodeMirrorReturn<T> => {
	const refContainer = useRef<T | null>(null);
	const editorViewRef = useRef<EditorView | null>(null);
	const [editorView, setEditorView] = useState<EditorView | null>(null);

	// Config compartment
	const { fontFamilyCompartment, fontSizeCompartment } = useFontConfig({
		editorView,
		config,
	});
	const { languageCompartment } = useLanguageConfig({
		editorView,
		mode,
		odooVersion,
	});
	const { themeCompartment } = useThemeConfig({
		editorView,
		theme: config.theme,
	});

	const customCompletionIconTheme = EditorView.theme({
		// Fields / data
		'.cm-completionIcon-property::after': { content: '"○"' }, // field
		'.cm-completionIcon-variable::after': { content: '"◈"' }, // variable
		'.cm-completionIcon-constant::after': { content: '"◆"' }, // constant value

		// Callables
		'.cm-completionIcon-function::after': { content: '"ƒ"' }, // function
		'.cm-completionIcon-method::after': { content: '"⊕"' }, // method

		// Structure / types
		'.cm-completionIcon-class::after': { content: '"⬡"' }, // class
		'.cm-completionIcon-interface::after': { content: '"◻"' }, // interface
		'.cm-completionIcon-type::after': { content: '"⬟"', fontSize: '10px' }, // type
		'.cm-completionIcon-enum::after': { content: '"≡"' }, // enum

		// Other
		'.cm-completionIcon-keyword::after': { content: '"⌘"' }, // keyword
		'.cm-completionIcon-namespace::after': { content: '"⬚"' }, // namespace
		'.cm-completionIcon-text::after': { content: '"❝"' }, // text/snippet
	});

	useEffect(() => {
		if (!refContainer.current) return;

		const state = EditorState.create({
			doc: initialDoc,
			extensions: [
				autocompletion(),
				basicSetup,
				indentUnit.of('    '),
				keymap.of([indentWithTab]),
				indentationMarkers(),
				themeCompartment.of(codeMirrorService.getTheme(config.theme)),
				languageCompartment.of(
					codeMirrorService.getCompletion(mode, odooVersion),
				),
				fontFamilyCompartment.of(getFontFamily(config)),
				fontSizeCompartment.of(getFontSize(config)),
				EditorView.updateListener.of((update) => {
					if (update.docChanged && onChange) {
						onChange && onChange(update.state);
					}
				}),
				customCompletionIconTheme,
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

	const initializeCompletion = useCallback(() => {
		const initialize = async () => {
			const resModel = await odooService.getPageModel();
			if (!resModel) return;
			codeMirrorService.setPageModel(resModel);

			const modelIdElem = getModelIdElem(odooVersion);
			if (!modelIdElem) return;

			const modelName = await fetchModelIdValue(resModel, odooVersion);
			if (!modelName) return;

			codeMirrorService.setCompletionModel(modelName);
		};

		initialize();
	}, []);

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

	return [
		refContainer,
		editorView,
		updateCodeMirrorContent,
		initializeCompletion,
	];
};

export default useCodeMirror;
