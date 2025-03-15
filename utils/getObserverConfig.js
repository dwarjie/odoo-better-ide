/**
 * Get the appropriate MutationObserver config based on Odoo's version
 * @param {string | number} odooVersion - The version of Odoo. Can be a string (e.g., saas~18) for demo.odoo.com
 * @returns {object} MutationObserver.observe() config
 **/
const getObserverConfig = (odooVersion) => {
  odooVersion = getOdooVersion(odooVersion);

  if (odooVersion > 17)
    return {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-mode"],
    };

  return {
    childList: true,
  };
};

const getOdooVersion = (version) => {
  if (typeof version == "string") {
    let strVersion = version;
    version = strVersion.replace(/\D/g, "");

    return version;
  }

  return version;
};

export { getObserverConfig, getOdooVersion };
