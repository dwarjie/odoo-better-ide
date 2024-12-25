import { useState, useEffect, useCallback, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { getEditorValue, setEditorValue } from "../../utils/aceHelper";

function Editor({ ace }) {
  let aceEditor = useRef(ace);
  const valueRef = useRef(`print(Hello Odoo'ers!)`);
  const [docValue, setDocValue] = useState(valueRef.current);
  const [userConfig, setUserConfig] = useState({});

  useEffect(() => {
    const editor = aceEditor.current || undefined;
    if (editor) {
      let value = getEditorValue(editor);
      setDocValue(value);
    }
    
    window.postMessage({ getConfig: true });
  }, []);

  window.addEventListener("message", (event) => {
    if (event.data.isConfig) {
      const config = {
        isEnabled: event.data.isEnabled,
        theme: event.data.theme,
        fontSize: event.data.fontSize,
      };
      setUserConfig(config);
    }
  }, false);

  const handleDocChange = useCallback(
    (val, viewUpdate) => {
      setDocValue(val);

      const editor = aceEditor.current || undefined;
      if (editor) {
        let value = setEditorValue(editor, val);
      }
    },
    [aceEditor.current, docValue],
  );

  return (
    <CodeMirror
      value={docValue}
      extensions={[python()]}
      onChange={handleDocChange}
    />
  );
}
export default Editor;
