import React, { useCallback, useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { Logger } from "@/services/Logger.service";

interface Props {
	initialDoc: string;
	onChange?: (state: EditorState) => void;
}

type UseCodeMirrorReturn<T extends Element> = [
	React.RefObject<T | null>,
	EditorView | null,
	(content: string) => void,
];

const useCodeMirror = <T extends Element>({
	initialDoc,
	onChange,
}: Props): UseCodeMirrorReturn<T> => {
	const refContainer = useRef<T | null>(null);
	const [editorView, setEditorView] = React.useState<EditorView | null>(null);
	const editorViewRef = useRef<EditorView | null>(null);

	useEffect(() => {
		if (!refContainer.current) return;

		const state = EditorState.create({
			doc: initialDoc,
			extensions: [
				basicSetup,
				EditorView.updateListener.of((update) => {
					if (update.docChanged && onChange) {
						onChange(update.state);
					}
				}),
			],
		});
		if (!state) {
			Logger.error("Failed to create CodeMirror state");
			return;
		}

		const view = new EditorView({
			state,
			parent: refContainer.current,
		});
		if (!view) {
			Logger.error("Failed to create CodeMirror view");
			return;
		}

		editorViewRef.current = view;
		setEditorView(view);

		return () => {
			view.destroy();
			editorViewRef.current = null;
		};
	}, [refContainer]);

	const updateCodeMirrorContent = useCallback((content: string) => {
		const editorView = editorViewRef.current;

		if (!editorView) {
			Logger.error("Editor view is not initialized");
			return;
		}

		const currentContent = editorView.state.doc.toString();
		if (currentContent === content) return;

		editorView.dispatch({
			changes: {
				from: 0,
				to: editorView.state.doc.length,
				insert: content,
			},
		});
	}, []);

	return [refContainer, editorView, updateCodeMirrorContent];
};

export default useCodeMirror;
