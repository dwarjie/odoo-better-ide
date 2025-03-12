// MIT Licensed
// Author: jwilson8767

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
export function elementReady(selector) {
  return new Promise((resolve, reject) => {
    let el = document.querySelector(selector);
    if (el) {
      resolve(el);
      return;
    }
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      const element = document.querySelector(selector);
      if (element) {
        console.log(`Found: ${element}`);
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        // observer.disconnect();
      }
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
