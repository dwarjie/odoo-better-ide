import { useState, useEffect, useCallback, useRef } from "react";
import { setEditorValue } from "../../utils/aceHelper";
import useCodeMirror from "../../utils/useCodeMirror";
import "../index.css"

function Editor({ ace, initialDoc }) {
  const aceEditor = useRef(ace);
  const [docValue, setDocValue] = useState(initialDoc);
  const [userConfig, setUserConfig] = useState({});
  const size = { fontSize: `${userConfig.fontSize}px` };

  useEffect(() => {
    window.postMessage({ getConfig: true });
  }, []);

  const handleDocChange = useCallback(
    (state) => {
      const val = state.doc.toString()
      setDocValue(val)

      const editor = aceEditor.current || undefined;
      if (editor) {
        let value = setEditorValue(editor, val);
      }
    },
    [aceEditor.current],
  );

  window.addEventListener(
    "message",
    (event) => {
      if (event.data.isConfig) {
        const config = {
          isEnabled: event.data.isEnabled,
          theme: event.data.theme,
          fontSize: event.data.fontSize,
        };
        setUserConfig(config);
      }
    },
    false,
  );

  const [refContainer, editorView] = useCodeMirror({initialDoc: docValue, onChange: handleDocChange, userTheme: userConfig.theme})
  return (
    <div className="editor-wrapper" ref={refContainer} style={size}>
    </div>
  );
}

export default Editor;
