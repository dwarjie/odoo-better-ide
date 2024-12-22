import editorRender from "./lib/EditorRender?script&module";

const USER_CONFIG = {
  isEnabled: false,
  theme: "light",
  fontSize: 10,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync
    .set(USER_CONFIG)
    .then(() => {
      console.log(`Initial User config saved`);
    })
    .catch((err) => {
      console.log(`Error saving initial user config: ${err}`);
    });
});

const odooUrl = "https://demo";
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(odooUrl)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

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
