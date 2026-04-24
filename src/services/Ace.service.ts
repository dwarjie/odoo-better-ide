import browser from "webextension-polyfill";
import { Logger } from "./Logger.service";

export class AceService {
	private static aceInstance: AceService | null = null;

	static getInstance(): AceService {
		if (!AceService.aceInstance) {
			AceService.aceInstance = new AceService();
		}

		return AceService.aceInstance;
	}

	private async sendBrowserMessage(
		requestType: string,
		params?: unknown,
	): Promise<unknown> {
		if (!browser?.runtime) {
			throw new Error("Browser runtime API is not available.");
		}

		console.log("Params", params);
		const result = await browser.runtime.sendMessage({ requestType, params });

		return result;
	}

	async getAceValue(uniqueId: string): Promise<string | null> {
		try {
			const aceValue = await this.sendBrowserMessage("GET_ACE_VALUE", uniqueId);
			return aceValue as string;
		} catch (error) {
			Logger.error("Failed to get Ace Editor", error);
			return null;
		}
	}

	async subscribeToAceChanges(uniqueId: string): Promise<boolean> {
		try {
			const result = await this.sendBrowserMessage(
				"SUBSCRIBE_ACE_CHANGES",
				uniqueId,
			);
			return result as boolean;
		} catch (error) {
			Logger.error("Failed to subscribe to Ace Editor", error);
			return false;
		}
	}

	setUniqueId(element: HTMLElement): string {
		if (!element || !element.classList.contains("ace_editor")) {
			throw new Error("No element provided or wrong element.");
		}

		const uniqueId = `odoo-ace-${Math.random().toString(36).slice(2)}`;
		element.setAttribute("data-odoo-id", uniqueId);

		return uniqueId;
	}

	getUniqueId(element: HTMLElement): string | null {
		if (!element || !element.classList.contains("ace_editor")) {
			throw new Error("No element provided or wrong element.");
		}

		const uniqueId = element.getAttribute("data-odoo-id");
		if (!uniqueId) return null;

		return uniqueId;
	}
}

export const aceService = AceService.getInstance();
