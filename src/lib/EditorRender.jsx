import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Editor from './Editor' 

const aceEditor = document.querySelector(".ace_editor")
const codeMirrorWrapper = document.createElement("div")
aceEditor.insertAdjacentElement("afterend", codeMirrorWrapper)

if (codeMirrorWrapper && aceEditor) {
  createRoot(codeMirrorWrapper).render(
    <StrictMode>
      <Editor />
    </StrictMode>
  )
} else {
  console.log("Not working")
}
