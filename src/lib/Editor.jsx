import { useState, useEffect, useCallback, useRef} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from "@codemirror/lang-python"
import { getEditorValue, setEditorValue } from '../../utils/aceHelper';

function Editor({ ace }) {
  let aceEditor = useRef(ace)
  const valueRef = useRef(`print(Hello Odoo'ers!)`)
  const [docValue, setDocValue] = useState(valueRef.current)

  useEffect(() => {
    const editor = aceEditor.current || undefined
    if (editor) {
      let value = getEditorValue(editor)
      setDocValue(value)
    }
  }, [])

  const handleDocChange = useCallback((val, viewUpdate) => {
    setDocValue(val)

    const editor = aceEditor.current || undefined
    if (editor) {
      let value = setEditorValue(editor, val)
    }
  }, [aceEditor.current, docValue])

  return <CodeMirror value={docValue} extensions={[python()]} onChange={handleDocChange} />;
}
export default Editor;
