const getObserverConfig = (odooVersion) => {
  // make sure to only get the number version since demo.odoo.com has "saas~xx"
  if (typeof odooVersion == "string") {
    let strVersion = odooVersion;
    odooVersion = strVersion.replace(/\D/g, "");
  }
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

export { getObserverConfig };
