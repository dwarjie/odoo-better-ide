import editorRender from "./lib/EditorRender?script&module";

const scriptElem = document.createElement("script");
scriptElem.type = "module";
scriptElem.src = chrome.runtime.getURL(editorRender);

document.body.appendChild(scriptElem);
