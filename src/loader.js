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
})();
