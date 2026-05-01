import { EditorLanguage } from '@/types/Config.types';

/**
 * Clean the Ace Mode string to get the actual mode
 * Example: ace/mode/python -> python
 * @param mode - Ace Mode string
 * @returns Cleaned Ace Mode string
 */
export function cleanAceModeString(mode: string): string {
	return mode.replace('ace/mode/', '');
}

export function filterAceMode(mode: string): EditorLanguage {
	switch (mode) {
		case 'python':
			return 'python';
		case 'qweb':
			return 'qweb';
		case 'javascript':
			return 'javascript';
		default:
			return 'auto';
	}
}
