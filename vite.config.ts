import path from 'node:path';
import react from '@vitejs/plugin-react';
import zip from 'vite-plugin-zip-pack';
import manifest from './manifest.config';
import tailwindcss from '@tailwindcss/vite';
import { crx } from '@crxjs/vite-plugin';
import { name, version } from './package.json';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}`,
		},
	},
	plugins: [
		tailwindcss(),
		react(),
		crx({ manifest }),
		zip({ outDir: 'release', outFileName: `${name}-${version}.zip` }),
	],
	server: {
		cors: {
			origin: [/chrome-extension:\/\//],
		},
	},
});
