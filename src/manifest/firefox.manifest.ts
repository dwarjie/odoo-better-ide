import baseManifest from './manifest.json';

export const firefoxManifest = {
	...baseManifest,
	background: {
		scripts: ['src/background/index.ts'],
	},
	browser_specific_settings: {
		gecko: {
			id: 'odoobetteride@odoobetteride.com',
		},
	},
};
