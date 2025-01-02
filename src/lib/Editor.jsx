import { useState, useEffect, useRef } from "react";
import { setEditorValue } from "../../utils/aceHelper";
import useCodeMirror from "../../utils/useCodeMirror";
import "../index.css"

function Editor({ ace, initialDoc, discardButton }) {
  const aceEditor = useRef(ace);
  const [docValue, setDocValue] = useState(initialDoc);
  const [userConfig, setUserConfig] = useState({});
  const size = { fontSize: `${userConfig.fontSize}px` };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.isConfig) {
        const config = {
          isEnabled: event.data.isEnabled,
          theme: event.data.theme,
          fontSize: event.data.fontSize,
        };
        setUserConfig(config);
      }
    };
    window.addEventListener("message", handleMessage);
    window.postMessage({ getConfig: true });

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleDocChange = (state) => {
    const val = state.doc.toString()
    setDocValue(val)

    const editor = aceEditor.current || undefined;
    if (editor) {
      let value = setEditorValue(editor, val);
    }
  };

  const [refContainer, editorView] = useCodeMirror({ initialDoc: docValue, onChange: handleDocChange, userTheme: userConfig.theme })

  useEffect(() => {
    if (!discardButton || !editorView) return;

    const handleDiscard = (event) => {
      editorView.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: initialDoc },
      });
      setDocValue(initialDoc);
    }

    discardButton.addEventListener("click", handleDiscard);
    return () => discardButton.removeEventListener("click", handleDiscard);
  }, [discardButton, editorView, initialDoc]);

  return (
    <div className="editor-wrapper" ref={refContainer} style={size}>
    </div>
  );
}

export default Editor;
