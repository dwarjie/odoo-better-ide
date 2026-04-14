import { OdooVersion } from "@/types";
import browser from "webextension-polyfill";

export async function handleBrowserMessage(
	request: { requestType: string },
	sender: browser.Runtime.MessageSender,
	sendResponse: (response: unknown) => void,
) {
	try {
		if (!sender?.tab?.id) {
			throw new Error("Cannot retrieve the Sender Tab ID.");
		}

		const [{ result }] = await browser.scripting.executeScript({
			target: { tabId: sender.tab.id, allFrames: true },
			func: processMessage,
			world: "MAIN",
			args: [request.requestType],
		});

		sendResponse(result);
	} catch (error) {
		sendResponse(error);
	}
}

function processMessage(requestType: string): unknown {
	function getOdooVersion(): OdooVersion {
		if (typeof window === "undefined") {
			console.error("window object is not accessible");
			return { version: null };
		}

		const odoo = (window as any).odoo;
		if (!odoo) {
			console.warn("window.odoo is not accessible");
			return { version: null };
		}

		const info = odoo.info ?? odoo.session_info;
		if (!info) {
			console.warn(
				"window.odoo.info or window.odoo.session_info is not accessible",
			);
			return { version: null };
		}

		console.log(info);
		const versionArray = info.server_version_info;

		if (!Array.isArray(versionArray) || versionArray.length === 0) {
			console.warn("server_version_info property is empty", versionArray);
			return { version: null };
		}

		let majorVersion: number | string = versionArray[0];
		if (typeof majorVersion == "string") {
			// Handle cases like "saas~16"
			majorVersion = Number(majorVersion.replace(/^saas~/, ""));
		}

		return {
			version: isNaN(majorVersion) ? null : majorVersion,
		};
	}

	try {
		switch (requestType) {
			case "GET_ODOO_VERSION":
				return getOdooVersion();
			default:
				throw new Error(`Invalid request type: ${requestType}`);
		}
	} catch (error) {
		console.log(error);
		return error;
	}
}
