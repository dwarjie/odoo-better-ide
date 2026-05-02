import path from 'node:path';
import react from '@vitejs/plugin-react';
import zip from 'vite-plugin-zip-pack';
import tailwindcss from '@tailwindcss/vite';
import { chromeManifest } from './src/manifest/chrome.manifest';
import { firefoxManifest } from './src/manifest/firefox.manifest';
import { crx } from '@crxjs/vite-plugin';
import { name, version } from './package.json';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const browser = env.BROWSER || 'chrome';

	return {
		resolve: {
			alias: {
				'@': `${path.resolve(__dirname, 'src')}`,
			},
		},
		plugins: [
			tailwindcss(),
			react(),
			crx({
				manifest: browser === 'chrome' ? chromeManifest : firefoxManifest,
				browser: browser === 'chrome' ? 'chrome' : 'firefox',
			}),
			zip({
				outDir: 'release',
				outFileName: `${browser}-${name}-${version}.zip`,
			}),
		],
		server: {
			cors: {
				origin: [/chrome-extension:\/\//],
			},
		},
	};
});
