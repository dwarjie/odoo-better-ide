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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.reload) {
    try {
      const [tab] = chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      chrome.tabs.reload(tab.id);
      sendResponse({ message: `Page reloaded` });
      return true;
    } catch (err) {
      sendResponse({ message: `Not possible to reload page: ${err}` });
      return false;
    }
  }
});
