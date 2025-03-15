import { getOdooVersion } from "./getObserverConfig";

/**
 * Set the language mode to use for the editor
 * @param {HTMLElement} aceEditor - The Odoo ace editor element
 * @param {string | number} odooVersion - The version of Odoo. Can be a string (e.g., saas~18) for demo.odoo.com
 **/
const getLanguageMode = (aceEditor, odooVersion) => {
  const convertedVersion = getOdooVersion(odooVersion);
  if (convertedVersion > 17) {
    const language = aceEditor.dataset.mode || "xml";
    return window.postMessage({ language: language });
  }
};

export { getLanguageMode };
