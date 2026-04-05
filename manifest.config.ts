import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
	manifest_version: 3,
	name: "Odoo Better Ide",
	description:
		"Enhance Odoo Code Editor with Modern Code Editor, Code Completion, Intellisense, and Full Customization with Font Size and Themes!",
	version: "1.3.0",
	icons: {
		48: "public/logo.png",
	},
	action: {
		default_icon: {
			48: "public/logo.png",
		},
		default_popup: "src/popup/index.html",
	},
	permissions: ["storage"],
	content_scripts: [
		{
			js: ["src/content/main.tsx"],
			matches: ["https://*/*"],
		},
	],
});
