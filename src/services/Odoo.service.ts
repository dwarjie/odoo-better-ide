import browser from "webextension-polyfill";
import { Logger } from "./Logger.service";
import { OdooVersion } from "@/types";

/*
 Odoo Service class to provide Odoo related API's
*/
export class OdooService {
	private static odooServiceInstance: OdooService | null = null;

	static getInstance(): OdooService {
		if (!OdooService.odooServiceInstance) {
			OdooService.odooServiceInstance = new OdooService();
		}

		return OdooService.odooServiceInstance;
	}

	private async sendBrowserMessage(requestType: string): Promise<unknown> {
		if (!browser?.runtime) {
			throw new Error("Browser runtime API is not available.");
		}

		const result = await browser.runtime.sendMessage({ requestType });

		return result;
	}

	async getOdooVersion(): Promise<OdooVersion> {
		try {
			const odooVersion = await this.sendBrowserMessage("GET_ODOO_VERSION");
			return odooVersion as OdooVersion;
		} catch (error) {
			Logger.error("Failed to get Odoo Version", error);
			return { version: null };
		}
	}
}

export const odooService = OdooService.getInstance();
