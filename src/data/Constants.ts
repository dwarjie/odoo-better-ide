import { EditorConfig } from '@/types/Config.types';

export const DEFAULT_CONFIG: EditorConfig = {
	enabled: true,
	language: 'auto',
	theme: 'github-dark',
	fontSize: 12,
	fontFamily: 'JetBrains Mono',
};

export const CONFIG_KEY = 'ODOO_BETTER_IDE_CONFIG';
