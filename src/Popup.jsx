import React, { useState, useEffect } from "react";
import "./index.css";

function Popup() {
  const [userConfig, setUserConfig] = useState({});

  useEffect(() => {
    chrome.storage.sync
      .get()
      .then((config) => {
        setUserConfig(config);
      })
      .catch((err) => {
        console.error(`Error fetching user config: ${err}`);
      });
  }, []);

  const saveConfig = (item) => {
    chrome.storage.sync
      .set(item)
      .catch((err) => console.error(`Error updating config: ${err}`));
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

  const handleLanguageChange = (e) => {
    const newValue = e.target.value;

    saveConfig({ language: newValue });
    setUserConfig({
      ...userConfig,
      language: newValue,
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
    chrome.runtime
      .sendMessage({ reload: true })
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
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={userConfig.language}
          onChange={(e) => handleLanguageChange(e)}
        >
          <option value="python">Python</option>
          <option value="xml">XML</option>
          <option value="qweb">Qweb</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="theme">IDE Theme:</label>
        <select
          id="theme"
          value={userConfig.theme}
          onChange={(e) => handleThemeChange(e)}
        >
          <option value="basic-light">Basic Light</option>
          <option value="material-light">Material Light</option>
          <option value="one-dark">One Dark</option>
          <option value="material-dark">Material Dark</option>
          <option value="monokai">Monokai</option>
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
        Reload Page
      </button>

      <div className="status-preview">
        <p>Extension is {userConfig.isEnabled ? "Enabled" : "Disabled"}</p>
        <p>Language: {userConfig.language}</p>
        <p>Current Theme: {userConfig.theme}</p>
        <p>Font Size: {userConfig.fontSize}px</p>
      </div>
    </div>
  );
}

export default Popup;
