const getEditor = (editorElement) => {
  if (!editorElement) return false;

  return window.ace.edit(editorElement);
};

const getEditorValue = (editorElement) => {
  if (!editorElement) return false;

  const currentEditor = getEditor(editorElement);
  return currentEditor.getSession().getValue();
};

const setEditorValue = (editorElement, val) => {
  if (!editorElement) return false;

  const currentEditor = getEditor(editorElement);
  currentEditor.getSession().setValue(val);

  return true;
};

export { getEditor, getEditorValue, setEditorValue };
