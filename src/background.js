const USER_CONFIG = {
  isEnabled: false,
  theme: "basic-light",
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.reload) {
    try {
      chrome.tabs
        .query({
          active: true,
          currentWindow: true,
        })
        .then((tab) => {
          console.log(tab);
          chrome.tabs.reload(tab.id);
        });
      return true;
    } catch (err) {
      console.log(`Not possible to reload page: ${err}`);
      return false;
    }
  }
});
