import React, { useState, useEffect } from "react";
import "./index.css";

function Popup() {
  const [userConfig, setUserConfig] = useState({});

  useEffect(() => {
    console.log("useEffect");
    chrome.storage.sync
      .get()
      .then((config) => {
        setUserConfig(config);
        console.dir(`User config fetched: ${JSON.stringify(config, null, 2)}`);
      })
      .catch((err) => {
        console.log(`Error fetching user config: ${err}`);
      });
  }, []);

  const saveConfig = (item) => {
    chrome.storage.sync
      .set(item)
      .then(() => console.log(`User config updated: ${JSON.stringify(item)}`))
      .catch((err) => console.log(`Error updating config: ${err}`));
  };

  const handleToggle = () => {
    saveConfig({ isEnabled: !userConfig.isEnabled });
    setUserConfig({ ...userConfig, isEnabled: !userConfig.isEnabled });
  };

  const handleThemeChange = (e) => {
    const newValue = e.target.value;

    saveConfig({ theme: newValue });
    setUserConfig({
      ...userConfig,
      theme: newValue,
    });
  };

  const handleFontSizeChange = (e) => {
    const newValue = e.target.value;

    saveConfig({ fontSize: newValue });
    setUserConfig({
      ...userConfig,
      fontSize: newValue,
    });
  };

  const reloadLoader = () => {
    if (!userConfig.isEnabled) return

    chrome.runtime
      .sendMessage({ reload: true })
      .then((response) => {
        console.log(`Page reloaded`);
      })
      .catch((err) => {
        console.error(`Cannot send message to service-worker: ${err}`);
      });
  };

  return (
    <div className="popup-container">
      <h2 className="popup-title">🌟 IDE Settings</h2>

      <div className="setting-item">
        <label htmlFor="isEnabled">
          <input
            type="checkbox"
            id="isEnabled"
            defaultChecked={userConfig.isEnabled}
            checked={userConfig.isEnabled}
            onChange={handleToggle}
          />
          Enable
        </label>
      </div>

      <div className="setting-item">
        <label htmlFor="theme">IDE Theme:</label>
        <select
          id="theme"
          value={userConfig.theme}
          onChange={(e) => handleThemeChange(e)}
        >
          <option value="basic-light">Basic Light</option>
          <option value="basic-dark">Basic Dark</option>
          <option value="andromeda">Andromeda</option>
          <option value="dracula">Dracula</option>
          <option value="github-light">Github Light</option>
          <option value="github-dark">Github Dark</option>
          <option value="monokai">Monokai</option>
          <option value="solarized-light">Solorized Light</option>
          <option value="solarized-dark">Solorized Dark</option>
          <option value="tokyo-night">Tokyo Night</option>
          <option value="tokyo-storm">Tokyo Storm</option>
          <option value="tokyo-night-day">Tokyo Night Day</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="fontSize">Font Size:</label>
        <input
          id="fontSize"
          type="number"
          value={userConfig.fontSize}
          onChange={(e) => handleFontSizeChange(e)}
          min="10"
          max="30"
        />
      </div>

      <button onClick={reloadLoader} className="btn-reload" id="btn-reload">
        Reload IDE
      </button>

      <div className="status-preview">
        <p>Extension is {userConfig.isEnabled ? "Enabled" : "Disabled"}</p>
        <p>Current Theme: {userConfig.theme}</p>
        <p>Font Size: {userConfig.fontSize}px</p>
      </div>
    </div>
  );
}

export default Popup;
