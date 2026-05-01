export type EditorLanguage = 'auto' | 'python' | 'qweb' | 'json';
export type EditorTheme =
	| 'one-dark'
	| 'andromeda'
	| 'basic-dark'
	| 'basic-light'
	| 'catpuccin'
	| 'github-dark'
	| 'github-light'
	| 'high-contrast-dark'
	| 'high-contrast-light'
	| 'monokai'
	| 'solarized-dark'
	| 'solarized-light'
	| 'tokyo-night-storm'
	| 'tokyo-night-day'
	| 'vscode-dark'
	| 'vscode-light';
export type EditorFont =
	| 'JetBrains Mono'
	| 'Fira Code'
	| 'Source Code Pro'
	| 'Cascadia Code'
	| 'monospace';

export type EditorConfig = {
	enabled: boolean;
	language: EditorLanguage;
	theme: EditorTheme;
	fontSize: number;
	fontFamily: EditorFont;
};
