import { odooService } from '@/services/Odoo.service';
import { Many2one } from '@/types';

/**
 * A wrapper function to fetch the technical name of the model to
 * be used for the completion
 *
 * @param model - The model name
 * @param odooVersion - The Odoo version
 * @returns The technical name or null if failed
 */
export const fetchModelIdValue = async (
	model: string,
	odooVersion: number,
): Promise<string | null> => {
	const resId = odooService.getRecordIdFromUrl();
	if (!resId) return null;

	// v15/16 XML views: model is a plain Char with the technical name directly
	if (odooVersion <= 16 && model === 'ir.ui.view') {
		return odooService.fetchFieldValue<string>(model, resId, 'model');
	}

	// All other cases (v17+ XML, v15/16 Python, v17+ Python):
	// model_id is a Many2one returning [id, "Display Name"]
	const modelId = await odooService.fetchFieldValue<Many2one>(
		model,
		resId,
		'model_id',
	);
	if (!modelId) return null;

	return odooService.fetchModelTechnicalName(modelId);
};
