import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from "@codemirror/lang-python"

function Editor() {
  const initialValue = `# Write you code here . . .`
  const [value, setValue] = React.useState(initialValue);
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return <CodeMirror value={value} extensions={[python()]} onChange={onChange} />;
}
export default Editor;
