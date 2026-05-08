import { codeMirrorService } from '@/services/CodeMirror.service';
import { Compartment } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';

interface Props {
	editorView: EditorView | null;
	mode: string;
	odooVersion: number;
}

interface UseLanguageConfigReturn {
	languageCompartment: Compartment;
}

export default function useLanguageConfig({
	editorView,
	mode,
	odooVersion,
}: Props): UseLanguageConfigReturn {
	const languageCompartment = useRef<Compartment>(new Compartment());

	useEffect(() => {
		if (!editorView) return;

		editorView.dispatch({
			effects: languageCompartment.current.reconfigure(
				codeMirrorService.getCompletion(mode, odooVersion),
			),
		});
	}, [mode, editorView]);

	return {
		languageCompartment: languageCompartment.current,
	};
}
