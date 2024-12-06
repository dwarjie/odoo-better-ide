import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from "@codemirror/lang-python"

function App() {
  const initialValue = `# Available variables:
  #  - env: environment on which the action is triggered
  #  - model: model of the record on which the action is triggered; is a void recordset
  #  - record: record on which the action is triggered; may be void
  #  - records: recordset of all records on which the action is triggered in multi-mode; may be void
  #  - time, datetime, dateutil, timezone: useful Python libraries
  #  - float_compare: utility function to compare floats based on specific precision
  #  - b64encode, b64decode: functions to encode/decode binary data
  #  - log: log(message, level='info'): logging function to record debug information in ir.logging table
  #  - _logger: _logger.info(message): logger to emit messages in server logs
  #  - UserError: exception class for raising user-facing warning messages
  #  - Command: x2many commands namespace
  # To return an action, assign: action = {...}
  `
  const [value, setValue] = React.useState(initialValue);
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return <CodeMirror value={value} extensions={[python()]} onChange={onChange} />;
}
export default App;
