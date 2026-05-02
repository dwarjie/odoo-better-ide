import { Compartment } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import { codeMirrorService } from '@/services/CodeMirror.service';

interface Props {
	editorView: EditorView | null;
	mode: string;
}

interface UseLanguageConfigReturn {
	languageCompartment: Compartment;
}

export default function useLanguageConfig({
	editorView,
	mode,
}: Props): UseLanguageConfigReturn {
	const languageCompartment = useRef<Compartment>(new Compartment());

	useEffect(() => {
		if (!editorView) return;

		const extension = codeMirrorService.getLanguageMode(mode);

		editorView.dispatch({
			effects: languageCompartment.current.reconfigure(extension),
		});
	}, [mode, editorView]);

	return {
		languageCompartment: languageCompartment.current,
	};
}
