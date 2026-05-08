import browser from 'webextension-polyfill';
import { Logger } from './Logger.service';
import {
	Many2one,
	OdooFieldMap,
	OdooVersion,
	RpcParams,
	RpcResponse,
} from '@/types';

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
			throw new Error('Browser runtime API is not available.');
		}

		const result = await browser.runtime.sendMessage({ requestType });

		return result;
	}

	async getOdooVersion(): Promise<OdooVersion> {
		try {
			const odooVersion = await this.sendBrowserMessage('GET_ODOO_VERSION');
			return odooVersion as OdooVersion;
		} catch (error) {
			Logger.error('Failed to get Odoo Version', error);
			return { version: null };
		}
	}

	async getPageModel(): Promise<string> {
		try {
			const pageModel = await this.sendBrowserMessage('GET_PAGE_MODEL');
			return pageModel as string;
		} catch (error) {
			Logger.error('Failed to get page model', error);
			return '';
		}
	}

	/**
	 * Get the record ID from the URL
	 *
	 * Supports:
	 * - Odoo 15/16/17: /web#id=42&model=...
	 * - Odoo 18+: /odoo/server-actions/42
	 *
	 * @returns The record ID or null if not found
	 */
	getRecordIdFromUrl(): number | null {
		// Hash-style URLs
		const hash = window.location.hash;

		const hashMatch = hash.match(/[#?&]id=(\d+)/);
		if (hashMatch) {
			return Number(hashMatch[1]);
		}

		// Path-style URLs
		const pathMatch = window.location.pathname.match(/\/(\d+)(?:\/|$)/);
		if (pathMatch) {
			return Number(pathMatch[1]);
		}

		return null;
	}

	/**
	 * Wrapper function to fetch data from Odoo using RPC
	 *
	 * @param params - The RPC params
	 * @returns The RPC response or null if failed
	 */
	async fetchRpc<T>(params: RpcParams): Promise<T | null> {
		try {
			const response = await fetch('/web/dataset/call_kw', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					method: 'call',
					id: Math.floor(Math.random() * 1000),
					params: {
						model: params.model,
						method: params.method,
						args: params.args ?? [],
						kwargs: params.kwargs ?? {},
					},
				}),
			});

			if (!response.ok) {
				Logger.error(
					`[OdooRpcService] HTTP error: ${response.status} ${response.statusText}`,
				);
				return null;
			}

			const data: RpcResponse<T> = await response.json();

			if (data.error) {
				Logger.error('[OdooRpcService] RPC error:', data.error);
				return null;
			}

			return data.result ?? null;
		} catch (error) {
			Logger.error('[OdooRpcService] Fetch failed:', error);
			return null;
		}
	}

	/**
	 * Fetch the value of a field from a model
	 *
	 * @param model - The model name
	 * @param recordId - The record ID
	 * @param field - The field name
	 * @returns The field value or null if failed
	 */
	async fetchFieldValue<T>(
		model: string,
		recordId: number,
		field: string,
	): Promise<T | null> {
		type RpcReadResult = Record<string, T>[];

		const result = await this.fetchRpc<RpcReadResult>({
			model,
			method: 'read',
			args: [[recordId], [field]],
		});

		if (!result?.[0]) {
			Logger.error(
				`[OdooRpcService] Failed to fetch field "${field}" from model "${model}"`,
			);
			return null;
		}

		return result[0][field] ?? null;
	}

	/**
	 * Fetch the technical name of a model
	 * `stock.picking` is the technical name of `Transfer`
	 *
	 * @param modelId - The model ID
	 * @returns The technical name or null if failed
	 */
	async fetchModelTechnicalName(modelVal: Many2one): Promise<string | null> {
		const modelName = await this.fetchFieldValue<string>(
			'ir.model',
			modelVal[0],
			'model',
		);

		if (!modelName) {
			Logger.error('[OdooRpcService] model name not found in ir.model');
			return null;
		}

		return modelName;
	}

	async fetchModelFields(model: string): Promise<OdooFieldMap | null> {
		const result = await this.fetchRpc<OdooFieldMap>({
			model,
			method: 'fields_get',
			kwargs: {
				attributes: ['string', 'type', 'relation', 'help'],
			},
		});

		if (!result) {
			Logger.error(
				`[OdooRpcService] Failed to fetch fields for model: ${model}`,
			);
			return null;
		}

		return result;
	}
}

export const odooService = OdooService.getInstance();
