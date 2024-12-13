import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Editor from './Editor' 

const aceEditor = document.querySelector(".ace_editor")
console.log(`Ace editor: ${aceEditor}`)
console.log(`Window Odoo`, window.odoo)
const codeMirrorWrapper = document.createElement("div")
console.log(`Code Mirror: ${codeMirrorWrapper}`)

if (codeMirrorWrapper && aceEditor) {
  aceEditor.insertAdjacentElement("afterend", codeMirrorWrapper)
  createRoot(codeMirrorWrapper).render(
    <StrictMode>
      <Editor />
    </StrictMode>
  )
} else {
  console.log("Not working")
}
