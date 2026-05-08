import type { ElementSpec, AttrSpec } from '@codemirror/lang-xml';
import type { OdooFieldMap } from '@/types';
import { buildFieldNameAttr } from '@/utils/Completion.utils';

// ── Global attributes ──────────────────────────────────────────────
export const GLOBAL_ATTRS_V16: AttrSpec[] = [
	{
		name: 'invisible',
		global: true,
		completion: {
			detail: 'Python expr',
			info: 'Hides the element when the expression evaluates to true.',
		},
	},
	{
		name: 'readonly',
		global: true,
		completion: {
			detail: 'Python expr',
			info: 'Makes the element read-only when the expression evaluates to true.',
		},
	},
	{
		name: 'required',
		global: true,
		completion: {
			detail: 'Python expr',
			info: 'Makes the element required when the expression evaluates to true.',
		},
	},
	{
		name: 'groups',
		global: true,
		completion: {
			detail: 'string',
			info: 'Comma-separated list of group XML IDs that can see this element.',
		},
	},
	{
		name: 'attrs',
		global: true,
		completion: {
			detail: 'dict',
			info: "Dynamic meta-parameters based on record values. Maps attribute names (e.g. 'invisible', 'readonly', 'required') to domains.",
		},
	},
	{
		name: 'states',
		global: true,
		completion: {
			detail: 'string',
			info: "Shorthand for invisible attrs. Comma-separated list of states. Makes element invisible when record state is NOT in the listed states. Requires a 'state' field on the model.",
		},
	},
	{
		name: 'column_invisible',
		global: true,
		completion: {
			detail: 'domain',
			info: "Hides the entire column in list sub-views. Use attrs: {'column_invisible': [('parent.field', '=', value)]}.",
		},
	},
];

// ── Form view ──────────────────────────────────────────────────────

export function buildFormElements(fields?: OdooFieldMap): ElementSpec[] {
	const fieldNameAttr = buildFieldNameAttr(fields);

	const FORM_FIELD: ElementSpec = {
		name: 'field',
		attributes: [
			fieldNameAttr,
			{
				name: 'id',
				completion: {
					detail: 'string',
					info: 'Node id. Useful when the same field appears multiple times. Default is the field name.',
				},
			},
			{
				name: 'string',
				completion: { detail: 'string', info: 'Override the field label.' },
			},
			{
				name: 'help',
				completion: {
					detail: 'string',
					info: 'Tooltip displayed when hovering the field or its label.',
				},
			},
			{
				name: 'widget',
				completion: {
					detail: 'string',
					info: 'Override the default field rendering method and context.',
				},
			},
			{
				name: 'options',
				completion: {
					detail: 'JSON dict',
					info: 'Configuration options for the field widget including default widgets.',
				},
			},
			{
				name: 'class',
				completion: {
					detail: 'string',
					info: 'HTML class. Common values: oe_inline (prevent line break), oe_left/oe_right (float), oe_read_only (show in read mode only), oe_edit_only (show in edit mode only), oe_avatar (square image display).',
				},
			},
			{
				name: 'domain',
				completion: {
					detail: 'domain',
					info: 'Filters to apply when displaying existing records for selection. Relational fields only.',
				},
			},
			{
				name: 'context',
				completion: {
					detail: 'dict',
					info: 'Context to pass when fetching possible values. Relational fields only.',
				},
			},
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: "Dynamic attributes based on record values. Maps attribute names ('invisible', 'readonly', 'required') to domains.",
				},
			},
			{
				name: 'nolabel',
				completion: {
					detail: 'bool',
					info: 'Hide the field label. Only applies when field is a direct child of a group.',
				},
			},
			{
				name: 'placeholder',
				completion: {
					detail: 'string',
					info: 'Help message shown in empty fields. Should not be an example of data.',
				},
			},
			// v16: mode uses 'tree' not 'list'
			{
				name: 'mode',
				completion: {
					detail: 'string',
					info: 'Display mode for linked records: tree, form, kanban, graph. Default: tree. One2many only.',
				},
			},
			{
				name: 'filename',
				completion: {
					detail: 'string',
					info: 'Related field providing the filename. Binary fields only.',
				},
			},
			{
				name: 'password',
				completion: {
					detail: 'bool',
					info: "Indicates a Char field stores a password and data shouldn't be displayed.",
				},
			},
			{
				name: 'kanban_view_ref',
				completion: {
					detail: 'string',
					info: 'XMLID of the Kanban view to use in mobile. m2o/m2m fields only.',
				},
			},
			{
				name: 'readonly',
				completion: {
					detail: 'bool',
					info: 'Display the field in both read and edit mode but never make it editable.',
				},
			},
			{
				name: 'required',
				completion: {
					detail: 'bool',
					info: 'Generates an error and prevents saving if the field has no value.',
				},
			},
			{
				name: 'on_change',
				completion: {
					detail: 'string',
					info: 'Method to call when this field value is edited. Deprecated since v8 — use @api.onchange on the model instead.',
				},
			},
		],
		children: ['tree', 'form', 'kanban', 'graph'],
		completion: {
			detail: 'field',
			info: 'Renders a single field of the current record.',
		},
	};

	const FORM_LABEL: ElementSpec = {
		name: 'label',
		attributes: [
			{
				name: 'for',
				completion: {
					detail: 'string (required)',
					info: 'Reference to the field name or id this label is for.',
				},
			},
			{
				name: 'string',
				completion: {
					detail: 'string',
					info: "Label text. Defaults to the field's label from the model.",
				},
			},
			{ name: 'class', completion: { detail: 'string', info: 'HTML class.' } },
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: 'Dynamic attributes based on record values.',
				},
			},
		],
		completion: {
			detail: 'form',
			info: 'Manual field label. Used when field is outside a group or has nolabel set.',
		},
	};

	const FORM_BUTTON: ElementSpec = {
		name: 'button',
		attributes: [
			{
				name: 'type',
				values: ['object', 'action'],
				completion: {
					detail: 'string',
					info: "'object' calls a method, 'action' executes an ir.action.",
				},
			},
			{
				name: 'name',
				completion: {
					detail: 'string',
					info: 'Method name or action ID to call.',
				},
			},
			{
				name: 'string',
				completion: { detail: 'string', info: 'Button label.' },
			},
			{
				name: 'icon',
				completion: {
					detail: 'string',
					info: 'Font Awesome icon class e.g. fa-check.',
				},
			},
			{ name: 'help', completion: { detail: 'string', info: 'Tooltip text.' } },
			{
				name: 'context',
				completion: {
					detail: 'dict',
					info: 'Merged into the view context when performing the action.',
				},
			},
			{ name: 'class', completion: { detail: 'string', info: 'HTML class.' } },
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: 'Dynamic attributes based on record values.',
				},
			},
			{
				name: 'special',
				values: ['save', 'cancel'],
				completion: {
					detail: 'string',
					info: "Dialog buttons: 'save' saves and closes, 'cancel' closes without saving.",
				},
			},
			{
				name: 'confirm',
				completion: {
					detail: 'string',
					info: 'Confirmation message shown before performing the action. Also works in Kanban views.',
				},
			},
		],
		completion: {
			detail: 'action',
			info: 'Calls into the Odoo system when clicked.',
		},
	};

	const FORM_GROUP: ElementSpec = {
		name: 'group',
		attributes: [
			{
				name: 'string',
				completion: {
					detail: 'string',
					info: 'Title displayed for the group.',
				},
			},
			{
				name: 'col',
				completion: { detail: 'int', info: 'Number of columns. Default: 2.' },
			},
			{
				name: 'colspan',
				completion: {
					detail: 'int',
					info: 'Number of columns taken by a child element. Default: 1.',
				},
			},
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: 'Dynamic attributes based on record values.',
				},
			},
		],
		children: ['field', 'group', 'separator', 'newline', 'button', 'label'],
		completion: {
			detail: 'form',
			info: 'Column layout container. Default: 2 columns. Children fill next column before changing row.',
		},
	};

	const FORM_SHEET: ElementSpec = {
		name: 'sheet',
		children: [
			'group',
			'notebook',
			'field',
			'button',
			'label',
			'separator',
			'newline',
			'div',
			'h1',
			'h2',
			'h3',
			'p',
		],
		completion: {
			detail: 'form',
			info: 'Narrower, responsive form layout. Usually wraps groups and notebooks.',
		},
	};

	const FORM_HEADER: ElementSpec = {
		name: 'header',
		children: ['button', 'field'],
		completion: {
			detail: 'form',
			info: 'Full-width area above the sheet. Combined with sheet, provides location for workflow buttons and status widgets.',
		},
	};

	const FORM_FOOTER: ElementSpec = {
		name: 'footer',
		children: ['button'],
		completion: {
			detail: 'form',
			info: 'Displays buttons at the end of dialogs.',
		},
	};

	const FORM_NOTEBOOK: ElementSpec = {
		name: 'notebook',
		children: ['page'],
		completion: {
			detail: 'form',
			info: 'Tabbed section container. Should not be placed within a group.',
		},
	};

	const FORM_PAGE: ElementSpec = {
		name: 'page',
		attributes: [
			{
				name: 'string',
				completion: { detail: 'string (required)', info: 'Title of the tab.' },
			},
			{
				name: 'accesskey',
				completion: { detail: 'string', info: 'HTML accesskey for the tab.' },
			},
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: "Dynamic attributes based on record values e.g. {'invisible': [('state', '=', 'draft')]}.",
				},
			},
		],
		children: [
			'group',
			'field',
			'separator',
			'notebook',
			'button',
			'label',
			'div',
		],
		completion: { detail: 'form', info: 'Tab page inside a notebook.' },
	};

	const FORM_SEPARATOR: ElementSpec = {
		name: 'separator',
		attributes: [
			{
				name: 'string',
				completion: { detail: 'string', info: 'Section title.' },
			},
		],
		completion: {
			detail: 'form',
			info: 'Small horizontal spacing. With string attribute acts as a section title.',
		},
	};

	const FORM_NEWLINE: ElementSpec = {
		name: 'newline',
		completion: {
			detail: 'form',
			info: 'Ends the current row in a group and immediately switches to a new row.',
		},
	};

	const FORM_ROOT: ElementSpec = {
		name: 'form',
		top: true,
		attributes: [
			{ name: 'string', completion: { detail: 'string', info: 'View title.' } },
			{
				name: 'create',
				completion: { detail: 'bool', info: 'Disable/enable record creation.' },
			},
			{
				name: 'edit',
				completion: { detail: 'bool', info: 'Disable/enable record editing.' },
			},
			{
				name: 'delete',
				completion: { detail: 'bool', info: 'Disable/enable record deletion.' },
			},
			{
				name: 'duplicate',
				completion: {
					detail: 'bool',
					info: 'Disable/enable record duplication.',
				},
			},
			{
				name: 'js_class',
				completion: {
					detail: 'string',
					info: 'JavaScript component to instantiate instead of the default form view.',
				},
			},
			{
				name: 'disable_autofocus',
				completion: {
					detail: 'bool',
					info: 'Disable automatic focusing on the first field. Default: false.',
				},
			},
		],
		children: [
			'header',
			'sheet',
			'footer',
			'field',
			'group',
			'notebook',
			'separator',
			'newline',
			'button',
			'label',
			'div',
		],
		completion: {
			detail: 'view',
			info: 'Form view root element. Displays a single record.',
		},
	};

	return [
		FORM_ROOT,
		FORM_FIELD,
		FORM_LABEL,
		FORM_BUTTON,
		FORM_GROUP,
		FORM_SHEET,
		FORM_HEADER,
		FORM_FOOTER,
		FORM_NOTEBOOK,
		FORM_PAGE,
		FORM_SEPARATOR,
		FORM_NEWLINE,
	];
}

// ── List view ──────────────────────────────────────────────────────
// v16: root element is <tree>

export function buildListElements(fields?: OdooFieldMap): ElementSpec[] {
	const fieldNameAttr = buildFieldNameAttr(fields);

	const LIST_FIELD: ElementSpec = {
		name: 'field',
		attributes: [
			fieldNameAttr,
			{
				name: 'string',
				completion: {
					detail: 'string',
					info: 'Override the column header label.',
				},
			},
			{
				name: 'invisible',
				completion: {
					detail: 'bool/domain',
					info: 'Fetches and stores the field but hides the column. Useful for fields used in attrs.',
				},
			},
			{
				name: 'optional',
				values: ['show', 'hide'],
				completion: {
					detail: 'string',
					info: "'show' visible by default, 'hide' hidden by default. User choice stored in browser local storage.",
				},
			},
			{
				name: 'widget',
				completion: {
					detail: 'string',
					info: "Override display. 'progressbar' shows float as progress bar, 'handle' shows drag icon for sequence fields.",
				},
			},
			{
				name: 'sum',
				completion: {
					detail: 'string',
					info: 'Label for the sum aggregate at the bottom. Must match the field group_operator.',
				},
			},
			{
				name: 'avg',
				completion: {
					detail: 'string',
					info: 'Label for the average aggregate at the bottom. Must match the field group_operator.',
				},
			},
			// v16: width supports both absolute (100px) and relative weight (3)
			{
				name: 'width',
				completion: {
					detail: 'string',
					info: "Column width when there are no records. Absolute (e.g. '100px') or relative weight (e.g. '3', meaning 3x wider than others). Ignored when records exist.",
				},
			},
			{
				name: 'nolabel',
				completion: {
					detail: 'string',
					info: "Set to '1' to keep column header empty and disable sorting.",
				},
			},
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: 'Dynamic attributes based on record values. Only affects current field, not the whole column.',
				},
			},
			{
				name: 'decoration-bf',
				completion: {
					detail: 'Python expr',
					info: 'Apply bold to matching cell.',
				},
			},
			{
				name: 'decoration-it',
				completion: {
					detail: 'Python expr',
					info: 'Apply italic to matching cell.',
				},
			},
			{
				name: 'decoration-danger',
				completion: {
					detail: 'Python expr',
					info: 'Apply danger color to matching cell.',
				},
			},
			{
				name: 'decoration-info',
				completion: {
					detail: 'Python expr',
					info: 'Apply info color to matching cell.',
				},
			},
			{
				name: 'decoration-warning',
				completion: {
					detail: 'Python expr',
					info: 'Apply warning color to matching cell.',
				},
			},
			{
				name: 'decoration-success',
				completion: {
					detail: 'Python expr',
					info: 'Apply success color to matching cell.',
				},
			},
			{
				name: 'decoration-muted',
				completion: {
					detail: 'Python expr',
					info: 'Apply muted color to matching cell.',
				},
			},
			{ name: 'class', completion: { detail: 'string', info: 'HTML class.' } },
		],
		completion: { detail: 'field', info: 'Defines a column in the list view.' },
	};

	const LIST_BUTTON: ElementSpec = {
		name: 'button',
		attributes: [
			{
				name: 'type',
				values: ['object', 'action'],
				completion: {
					detail: 'string',
					info: "'object' calls a method on the list model, 'action' loads and executes an ir.action.",
				},
			},
			{
				name: 'name',
				completion: { detail: 'string', info: 'Method name or action ID.' },
			},
			{
				name: 'string',
				completion: {
					detail: 'string',
					info: 'Button label or alt text for icon.',
				},
			},
			{
				name: 'icon',
				completion: { detail: 'string', info: 'Font Awesome icon class.' },
			},
			{
				name: 'context',
				completion: {
					detail: 'dict',
					info: 'Merged into the view context when performing the action.',
				},
			},
			{
				name: 'attrs',
				completion: {
					detail: 'dict',
					info: "Dynamic attributes. 'invisible' domain hides the button.",
				},
			},
			{
				name: 'states',
				completion: {
					detail: 'string',
					info: 'Shorthand for invisible attrs. Comma-separated states. Button invisible when record NOT in listed states.',
				},
			},
			{ name: 'class', completion: { detail: 'string', info: 'HTML class.' } },
		],
		completion: { detail: 'action', info: 'Displays a button in a list cell.' },
	};

	const LIST_GROUPBY: ElementSpec = {
		name: 'groupby',
		attributes: [
			{
				name: 'name',
				completion: {
					detail: 'string (required)',
					info: "Many2one field name to define custom group headers for. A type='edit' button can open the record's form view.",
				},
			},
		],
		children: ['field', 'button'],
		completion: {
			detail: 'list',
			info: 'Defines custom headers when grouping by a Many2one field. Fields inside are used for modifiers only, not displayed.',
		},
	};

	const LIST_CREATE: ElementSpec = {
		name: 'create',
		attributes: [
			{
				name: 'string',
				completion: { detail: 'string (required)', info: 'Button text.' },
			},
			{
				name: 'context',
				completion: {
					detail: 'dict',
					info: 'Merged into existing context when retrieving default values for the new record.',
				},
			},
		],
		completion: {
			detail: 'list',
			info: 'Custom create button. Any defined create element overwrites the default Add a line button.',
		},
	};

	const LIST_CONTROL: ElementSpec = {
		name: 'control',
		children: ['create'],
		completion: {
			detail: 'list',
			info: 'Defines custom controls for the list. Only meaningful inside One2many fields.',
		},
	};

	const LIST_ROOT: ElementSpec = {
		name: 'tree',
		top: true,
		attributes: [
			{ name: 'string', completion: { detail: 'string', info: 'View title.' } },
			{
				name: 'editable',
				values: ['top', 'bottom'],
				completion: {
					detail: 'string',
					info: "Make records editable in-place. 'top' adds new records at top, 'bottom' at bottom. Ignored if edit=false.",
				},
			},
			{
				name: 'multi_edit',
				completion: {
					detail: 'string',
					info: "Set to '1' to enable multi-record editing.",
				},
			},
			{
				name: 'default_order',
				completion: {
					detail: 'string',
					info: "Comma-separated fields to order by. Postfix with desc for reverse. Overrides model's _order.",
				},
			},
			{
				name: 'create',
				completion: { detail: 'bool', info: 'Disable/enable record creation.' },
			},
			{
				name: 'edit',
				completion: { detail: 'bool', info: 'Disable/enable record editing.' },
			},
			{
				name: 'delete',
				completion: { detail: 'bool', info: 'Disable/enable record deletion.' },
			},
			{
				name: 'import',
				completion: { detail: 'bool', info: 'Disable/enable record import.' },
			},
			{
				name: 'export_xlsx',
				completion: { detail: 'bool', info: 'Disable/enable Excel export.' },
			},
			{
				name: 'decoration-bf',
				completion: {
					detail: 'Python expr',
					info: 'Apply bold to matching rows.',
				},
			},
			{
				name: 'decoration-it',
				completion: {
					detail: 'Python expr',
					info: 'Apply italic to matching rows.',
				},
			},
			{
				name: 'decoration-danger',
				completion: {
					detail: 'Python expr',
					info: 'Apply danger color to matching rows.',
				},
			},
			{
				name: 'decoration-info',
				completion: {
					detail: 'Python expr',
					info: 'Apply info color to matching rows.',
				},
			},
			{
				name: 'decoration-warning',
				completion: {
					detail: 'Python expr',
					info: 'Apply warning color to matching rows.',
				},
			},
			{
				name: 'decoration-success',
				completion: {
					detail: 'Python expr',
					info: 'Apply success color to matching rows.',
				},
			},
			{
				name: 'decoration-muted',
				completion: {
					detail: 'Python expr',
					info: 'Apply muted color to matching rows.',
				},
			},
			{
				name: 'decoration-primary',
				completion: {
					detail: 'Python expr',
					info: 'Apply primary color to matching rows.',
				},
			},
			{
				name: 'limit',
				completion: {
					detail: 'int',
					info: 'Default page size. Must be positive.',
				},
			},
			{
				name: 'groups_limit',
				completion: {
					detail: 'int',
					info: 'Default number of groups per page when grouped. Must be positive.',
				},
			},
			{
				name: 'expand',
				completion: {
					detail: 'bool',
					info: 'Auto-open the first level of groups when grouped. Default: false.',
				},
			},
			{
				name: 'sample',
				completion: {
					detail: 'bool',
					info: 'Show sample records when none found. Default: false.',
				},
			},
		],
		children: ['field', 'button', 'groupby', 'control'],
		completion: {
			detail: 'view',
			info: 'List view root element. In v16 the root element is <tree>.',
		},
	};

	return [
		LIST_ROOT,
		LIST_FIELD,
		LIST_BUTTON,
		LIST_GROUPBY,
		LIST_CONTROL,
		LIST_CREATE,
	];
}

// ── Search view ────────────────────────────────────────────────────

export function buildSearchElements(fields?: OdooFieldMap): ElementSpec[] {
	const fieldNameAttr = buildFieldNameAttr(fields);

	const SEARCH_FIELD: ElementSpec = {
		name: 'field',
		attributes: [
			fieldNameAttr,
			{
				name: 'string',
				completion: {
					detail: 'string',
					info: "The field's label in the search view.",
				},
			},
			{
				name: 'operator',
				completion: {
					detail: 'string',
					info: "Override the default filter operator. Default: '=' for float, 'ilike' for char, 'child_of' for many2one.",
				},
			},
			{
				name: 'filter_domain',
				completion: {
					detail: 'domain',
					info: 'Complete domain to use as search domain. Use self for user-provided value. Takes precedence over operator.',
				},
			},
			{
				name: 'context',
				completion: {
					detail: 'dict',
					info: 'Context keys to add. User-provided values available as self (array for Many2one). By default fields generate no domain.',
				},
			},
			{
				name: 'domain',
				completion: {
					detail: 'domain',
					info: 'Filters applied to auto-completion results. Many2one fields only.',
				},
			},
		],
		completion: {
			detail: 'search',
			info: 'Defines a searchable field. Field domains are composed with AND.',
		},
	};

	// v16: default_period uses named period values same as v17
	const SEARCH_FILTER: ElementSpec = {
		name: 'filter',
		attributes: [
			{
				name: 'name',
				completion: {
					detail: 'string',
					info: 'Logical name. Used to enable by default via search_default_{name} context key or as inheritance hook.',
				},
			},
			{
				name: 'string',
				completion: {
					detail: 'string (required)',
					info: 'Label of the filter.',
				},
			},
			{
				name: 'help',
				completion: { detail: 'string', info: 'Tooltip text for the filter.' },
			},
			{
				name: 'domain',
				completion: {
					detail: 'domain',
					info: 'Domain appended to the action domain as part of the search domain.',
				},
			},
			{
				name: 'date',
				completion: {
					detail: 'string',
					info: 'Date/datetime field name. Creates time-based filter submenu with year, quarter, and month options.',
				},
			},
			{
				name: 'default_period',
				completion: {
					detail: 'string',
					info: 'Default period for date filters. Comma-separated values from: today, this_week, this_month, last_month, antepenultimate_month, fourth_quarter, third_quarter, second_quarter, first_quarter, this_year, last_year, antepenultimate_year. Default: this_month.',
				},
			},
			{
				name: 'context',
				completion: {
					detail: 'dict',
					info: "Merged into action domain. Use 'group_by' key to define a Group By entry. For date fields, use 'date_field:interval' syntax.",
				},
			},
			{
				name: 'groups',
				completion: {
					detail: 'string',
					info: 'Make the filter only available to specific users.',
				},
			},
		],
		children: ['filter'],
		completion: {
			detail: 'search',
			info: 'Pre-defined toggle filter. Sequences of adjacent filters are joined with OR.',
		},
	};

	const SEARCH_SEPARATOR: ElementSpec = {
		name: 'separator',
		completion: {
			detail: 'search',
			info: 'Separates groups of filters in simple search views.',
		},
	};

	const SEARCH_GROUP: ElementSpec = {
		name: 'group',
		children: ['filter', 'field', 'separator'],
		completion: {
			detail: 'search',
			info: 'Separates groups of filters. More readable than separator in complex search views.',
		},
	};

	// v16: searchpanel has view_types attr, default 'tree,kanban'
	const SEARCHPANEL_FIELD: ElementSpec = {
		name: 'field',
		attributes: [
			fieldNameAttr,
			{
				name: 'string',
				completion: { detail: 'string', info: 'Label to display.' },
			},
			{
				name: 'select',
				values: ['one', 'multi'],
				completion: {
					detail: 'string',
					info: "'one' allows at most one value (many2one, selection). 'multi' shows checkboxes (many2one, many2many, selection). Default: one.",
				},
			},
			{ name: 'icon', completion: { detail: 'string', info: 'Icon to use.' } },
			{ name: 'color', completion: { detail: 'string', info: 'Icon color.' } },
			{
				name: 'hierarchize',
				completion: {
					detail: 'bool',
					info: 'Show child categories under their parent. Many2one with select=one only. Default: true.',
				},
			},
			{
				name: 'enable_counters',
				completion: {
					detail: 'bool',
					info: 'Compute and display record counters when non-zero. select=multi only. Default: false.',
				},
			},
			{
				name: 'expand',
				completion: {
					detail: 'bool',
					info: 'Show categories/filters with 0 records. select=multi only. Default: false.',
				},
			},
			{
				name: 'limit',
				completion: {
					detail: 'int',
					info: 'Max values to fetch. 0 fetches all. select=multi only. Default: 200.',
				},
			},
			{
				name: 'domain',
				completion: {
					detail: 'domain',
					info: 'Conditions that comodel records must satisfy. select=multi only. Can depend on a select=one field.',
				},
			},
			{
				name: 'groupby',
				completion: {
					detail: 'string',
					info: 'Comodel field name to group values by. Many2one and Many2many with select=multi only.',
				},
			},
		],
		completion: {
			detail: 'searchpanel',
			info: 'Field used as a filter in the search panel.',
		},
	};

	const SEARCHPANEL: ElementSpec = {
		name: 'searchpanel',
		attributes: [
			// v16: has view_types attr
			{
				name: 'view_types',
				completion: {
					detail: 'string',
					info: "Comma-separated view types to enable the panel on. Default: 'tree,kanban'.",
				},
			},
		],
		children: ['field'],
		completion: {
			detail: 'search',
			info: "Displays a search panel on the left of multi-record views. Enabled by default on 'tree,kanban'.",
		},
	};

	const SEARCH_ROOT: ElementSpec = {
		name: 'search',
		top: true,
		children: ['field', 'filter', 'separator', 'group', 'searchpanel'],
		completion: {
			detail: 'view',
			info: 'Search view root element. Defines filters, groupbys and search panel.',
		},
	};

	return [
		SEARCH_ROOT,
		SEARCH_FIELD,
		SEARCH_FILTER,
		SEARCH_SEPARATOR,
		SEARCH_GROUP,
		SEARCHPANEL,
		SEARCHPANEL_FIELD,
	];
}

// ── Kanban view ────────────────────────────────────────────────────
// v16: no header element, no on_create, no can_open, no highlight_color
// v16: kanban-box root template, kanban-menu optional
// v16: field has allow_group_range_value attr
// v16: button types include open (read-only), edit (editable), delete

export function buildKanbanElements(fields?: OdooFieldMap): ElementSpec[] {
	const fieldNameAttr = buildFieldNameAttr(fields);

	const KANBAN_FIELD: ElementSpec = {
		name: 'field',
		attributes: [
			fieldNameAttr,
			{
				name: 'allow_group_range_value',
				completion: {
					detail: 'bool',
					info: 'Whether a date/datetime field allows a value computed from a group range (first and last dates of the group). Enables quick create and drag-and-drop when kanban is grouped by that field. Default: false.',
				},
			},
		],
		completion: {
			detail: 'field',
			info: "Declares a field to use in kanban templates. If simply displayed, doesn't need to be pre-declared.",
		},
	};

	const KANBAN_PROGRESSBAR: ElementSpec = {
		name: 'progressbar',
		attributes: [
			{
				name: 'field',
				completion: {
					detail: 'string (required)',
					info: 'Field whose values sub-group column records in the progress bar.',
				},
			},
			{
				name: 'colors',
				completion: {
					detail: 'JSON (required)',
					info: "JSON mapping field values to 'danger', 'warning', 'success', or 'muted'.",
				},
			},
			{
				name: 'sum_field',
				completion: {
					detail: 'string',
					info: 'Field to sum and display next to the progress bar. Defaults to total record count.',
				},
			},
		],
		completion: {
			detail: 'kanban',
			info: 'Progress bar displayed on top of kanban columns.',
		},
	};

	// v16: kanban-box is root, kanban-menu for dropdown, kanban-tooltip for hover
	// button types: action, object, open (read-only form), edit (editable form), delete
	const KANBAN_TEMPLATES: ElementSpec = {
		name: 'templates',
		children: ['t'],
		completion: {
			detail: 'kanban',
			info: "QWeb templates. Must define root template t-name='kanban-box'. Optional: t-name='kanban-menu' for dropdown (⋮ button). Buttons support type='open' (read-only form), type='edit' (editable form), type='delete'.",
		},
	};

	const KANBAN_ROOT: ElementSpec = {
		name: 'kanban',
		top: true,
		attributes: [
			{
				name: 'default_group_by',
				completion: {
					detail: 'string',
					info: 'Field to group by when no grouping is specified via action or search.',
				},
			},
			{
				name: 'default_order',
				completion: {
					detail: 'string',
					info: 'Card sorting order when user has not already sorted via list view.',
				},
			},
			{
				name: 'class',
				completion: {
					detail: 'string',
					info: 'HTML classes added to the root element.',
				},
			},
			{
				name: 'examples',
				completion: {
					detail: 'string',
					info: 'Key in KanbanExamplesRegistry for column setup examples shown when creating a column.',
				},
			},
			{
				name: 'group_create',
				completion: {
					detail: 'bool',
					info: "Whether the 'Add a new column' bar is visible. Default: true.",
				},
			},
			{
				name: 'group_delete',
				completion: {
					detail: 'bool',
					info: 'Whether groups can be deleted via context menu. Default: true.',
				},
			},
			{
				name: 'group_edit',
				completion: {
					detail: 'bool',
					info: 'Whether groups can be edited via context menu. Default: true.',
				},
			},
			{
				name: 'archivable',
				completion: {
					detail: 'bool',
					info: 'Whether records can be archived/restored if active field is defined on the model. Default: true.',
				},
			},
			{
				name: 'quick_create',
				completion: {
					detail: 'bool',
					info: 'Whether records can be created without switching to form view. Default: true when grouped by many2one, selection, char, or boolean.',
				},
			},
			{
				name: 'quick_create_view',
				completion: {
					detail: 'string',
					info: 'Form view reference to open for quick record creation.',
				},
			},
			{
				name: 'records_draggable',
				completion: {
					detail: 'bool',
					info: 'Whether records can be dragged when kanban is grouped. Default: true.',
				},
			},
			{
				name: 'groups_draggable',
				completion: {
					detail: 'bool',
					info: 'Whether columns can be resequenced when kanban is grouped. Default: true.',
				},
			},
			{
				name: 'sample',
				completion: {
					detail: 'bool',
					info: 'Show sample records when none found. Default: false.',
				},
			},
			{ name: 'string', completion: { detail: 'string', info: 'View title.' } },
			{
				name: 'create',
				completion: { detail: 'bool', info: 'Disable/enable record creation.' },
			},
			{
				name: 'edit',
				completion: { detail: 'bool', info: 'Disable/enable record editing.' },
			},
			{
				name: 'delete',
				completion: { detail: 'bool', info: 'Disable/enable record deletion.' },
			},
		],
		// v16: no header, no control
		children: ['field', 'progressbar', 'templates'],
		completion: {
			detail: 'view',
			info: "Kanban view root element. Templates use t-name='kanban-box' as root.",
		},
	};

	return [KANBAN_ROOT, KANBAN_FIELD, KANBAN_PROGRESSBAR, KANBAN_TEMPLATES];
}

// ── Pivot view ─────────────────────────────────────────────────────

export function buildPivotElements(fields?: OdooFieldMap): ElementSpec[] {
	const fieldNameAttr = buildFieldNameAttr(fields);

	const PIVOT_FIELD: ElementSpec = {
		name: 'field',
		attributes: [
			fieldNameAttr,
			{
				name: 'string',
				completion: {
					detail: 'string',
					info: 'Override the display name in the pivot view.',
				},
			},
			{
				name: 'type',
				values: ['row', 'col', 'measure', 'interval'],
				completion: {
					detail: 'string',
					info: "'row' groups by field (default), 'col' creates column groups, 'measure' aggregates, 'interval' groups date fields by interval.",
				},
			},
			{
				name: 'interval',
				values: ['day', 'week', 'month', 'quarter', 'year'],
				completion: {
					detail: 'string',
					info: 'Grouping interval for date/datetime fields.',
				},
			},
			{
				name: 'invisible',
				completion: {
					detail: 'bool',
					info: 'If true, field will not appear in active or selectable measures.',
				},
			},
			{
				name: 'widget',
				completion: {
					detail: 'string',
					info: "Formatter widget e.g. 'date', 'datetime', 'float_time', 'monetary'.",
				},
			},
		],
		completion: {
			detail: 'field',
			info: 'Defines a field for grouping or aggregation in the pivot view.',
		},
	};

	const PIVOT_ROOT: ElementSpec = {
		name: 'pivot',
		top: true,
		attributes: [
			{
				name: 'disable_linking',
				completion: {
					detail: 'bool',
					info: "Set to '1' to remove table cell links to list view.",
				},
			},
			{
				name: 'display_quantity',
				completion: {
					detail: 'bool',
					info: "Set to '1' to display the Quantity column by default.",
				},
			},
			{
				name: 'default_order',
				completion: {
					detail: 'string',
					info: "Measure name and order (asc or desc) for default ordering. e.g. 'foo asc'.",
				},
			},
			{ name: 'string', completion: { detail: 'string', info: 'View title.' } },
			{
				name: 'sample',
				completion: {
					detail: 'bool',
					info: 'Show sample records when none found. Default: false.',
				},
			},
		],
		children: ['field'],
		completion: {
			detail: 'view',
			info: 'Pivot view root element. Aggregates data as a pivot table. Non-stored function fields cannot be used.',
		},
	};

	return [PIVOT_ROOT, PIVOT_FIELD];
}

// ── Schema builder ─────────────────────────────────────────────────

export function buildOdooXmlSchemaV16(fields?: OdooFieldMap): {
	elements: ElementSpec[];
	attributes: AttrSpec[];
} {
	return {
		elements: [
			...buildFormElements(fields),
			...buildListElements(fields),
			...buildSearchElements(fields),
			...buildKanbanElements(fields),
			...buildPivotElements(fields),
		],
		attributes: GLOBAL_ATTRS_V16,
	};
}
