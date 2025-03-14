import editorRender from "./lib/EditorRender?script&module";

(async function () {
  const config = await chrome.storage.sync.get().then((result) => {
    if (result.isEnabled) {
      const scriptElem = document.createElement("script");
      scriptElem.type = "module";
      scriptElem.src = chrome.runtime.getURL(editorRender);
      (document.head || document.documentElement).appendChild(scriptElem);
    }
  });

  // Event Listeners to sync Editor with USER_CONFIG
  window.addEventListener("message", (event) => {
    if (event.data.getConfig) {
      chrome.storage.sync
        .get()
        .then((result) => {
          event.source.postMessage({ ...result, isConfig: true }, event.origin);
        })
        .catch((err) =>
          console.error(`Error sending message to page script: ${err}`),
        );
    } else if (event.data.language) {
      chrome.storage.sync
        .set({ language: event.data.language })
        .catch((err) => console.error(`Error updating language: ${err}`));
    }
  });
})();
