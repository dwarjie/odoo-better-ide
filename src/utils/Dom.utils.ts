/**
 * Embed Google Fonts in the DOM Head
 * This is required for CodeMirror for user to use the Google Fonts
 * in the CodeMirror Editor.
 *
 * @returns void
 */
export const embedGoogleFont = (): void => {
	const link1 = document.createElement('link');
	link1.rel = 'preconnect';
	link1.href = 'https://fonts.googleapis.com';
	document.head.appendChild(link1);

	const link2 = document.createElement('link');
	link2.rel = 'preconnect';
	link2.href = 'https://fonts.gstatic.com';
	link2.crossOrigin = 'true';
	document.head.appendChild(link2);

	const link3 = document.createElement('link');
	link3.rel = 'stylesheet';
	link3.href =
		'https://fonts.googleapis.com/css2?family=Cascadia+Code&family=Fira+Code&family=JetBrains+Mono&family=Source+Code+Pro&display=swap';
	document.head.appendChild(link3);
};

/**
 * Get the model_id (for Odoo 17+) or model (for Odoo 15/16) element from the DOM
 *
 * Used to get the model of ir.actions.server or other models
 *
 * @returns The model_id/model element or null if not found
 */
export const getModelIdElem = (odooVersion: number): Element | null => {
	if (odooVersion <= 16) {
		const modelElem = document.querySelector('[name="model"]');
		if (modelElem) return modelElem;

		return document.querySelector('[name="model_id"]');
	}

	return document.querySelector('[name="model_id"]');
};
