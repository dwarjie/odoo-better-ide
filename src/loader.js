import editorRender from "./lib/EditorRender?script&module";
import { elementReady } from "../utils/es6-element-ready";

(async function () {
  const config = await chrome.storage.sync.get().then((result) => {
    console.log(result);
    if (result.isEnabled) {
      elementReady(".ace_editor").then((element) => {
        console.log(`Element: ${element}`);
        const scriptElem = document.createElement("script");
        scriptElem.type = "module";
        scriptElem.src = chrome.runtime.getURL(editorRender);
        (document.head || document.documentElement).appendChild(scriptElem);
      });
    }
  });

  window.addEventListener("message", (event) => {
    if (event.data.getConfig) {
      chrome.storage.sync
        .get()
        .then((result) => {
          event.source.postMessage({ ...result, isConfig: true }, event.origin);
          console.log(`Post message event: ${JSON.stringify(event.data)}`);
        })
        .catch((err) =>
          console.log(`Error sending message to page script: ${err}`),
        );
    }
  });
})();
