import { Compartment } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';
import { getFontFamily, getFontSize } from '@/utils/Config.utils';

interface Props {
	editorView: EditorView | null;
	config: EditorConfigType;
}

interface UseFontConfigReturn {
	fontFamilyCompartment: Compartment;
	fontSizeCompartment: Compartment;
}

export default function useFontConfig({
	editorView,
	config,
}: Props): UseFontConfigReturn {
	const fontFamilyCompartment = useRef<Compartment>(new Compartment());
	const fontSizeCompartment = useRef<Compartment>(new Compartment());

	useEffect(() => {
		const view = editorView;
		if (!view) return;

		view.dispatch({
			effects: fontFamilyCompartment.current.reconfigure(getFontFamily(config)),
		});
	}, [config.fontFamily]);

	useEffect(() => {
		const view = editorView;
		if (!view) return;

		view.dispatch({
			effects: fontSizeCompartment.current.reconfigure(getFontSize(config)),
		});
	}, [config.fontSize]);

	return {
		fontFamilyCompartment: fontFamilyCompartment.current,
		fontSizeCompartment: fontSizeCompartment.current,
	};
}
