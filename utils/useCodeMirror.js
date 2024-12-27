import { useRef, useState, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { defaultKeymap } from "@codemirror/commands";

const useCodeMirror = ({ initialDoc, onChange }) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState(null);

  useEffect(() => {
    if (!refContainer.current) return;

    const view = new EditorView({
      // state: startState,
      doc: initialDoc,
      extensions: [
        basicSetup,
        python(),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
      parent: refContainer.current,
    });

    setEditorView(view);
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
