import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getEditorValue } from "../../utils/aceHelper";
import Editor from "./Editor";
import "../index.css";

const observer = new MutationObserver((mutationRecord) => {
  let aceEditor = document.querySelector(".ace_editor");
  let codeMirror = document.querySelector(".codemirror-editor-wrapper");
  if (!aceEditor || codeMirror) return;

  const codeMirrorWrapper = document.createElement("div");
  const discardButton = document.querySelector("button.o_form_button_cancel");

  if (codeMirrorWrapper && aceEditor) {
    let languageMode = aceEditor.dataset.mode || "qweb";
    aceEditor.style = `display: none;`;
    const editor = aceEditor || `print("Hello")`;
    let value = getEditorValue(editor);
    aceEditor.insertAdjacentElement("afterend", codeMirrorWrapper);
    createRoot(codeMirrorWrapper).render(
      <StrictMode>
        <Editor
          ace={aceEditor}
          initialDoc={value}
          discardButton={discardButton}
          languageMode={languageMode}
        />
      </StrictMode>,
    );
  } else {
    console.warn("Odoo Better IDE does not support yet");
  }
});
observer.observe(document.documentElement, {
  subtree: true,
  attributes: true,
  attributeFilter: ["data-mode"]
});
