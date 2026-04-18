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

	async getAceEditor(element: HTMLElement): Promise<AceAjax.Editor | null> {
		console.log("Element", element);
		try {
			const aceEditor = await this.sendBrowserMessage(
				"GET_ACE_EDITOR",
				element,
			);
			return aceEditor as AceAjax.Editor;
		} catch (error) {
			Logger.error("Failed to get Ace Editor", error);
			return null;
		}
	}
}

export const aceService = AceService.getInstance();
