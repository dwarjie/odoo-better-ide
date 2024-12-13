import { useState, useEffect, useCallback, useRef} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from "@codemirror/lang-python"
import { getEditor, getEditorValue, setEditorValue } from '../../utils/aceHelper';

function Editor({ ace }) {
  let aceEditor = useRef(ace)
  const [initialDoc, setInitialDoc] = useState(`print("Hello Odoo'ers!")`)

  useEffect(() => {
    const editor = aceEditor.current || undefined
    if (editor) {
      let value = getEditorValue(editor)
      setInitialDoc(value)
    }
  }, [])

  const onChange = useCallback((val, viewUpdate) => {
    setInitialDoc(val)

    const editor = aceEditor.current || undefined
    if (editor) {
      let value = setEditorValue(editor, val)
    }
  }, [aceEditor.current]);

  return <CodeMirror value={initialDoc} extensions={[python()]} onChange={onChange} />;
}
export default Editor;
