import React, { useState } from "react";
import "./index.css"

function Popup() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [theme, setTheme] = useState("Light");
  const [fontSize, setFontSize] = useState(14);

  const handleToggle = () => setIsEnabled(!isEnabled);
  const handleThemeChange = (e) => setTheme(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <div className="popup-container">
      <h2 className="popup-title">🌟 IDE Settings</h2>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
          />
          Enable by Default
        </label>
      </div>

      <div className="setting-item">
        <label htmlFor="theme">IDE Theme:</label>
        <select id="theme" value={theme} onChange={handleThemeChange}>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="Monokai">Monokai</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="fontSize">Font Size:</label>
        <input
          id="fontSize"
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
          min="10"
          max="30"
        />
      </div>

      <div className="status-preview">
        <p>Extension is {isEnabled ? "Enabled" : "Disabled"}</p>
        <p>Current Theme: {theme}</p>
        <p>Font Size: {fontSize}px</p>
      </div>
    </div>
  );
}

export default Popup
