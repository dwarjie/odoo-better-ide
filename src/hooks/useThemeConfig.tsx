import { Compartment } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import { codeMirrorService } from '@/services/CodeMirror.service';
import { EditorTheme } from '@/types/Config.types';

interface Props {
	editorView: EditorView | null;
	theme: EditorTheme;
}

interface UseThemeConfigReturn {
	themeCompartment: Compartment;
}

export default function useThemeConfig({
	editorView,
	theme,
}: Props): UseThemeConfigReturn {
	const themeCompartment = useRef<Compartment>(new Compartment());

	useEffect(() => {
		if (!editorView) return;

		const extension = codeMirrorService.getTheme(theme);

		editorView.dispatch({
			effects: themeCompartment.current.reconfigure(extension),
		});
	}, [theme, editorView]);

	return {
		themeCompartment: themeCompartment.current,
	};
}
