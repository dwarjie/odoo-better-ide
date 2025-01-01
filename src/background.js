const USER_CONFIG = {
  isEnabled: false,
  theme: "basic-light",
  fontSize: 11,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(USER_CONFIG).catch((err) => {
    console.error(`Error saving initial user config: ${err}`);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.reload) {
    try {
      chrome.tabs
        .query({
          active: true,
          currentWindow: true,
        })
        .then((tab) => {
          chrome.tabs.reload(tab.id);
        });
      return true;
    } catch (err) {
      console.error(`Not possible to reload page: ${err}`);
      return false;
    }
  }
});
