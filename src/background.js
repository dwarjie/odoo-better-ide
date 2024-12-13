import editorRender from "./lib/EditorRender?script&module";

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
      console.log("ON");
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
          allFrames: true,
        },
        files: [editorRender],
        world: "MAIN",
      });
    } else if (nextState === "OFF") {
      console.log("OFF");
      // TODO: Remove the Code Mirror in the browser
    }
  }
});
