import React, { useState } from "react";
import "./index.css";
import { useEffect } from "react";

function Popup() {
  const [userConfig, setUserConfig] = useState({
    isEnabled: false,
    theme: "Light",
    fontsize: 10,
  });

  const fetchConfig = async () => {
    try {
      const config = await chrome.storage.sync.get();
      setUserConfig(config);
      console.log(`User config fetched`);
    } catch (err) {
      console.log(`User config fetching error: ${err}`);
    }
  };

  const saveConfig = async () => {
    try {
      await chrome.storage.sync.set(userConfig).then(async () => {
        console.log(`User config updated`);
      });
    } catch (err) {
      console.log(`User config saving error: ${err}`);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleToggle = () => {
    setUserConfig({
      ...userConfig,
      isEnabled: !userConfig.isEnabled,
    });
    saveConfig();
  };

  const handleThemeChange = (e) => {
    setUserConfig({
      ...userConfig,
      theme: e.target.value,
    });
    saveConfig();
  };

  const handleFontSizeChange = (e) => {
    setUserConfig({
      ...userConfig,
      fontsize: e.target.value,
    });
    saveConfig();
  };

  return (
    <div className="popup-container">
      <h2 className="popup-title">🌟 IDE Settings</h2>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={userConfig.isEnabled}
            onChange={handleToggle}
          />
          Enable by Default
        </label>
      </div>

      <div className="setting-item">
        <label htmlFor="theme">IDE Theme:</label>
        <select
          id="theme"
          value={userConfig.theme}
          onChange={handleThemeChange}
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="fontSize">Font Size:</label>
        <input
          id="fontSize"
          type="number"
          value={userConfig.fontsize}
          onChange={handleFontSizeChange}
          min="10"
          max="30"
        />
      </div>

      <div className="status-preview">
        <p>
          Extension is {userConfig.isEnabledDefault ? "Enabled" : "Disabled"}
        </p>
        <p>Current Theme: {userConfig.theme}</p>
        <p>Font Size: {userConfig.fontsize}px</p>
      </div>
    </div>
  );
}

export default Popup;
