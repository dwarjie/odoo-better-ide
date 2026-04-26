import { OdooVersion } from "@/types";
import browser from "webextension-polyfill";

/**
 * Handles the browser message from the content script and sends the response back to the content script
 * This function uses the browser.scripting.executeScript API to run the script into the MAIN world
 *
 * @param request - The request object containing the request type and params
 * @param sender - The sender object containing the tab ID
 * @param sendResponse - The function to send the response back to the content script
 * @returns void
 */
export async function handleBrowserMessage(
	request: { requestType: string; params?: unknown },
	sender: browser.Runtime.MessageSender,
	sendResponse: (response: unknown) => void,
) {
	try {
		if (!sender?.tab?.id) {
			throw new Error("Cannot retrieve the Sender Tab ID.");
		}

		console.log("Params", request.params);
		const [{ result }] = await browser.scripting.executeScript({
			target: { tabId: sender.tab.id, allFrames: true },
			func: processMessage,
			world: "MAIN",
			args: [request.requestType, request.params ?? null],
		});

		sendResponse(result);
	} catch (error) {
		sendResponse(error);
	}
}

/**
 * Processes the message based on the request type
 * Example: GET_ODOO_VERSION -> Returns the Odoo version
 *
 * This function is run in the MAIN world
 *
 * @param requestType - The request type
 * @param params - The params
 * @returns The response
 *
 * @throws Error - If the request type is invalid
 */
function processMessage(requestType: string, params?: unknown | null): unknown {
	/**
	 * Gets the Odoo MAJOR version through the window.odoo object
	 *
	 * @returns The Odoo major version
	 */
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

	/**
	 * Gets the Ace Editor value through the window.ace object
	 * Uses the unique ID to find the Ace Editor element
	 *
	 * @param uniqueId - The unique ID of the Ace Editor
	 * @returns The Ace Editor value
	 */
	function getAceEditor(uniqueId: string): string | null {
		if (!uniqueId) return null;

		const aceGlobal: AceAjax.Ace | undefined = (window as any)?.ace;
		if (!aceGlobal) {
			console.error("Cannot access window.ace");
			return null;
		}

		try {
			const element = document.querySelector(`[data-odoo-id="${uniqueId}"]`);
			const ace = aceGlobal.edit(element as HTMLElement);

			return ace.getValue();
		} catch (error) {
			console.error("Cannot access Ace Editor", error);
			return null;
		}
	}

	/**
	 * Subscribes to the Ace Editor changes
	 * Uses the unique ID to find the Ace Editor element
	 *
	 * @param uniqueId - The unique ID of the Ace Editor
	 * @returns True if the subscription is successful, false otherwise
	 */
	function subscribeToAceChanges(uniqueId: string): boolean {
		if (!uniqueId) return false;

		const aceGlobal: AceAjax.Ace | undefined = (window as any)?.ace;
		if (!aceGlobal) {
			console.error("Cannot access window.ace");
			return false;
		}

		try {
			const element = document.querySelector(`[data-odoo-id="${uniqueId}"]`);
			const ace = aceGlobal.edit(element as HTMLElement);

			ace.session.on("change", () => {
				window.postMessage({
					type: "ACE_CHANGED",
					id: uniqueId,
					value: ace.getValue(),
				});
			});
			return true;
		} catch (error) {
			console.error("Cannot access Ace Editor", error);
			return false;
		}
	}

	/**
	 * Gets the Ace Editor mode through the window.ace object
	 * Uses the unique ID to find the Ace Editor element
	 *
	 * @param uniqueId - The unique ID of the Ace Editor
	 * @returns The Ace Editor mode
	 */
	function getAceMode(uniqueId: string): string | null {
		if (!uniqueId) return null;

		const aceGlobal: AceAjax.Ace | undefined = (window as any)?.ace;
		if (!aceGlobal) {
			console.error("Cannot access window.ace");
			return null;
		}

		try {
			const element = document.querySelector(`[data-odoo-id="${uniqueId}"]`);
			const ace = aceGlobal.edit(element as HTMLElement);

			const mode: string | null = ace.getOption("mode");
			if (!mode) return null;

			function cleanAceModeString(mode: string): string {
				return mode.replace("ace/mode/", "");
			}
			const cleanMode = cleanAceModeString(mode);

			return cleanMode;
		} catch (error) {
			console.error("Cannot access Ace Editor", error);
			return null;
		}
	}

	try {
		switch (requestType) {
			case "GET_ODOO_VERSION":
				return getOdooVersion();
			case "GET_ACE_VALUE":
				if (!params || typeof params !== "string") {
					throw new Error(`Invalid element to access Ace Editor: ${params}`);
				}

				return getAceEditor(params);
			case "SUBSCRIBE_ACE_CHANGES":
				if (!params || typeof params !== "string") {
					throw new Error(`Invalid element to subscribe Ace Editor: ${params}`);
				}

				return subscribeToAceChanges(params);
			case "GET_ACE_MODE":
				if (!params || typeof params !== "string") {
					throw new Error(`Invalid element to access Ace Editor: ${params}`);
				}

				return getAceMode(params);
			default:
				throw new Error(`Invalid request type: ${requestType}`);
		}
	} catch (error) {
		console.log("[LOG]", error);
		return error;
	}
}
