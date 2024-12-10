chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const odooUrl = "https://demo";
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(odooUrl)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      chrome.scripting.registerContentScripts([
        {
          id: "editor-view",
          js: ["editor-render.iife.js"],
          persistAcrossSessions: false,
          matches: ["<all_urls>"],
          runAt: "document_start",
          world: "ISOLATED",
        },
      ]);
      // chrome.scripting.executeScript({
      //   target: { tabId: tab.id },
      //   files: [contentScript],
      // });
    } else if (nextState === "OFF") {
      console.log("Turned off");
    }
  }
});
