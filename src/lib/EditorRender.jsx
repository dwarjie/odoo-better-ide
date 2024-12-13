import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Editor from './Editor' 

const aceEditor = document.querySelector(".ace_editor")
const codeMirrorWrapper = document.createElement("div")

if (codeMirrorWrapper && aceEditor) {
  aceEditor.insertAdjacentElement("afterend", codeMirrorWrapper)
  createRoot(codeMirrorWrapper).render(
    <StrictMode>
      <Editor ace={aceEditor}/>
    </StrictMode>
  )
} else {
  console.log("Not Odoo or no code editor")
}
