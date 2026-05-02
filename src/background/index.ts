// define the background scripts
import browser from "webextension-polyfill";
import { handleBrowserMessage } from "./browserMessage";

console.log("[Odoo-Better-IDE]: This is the background script.");

browser.runtime.onMessage.addListener(
	(request: any, sender: browser.Runtime.MessageSender, sendResponse) => {
		if (!request.requestType) {
			console.error(`No requestType provided: ${request}`);
			return true;
		}

		handleBrowserMessage(request, sender, sendResponse);
		return true;
	},
);
