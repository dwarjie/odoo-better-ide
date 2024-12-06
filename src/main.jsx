import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"
import './index.css'

const root = document.querySelector(".o_field_code")

if (root) {
  console.log(root)
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  console.log("Not working")
}
