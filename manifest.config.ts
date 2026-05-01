import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
	manifest_version: 3,
	name: 'Odoo Better Ide',
	description:
		'Enhance Odoo Code Editor with Modern Code Editor, Code Completion, Intellisense, and Full Customization with Font Size and Themes!',
	version: '1.3.0',
	icons: {
		16: 'images/icon-16.png',
		32: 'images/icon-32.png',
		48: 'images/icon-48.png',
		128: 'images/icon-128.png',
	},
	background: {
		scripts: ['src/background/index.ts'],
		service_worker: 'src/background/index.ts',
		type: 'module',
	},
	action: {
		default_popup: 'src/popup/index.html',
	},
	permissions: ['storage', 'scripting'],
	content_scripts: [
		{
			js: ['src/content/main.tsx'],
			matches: ['https://*/*'],
		},
	],
	host_permissions: ['https://*/*'],
});
