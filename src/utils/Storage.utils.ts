import { CONFIG_KEY, DEFAULT_CONFIG } from '@/data/Constants';
import { Logger } from '@/services/Logger.service';
import { EditorConfig } from '@/types/Config.types';
import browser from 'webextension-polyfill';

/**
 * Storage Utils
 * This class provides methods to interact with the storage
 * and handle the config.
 *
 * It uses the browser.storage.sync API to store the config.
 * - getConfig: Gets the config from the storage
 * - setConfig: Sets the config to the storage
 * - updateConfig: Updates the config in the storage
 */
export const StorageUtils = {
	/*
	 * Get the config from the storage
	 * If the config is not found, return the default config
	 *
	 * @returns The config
	 */
	async getConfig(): Promise<EditorConfig> {
		return new Promise((resolve) => {
			browser.storage.sync
				.get(CONFIG_KEY)
				.then((result) => {
					if (!result[CONFIG_KEY]) {
						resolve(DEFAULT_CONFIG);
						return;
					}

					resolve({ ...DEFAULT_CONFIG, ...result[CONFIG_KEY] });
				})
				.catch((error) => {
					if (browser.runtime.lastError) {
						Logger.error('Failed to get config', browser.runtime.lastError);
					}
					resolve(DEFAULT_CONFIG);
					return;
				});
		});
	},

	/*
	 * Set the config to the storage
	 *
	 * @param config - The config to set
	 * @returns void
	 */
	async setConfig(config: EditorConfig): Promise<void> {
		return new Promise((resolve, reject) => {
			browser.storage.sync
				.set({ [CONFIG_KEY]: config })
				.then((result) => {
					resolve();
				})
				.catch((error) => {
					if (browser.runtime.lastError) {
						Logger.error('Failed to set config', browser.runtime.lastError);
					}
					reject(error);
				});
		});
	},

	/*
	 * Update the config in the storage
	 *
	 * @param partial - The partial config to update
	 * @returns The updated config
	 */
	async updateConfig(partial: Partial<EditorConfig>): Promise<EditorConfig> {
		const current = await StorageUtils.getConfig();
		const updated = { ...current, ...partial };
		await StorageUtils.setConfig(updated);
		return updated;
	},
};
