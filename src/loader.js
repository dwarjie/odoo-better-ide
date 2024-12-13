import editorRender from "./lib/EditorRender?script&module";

(function () {
  const scriptElem = document.createElement("script");
  scriptElem.type = "module";
  scriptElem.src = chrome.runtime.getURL(editorRender);
  (document.head || document.documentElement).appendChild(scriptElem);
  console.log(`Script ${scriptElem}`);
})();
