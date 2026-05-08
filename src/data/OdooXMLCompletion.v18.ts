import type { ElementSpec, AttrSpec } from '@codemirror/lang-xml';
import type { OdooFieldMap } from '@/types';
import { buildFieldNameAttr } from '@/utils/Completion.utils';

// ── Global attributes ──────────────────────────────────────────────
export const GLOBAL_ATTRS_V18: AttrSpec[] = [
	{
		name: 'invisible',
		global: true,
		completion: {
			detail: 'Python expr',
			info: 'Hides the element when the expression evaluates to true. Has access to field values, uid, today, now, context, parent.',
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
		name: 'column_invisible',
		global: true,
		completion: {
			detail: 'Python expr',
			info: 'Hides the entire column in list views. Available in list sub-views of relational fields only.',
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
					info: 'Node id. Useful when the same field appears multiple times.',
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
					info: 'Override the default field widget.',
				},
			},
			{
				name: 'options',
				completion: {
					detail: 'Python expr → dict',
					info: 'Widget configuration. Relation fields support: no_create, no_quick_create, no_open, no_create_edit.',
				},
			},
			{
				name: 'domain',
				completion: {
					detail: 'Python expr → domain',
					info: 'Filters when displaying existing records for selection. Relational fields only.',
				},
			},
			{
				name: 'context',
				completion: {
					detail: 'Python expr → dict',
					info: 'Context used when fetching values or creating records. Relational fields only.',
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
					info: 'Help message shown in empty fields.',
				},
			},
			{
				name: 'mode',
				completion: {
					detail: 'string',
					info: 'Comma-separated display modes for linked records: list, form, kanban, graph. Default: list. One2many/Many2many only.',
				},
			},
			{
				name: 'class',
				completion: {
					detail: 'string',
					info: 'HTML class added to the generated element.',
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
					info: 'Whether the field stores a password. Char fields only.',
				},
			},
			{
				name: 'kanban_view_ref',
				completion: {
					detail: 'string',
					info: 'XMLID of the Kanban view to use in mobile. Relational fields only.',
				},
			},
			{
				name: 'default_focus',
				completion: {
					detail: 'bool',
					info: 'Focus this field when the view opens. Only one per view.',
				},
			},
		],
		children: ['list', 'form', 'kanban', 'graph'],
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
					detail: 'Python expr → dict',
					info: 'Context merged when performing the action.',
				},
			},
			{ name: 'class', completion: { detail: 'string', info: 'HTML class.' } },
			{
				name: 'special',
				values: ['save', 'cancel'],
				completion: {
					detail: 'string',
					info: "'save' saves and closes the dialog, 'cancel' closes without saving.",
				},
			},
			{
				name: 'confirm',
				completion: {
					detail: 'string',
					info: 'Confirmation message shown before performing the action.',
				},
			},
			{
				name: 'data-hotkey',
				completion: {
					detail: 'string',
					info: "Keyboard shortcut bound with alt key. Prepend 'shift+' for alt+shift. e.g. 'c' or 'shift+k'.",
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
		],
		children: ['field', 'group', 'separator', 'newline', 'button', 'label'],
		completion: {
			detail: 'form',
			info: 'Column layout container. Default: 2 columns.',
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
			info: 'Full-width area above the sheet. Used for workflow buttons and status bar fields.',
		},
	};

	const FORM_FOOTER: ElementSpec = {
		name: 'footer',
		attributes: [
			{
				name: 'replace',
				completion: {
					detail: 'bool',
					info: "Whether this footer replaces the default dialog buttons. Set to '0' to add alongside defaults. Default: true.",
				},
			},
		],
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
				completion: { detail: 'string', info: 'Title of the tab.' },
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
			info: 'Adds vertical spacing. With string attribute acts as a section title.',
		},
	};

	const FORM_NEWLINE: ElementSpec = {
		name: 'newline',
		completion: {
			detail: 'form',
			info: 'Ends the current row in a group and switches to a new row.',
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
				name: 'optional',
				values: ['show', 'hide'],
				completion: {
					detail: 'string',
					info: "'show' visible by default, 'hide' hidden by default.",
				},
			},
			{
				name: 'widget',
				completion: {
					detail: 'string',
					info: 'Override the default field widget.',
				},
			},
			{
				name: 'sum',
				completion: {
					detail: 'string',
					info: 'Label for the sum aggregate shown at the bottom of the column.',
				},
			},
			{
				name: 'avg',
				completion: {
					detail: 'string',
					info: 'Label for the average aggregate shown at the bottom of the column.',
				},
			},
			{
				name: 'width',
				completion: {
					detail: 'string',
					info: 'Column width in pixels e.g. 40px. Represents the space required to render cell values; total column width adds left and right padding.',
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
					info: "'object' calls a method, 'action' executes an ir.action.",
				},
			},
			{
				name: 'name',
				completion: { detail: 'string', info: 'Method name or action ID.' },
			},
			{
				name: 'string',
				completion: { detail: 'string', info: 'Button label.' },
			},
			{
				name: 'icon',
				completion: { detail: 'string', info: 'Font Awesome icon class.' },
			},
			{ name: 'help', completion: { detail: 'string', info: 'Tooltip text.' } },
			{
				name: 'context',
				completion: {
					detail: 'Python expr → dict',
					info: 'Context merged when performing the action.',
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
					info: "Many2one field name to group by. A button with type='edit' can open the record's form view.",
				},
			},
		],
		children: ['field', 'button'],
		completion: {
			detail: 'list',
			info: 'Defines custom headers when grouping by a Many2one field.',
		},
	};

	const LIST_HEADER: ElementSpec = {
		name: 'header',
		children: ['button'],
		completion: {
			detail: 'list',
			info: "Displays buttons in the list control panel. Buttons can have display='always' to show without selection.",
		},
	};

	// v18: control only supports create and button children — no delete element
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
					detail: 'Python expr → dict',
					info: 'Context merged when creating the new record.',
				},
			},
		],
		completion: {
			detail: 'list',
			info: 'Custom create button. Replaces the default Add a line button.',
		},
	};

	const LIST_CONTROL: ElementSpec = {
		name: 'control',
		children: ['create', 'button'],
		completion: {
			detail: 'list',
			info: 'Adds custom create buttons inside One2many or Many2many fields. Overrides the default Add a line button when any create element is defined.',
		},
	};

	const LIST_ROOT: ElementSpec = {
		name: 'list',
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
				name: 'import',
				completion: { detail: 'bool', info: 'Disable/enable record import.' },
			},
			{
				name: 'export_xlsx',
				completion: { detail: 'bool', info: 'Disable/enable Excel export.' },
			},
			{
				name: 'editable',
				values: ['top', 'bottom'],
				completion: {
					detail: 'string',
					info: "Make records editable in-place. 'top' creates new records at the top, 'bottom' at the bottom.",
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
				name: 'open_form_view',
				completion: {
					detail: 'bool',
					info: 'Display a button at end of each row to open the record in a form view.',
				},
			},
			{
				name: 'default_group_by',
				completion: {
					detail: 'string',
					info: 'Field to group by when no grouping is specified.',
				},
			},
			{
				name: 'default_order',
				completion: {
					detail: 'string',
					info: 'Comma-separated fields to order by. Postfix with desc for reverse order.',
				},
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
					info: 'Default page size. Default: 80 for list views, 40 for X2many.',
				},
			},
			{
				name: 'groups_limit',
				completion: {
					detail: 'int',
					info: 'Default number of groups per page when grouped.',
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
		children: ['field', 'button', 'groupby', 'header', 'control'],
		completion: { detail: 'view', info: 'List view root element.' },
	};

	return [
		LIST_ROOT,
		LIST_FIELD,
		LIST_BUTTON,
		LIST_GROUPBY,
		LIST_HEADER,
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
					info: 'Field label in the search view.',
				},
			},
			{
				name: 'operator',
				completion: {
					detail: 'string',
					info: "Override the default filter operator. Default depends on field type: '=' for float, 'ilike' for char, 'child_of' for many2one.",
				},
			},
			{
				name: 'filter_domain',
				completion: {
					detail: 'Python expr → domain',
					info: 'Complete domain to use as the search domain. Use self for the user-provided value. Takes precedence over operator.',
				},
			},
			{
				name: 'context',
				completion: {
					detail: 'Python expr → dict',
					info: 'Context merged into the targeted view. User-provided values available as self.',
				},
			},
			{
				name: 'domain',
				completion: {
					detail: 'Python expr → domain',
					info: 'Filters applied to auto-completion results. Many2one fields only.',
				},
			},
		],
		completion: {
			detail: 'search',
			info: 'Defines a searchable field. Field domains are joined with AND.',
		},
	};

	// v18: filter does not support lazy-loaded field child or date sub-filter attrs
	const SEARCH_FILTER: ElementSpec = {
		name: 'filter',
		attributes: [
			{
				name: 'name',
				completion: {
					detail: 'string (required)',
					info: 'Technical name. Used to enable by default via context key search_default_{name} or as inheritance hook.',
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
				completion: {
					detail: 'string',
					info: 'Tooltip displayed when hovering the filter.',
				},
			},
			{
				name: 'domain',
				completion: {
					detail: 'Python expr → domain',
					info: 'Domain appended to the search domain when enabled.',
				},
			},
			{
				name: 'date',
				completion: {
					detail: 'string',
					info: 'Date/datetime field name. Creates time-based sub-filters in a Filters submenu (year, quarter, month).',
				},
			},
			{
				name: 'context',
				completion: {
					detail: 'Python expr → dict',
					info: "Merged into the search domain. Use 'group_by' key to define a Group By menu entry. For date/datetime fields, use syntax 'date_field:interval'.",
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
			info: 'Separates groups of filters in simple search views, causing adjacent groups to be joined with AND.',
		},
	};

	const SEARCH_GROUP: ElementSpec = {
		name: 'group',
		children: ['filter', 'field', 'separator'],
		completion: {
			detail: 'search',
			info: 'Separates groups of filters in cluttered search views.',
		},
	};

	// v18: searchpanel field does not support depth attr
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
					info: "'one' allows at most one value (many2one, selection). 'multi' allows multiple (many2one, many2many, selection). Default: one.",
				},
			},
			{
				name: 'icon',
				completion: { detail: 'string', info: 'Icon of the field.' },
			},
			{
				name: 'color',
				completion: { detail: 'string', info: 'Color of the field.' },
			},
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
					info: 'Show categories and filters with no records. select=multi only. Default: false.',
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
					detail: 'Python expr → domain',
					info: 'Conditions that records must satisfy. select=multi only.',
				},
			},
			{
				name: 'groupby',
				completion: {
					detail: 'string',
					info: 'Field name to group values by. Many2one and Many2many with select=multi only.',
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
		children: ['field'],
		completion: {
			detail: 'search',
			info: 'Displays a search panel to the left of multi-record views.',
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

export function buildKanbanElements(fields?: OdooFieldMap): ElementSpec[] {
	const fieldNameAttr = buildFieldNameAttr(fields);

	const KANBAN_FIELD: ElementSpec = {
		name: 'field',
		attributes: [fieldNameAttr],
		completion: {
			detail: 'field',
			info: 'Declares a field to fetch for use in templates.',
		},
	};

	const KANBAN_PROGRESSBAR: ElementSpec = {
		name: 'progressbar',
		attributes: [
			{
				name: 'field',
				completion: {
					detail: 'string (required)',
					info: 'Field whose values sub-group the column records in the progress bar.',
				},
			},
			{
				name: 'colors',
				completion: {
					detail: 'JSON (required)',
					info: "JSON mapping field values to 'muted', 'success', 'warning', or 'danger'.",
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
			info: 'Progress bar displayed on top of kanban columns in grouped views.',
		},
	};

	const KANBAN_TEMPLATES: ElementSpec = {
		name: 'templates',
		children: ['t'],
		completion: {
			detail: 'kanban',
			info: 'Container for QWeb templates. Must define at least one root template named card. Optional menu template for the dropdown.',
		},
	};

	const KANBAN_HEADER: ElementSpec = {
		name: 'header',
		children: ['button'],
		completion: {
			detail: 'kanban',
			info: "Inserts buttons in the control panel. Buttons can have display='always' to show at all times.",
		},
	};

	const KANBAN_ROOT: ElementSpec = {
		name: 'kanban',
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
				name: 'default_group_by',
				completion: {
					detail: 'string',
					info: 'Field to group by when no grouping is specified.',
				},
			},
			{
				name: 'default_order',
				completion: { detail: 'string', info: 'Card sorting order.' },
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
					info: 'Key in the KanbanExamplesRegistry for column setup examples.',
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
					info: 'Whether columns can be deleted via the cog menu. Default: true.',
				},
			},
			{
				name: 'group_edit',
				completion: {
					detail: 'bool',
					info: 'Whether columns can be edited via the cog menu. Default: true.',
				},
			},
			{
				name: 'groups_draggable',
				completion: {
					detail: 'bool',
					info: 'Whether columns can be reordered. Default: true.',
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
				name: 'archivable',
				completion: {
					detail: 'bool',
					info: 'Whether records can be archived/unarchived when active field is defined. Default: true.',
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
				name: 'on_create',
				completion: {
					detail: 'string',
					info: "Custom action when clicking Create. Set to 'quick_create' to use quick creation.",
				},
			},
			{
				name: 'can_open',
				completion: {
					detail: 'bool',
					info: 'Whether clicking a kanban card opens the record in a form view. Default: true.',
				},
			},
			{
				name: 'highlight_color',
				completion: {
					detail: 'string',
					info: 'Integer field name used to color the left border of kanban cards.',
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
		children: ['field', 'header', 'progressbar', 'templates'],
		completion: {
			detail: 'view',
			info: 'Kanban view root element. Displays records as cards.',
		},
	};

	return [
		KANBAN_ROOT,
		KANBAN_FIELD,
		KANBAN_PROGRESSBAR,
		KANBAN_TEMPLATES,
		KANBAN_HEADER,
	];
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
					info: 'Override the display name of the field in the pivot view.',
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
				name: 'widget',
				completion: {
					detail: 'string',
					info: "Formatter widget e.g. 'date', 'datetime', 'float_time', 'monetary'.",
				},
			},
		],
		completion: {
			detail: 'field',
			info: 'Defines a field used in the pivot view for grouping or aggregation.',
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
					info: "Field name and order (asc or desc) for default ordering. e.g. 'foo asc'.",
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
		children: ['field'],
		completion: {
			detail: 'view',
			info: 'Pivot view root element. Visualizes aggregations as a pivot table.',
		},
	};

	return [PIVOT_ROOT, PIVOT_FIELD];
}

// ── Schema builder ─────────────────────────────────────────────────

export function buildOdooXmlSchemaV18(fields?: OdooFieldMap): {
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
		attributes: GLOBAL_ATTRS_V18,
	};
}
