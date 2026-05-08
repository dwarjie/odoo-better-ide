import { UNWANTED_SYNTAX } from '@/data/Python';
import { OdooFieldMap } from '@/types';
import { Completion } from '@codemirror/autocomplete';
import { AttrSpec } from '@codemirror/lang-xml';

/**
 * Filter unwanted syntax from the completion options for python
 *
 * @param options - The completion options
 * @returns The filtered completion options
 */
export const filterPythonOptions = (
	options: readonly Completion[],
): Completion[] => {
	const filteredOptions = options.filter(
		(opt) => !UNWANTED_SYNTAX.has(opt.label),
	);
	// console.log(filteredOptions);
	return filteredOptions;
};

/**
 * Builds the `name` AttrSpec for <field> elements, populated with
 * Odoo model field completions when fields are available.
 *
 * @param fields - The Odoo model fields
 * @returns The `name` AttrSpec
 */
export function buildFieldNameAttr(fields?: OdooFieldMap): AttrSpec {
	if (!fields || Object.keys(fields).length === 0) {
		return {
			name: 'name',
			completion: {
				detail: 'string (required)',
				info: 'The name of the field to render.',
			},
		};
	}

	const values: Completion[] = Object.entries(fields).map(
		([fieldName, field]) => ({
			label: fieldName,
			detail: field.type,
			info: field.help ?? field.string,
			type: 'property',
			boost: 99,
		}),
	);

	return {
		name: 'name',
		values,
		completion: {
			detail: 'string (required)',
			info: 'The name of the field to render.',
		},
	};
}
