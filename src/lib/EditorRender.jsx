import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getEditorValue } from '../../utils/aceHelper'
import Editor from './Editor'
import "../index.css"

const aceEditor = document.querySelector(".ace_editor")
const codeMirrorWrapper = document.createElement("div")

if (codeMirrorWrapper && aceEditor) {
  aceEditor.style = `display: none;`
  const editor = aceEditor || `print("Hello")`;
  let value = getEditorValue(editor);
  aceEditor.insertAdjacentElement("afterend", codeMirrorWrapper)
  createRoot(codeMirrorWrapper).render(
    <StrictMode>
      <Editor ace={aceEditor} initialDoc={value}/>
    </StrictMode>
  )
} else {
  console.warn("Odoo Better IDE does not support yet")
}
