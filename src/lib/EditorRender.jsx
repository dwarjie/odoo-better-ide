import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Editor from './Editor' 

const aceEditor = document.querySelector(".ace_editor")
console.log(`Ace editor: ${aceEditor}`)
const codeMirrorWrapper = document.createElement("div")
console.log(`Code Mirror: ${codeMirrorWrapper}`)
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
