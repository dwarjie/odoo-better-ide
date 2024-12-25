const getCurrentTab = (
  callbackFunc,
  queryOptions = { active: true, lastFocusedWindow: true },
) => {
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);

    callbackFunc(tab);
  });
};

export default getCurrentTab;
