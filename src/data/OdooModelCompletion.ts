import { Completion } from '@codemirror/autocomplete';

export type ModelCompletionEntry = {
	label: string;
	detail?: string;
	info?: string;
	type: 'variable' | 'function' | 'class' | 'property' | 'keyword';
	boost?: number;
};

export type ModelCompletionRegistry = Record<string, ModelCompletionEntry[]>;

const toCompletion = (entry: ModelCompletionEntry): Completion => ({
	label: entry.label,
	detail: entry.detail,
	info: entry.info,
	type: entry.type,
	boost: entry.boost ?? 90,
});

// ── ir.actions.server ──────────────────────────────────────────────
const IR_ACTIONS_SERVER: ModelCompletionEntry[] = [
	{
		label: 'env',
		type: 'variable',
		detail: 'Environment',
		info: 'Environment on which the action is triggered.',
	},
	{
		label: 'model',
		type: 'variable',
		detail: 'void recordset',
		info: 'Model of the record on which the action is triggered. Is a void recordset.',
	},
	{
		label: 'record',
		type: 'variable',
		detail: 'recordset',
		info: 'Record on which the action is triggered. May be void.',
	},
	{
		label: 'records',
		type: 'variable',
		detail: 'recordset',
		info: 'Recordset of all records on which the action is triggered in multi mode. May be void.',
	},
	{
		label: 'time',
		type: 'variable',
		detail: 'Python library',
		info: 'Python time library.',
	},
	{
		label: 'datetime',
		type: 'variable',
		detail: 'Python library',
		info: 'Python datetime library.',
	},
	{
		label: 'dateutil',
		type: 'variable',
		detail: 'Python library',
		info: 'Python dateutil library.',
	},
	{
		label: 'timezone',
		type: 'variable',
		detail: 'Python library',
		info: 'Python timezone library.',
	},
	{
		label: 'float_compare',
		type: 'function',
		detail: '(value1, value2, precision_digits) → int',
		info: 'Utility function to compare floats based on a specific precision.',
	},
	{
		label: 'log',
		type: 'function',
		detail: "(message, level='info') → void",
		info: 'Logging function to record debug information in ir.logging table.',
	},
	{
		label: '_logger',
		type: 'variable',
		detail: 'logger',
		info: 'Logger to emit messages in server logs. Usage: _logger.info(message)',
	},
	{
		label: 'UserError',
		type: 'class',
		detail: 'exception',
		info: 'Exception class for raising user-facing warning messages.',
	},
	{
		label: 'Command',
		type: 'class',
		detail: 'namespace',
		info: 'x2many commands namespace.',
	},
];

// ── base.automation ──────────────────────────────────────────────
const BASE_AUTOMATION: ModelCompletionEntry[] = [
	{
		label: 'env',
		type: 'variable',
		detail: 'Environment',
		info: 'Environment on which the action is triggered.',
	},
	{
		label: 'model',
		type: 'variable',
		detail: 'void recordset',
		info: 'Model of the record on which the action is triggered. Is a void recordset.',
	},
	{
		label: 'record',
		type: 'variable',
		detail: 'recordset',
		info: 'Record on which the action is triggered. May be void.',
	},
	{
		label: 'records',
		type: 'variable',
		detail: 'recordset',
		info: 'Recordset of all records on which the action is triggered in multi mode. May be void.',
	},
	{
		label: 'time',
		type: 'variable',
		detail: 'Python library',
		info: 'Python time library.',
	},
	{
		label: 'datetime',
		type: 'variable',
		detail: 'Python library',
		info: 'Python datetime library.',
	},
	{
		label: 'dateutil',
		type: 'variable',
		detail: 'Python library',
		info: 'Python dateutil library.',
	},
	{
		label: 'timezone',
		type: 'variable',
		detail: 'Python library',
		info: 'Python timezone library.',
	},
	{
		label: 'float_compare',
		type: 'function',
		detail: '(value1, value2, precision_digits) → int',
		info: 'Utility function to compare floats based on a specific precision.',
	},
	{
		label: 'log',
		type: 'function',
		detail: "(message, level='info') → void",
		info: 'Logging function to record debug information in ir.logging table.',
	},
	{
		label: '_logger',
		type: 'variable',
		detail: 'logger',
		info: 'Logger to emit messages in server logs. Usage: _logger.info(message)',
	},
	{
		label: 'UserError',
		type: 'class',
		detail: 'exception',
		info: 'Exception class for raising user-facing warning messages.',
	},
	{
		label: 'Command',
		type: 'class',
		detail: 'namespace',
		info: 'x2many commands namespace.',
	},
];

// ── hr.salary.rule ─────────────────────────────────────────────────
const HR_SALARY_RULE: ModelCompletionEntry[] = [
	{
		label: 'payslip',
		type: 'variable',
		detail: 'hr.payslip',
		info: 'The current payslip object being processed.',
	},
	{
		label: 'employee',
		type: 'variable',
		detail: 'hr.employee',
		info: 'The employee object linked to the payslip.',
	},
	{
		label: 'version',
		type: 'variable',
		detail: 'hr.version',
		info: 'The salary structure version object.',
	},
	{
		label: 'result_rules',
		type: 'variable',
		detail: 'dict',
		info: 'Dict containing the rules amounts, quantities, rates and totals (previously computed).',
	},
	{
		label: 'categories',
		type: 'variable',
		detail: 'dict',
		info: 'Dict containing the computed salary rule categories (sum of amount of all rules belonging to that category).',
	},
	{
		label: 'worked_days',
		type: 'variable',
		detail: 'dict',
		info: 'Dict containing the computed worked days.',
	},
	{
		label: 'inputs',
		type: 'variable',
		detail: 'dict',
		info: 'Dict containing the computed inputs.',
	},
	{
		label: 'result',
		type: 'variable',
		detail: 'float',
		info: 'Base amount of the rule.',
	},
	{
		label: 'result_rate',
		type: 'variable',
		detail: 'float',
		info: 'Rate between -100.0 and 100.0, defaults to 100.0 (%).',
	},
	{
		label: 'result_qty',
		type: 'variable',
		detail: 'float',
		info: 'Quantity, defaults to 1.',
	},
	{
		label: 'result_name',
		type: 'variable',
		detail: 'string',
		info: 'Name of the line, defaults to the name field of the salary rule.',
	},
];

// ── ir.cron ────────────────────────────────────────────────────────
const IR_CRON: ModelCompletionEntry[] = [
	{
		label: 'env',
		type: 'variable',
		detail: 'Environment',
		info: 'Environment on which the action is triggered.',
	},
	{
		label: 'model',
		type: 'variable',
		detail: 'void recordset',
		info: 'Model of the record on which the action is triggered. Is a void recordset.',
	},
	{
		label: 'record',
		type: 'variable',
		detail: 'recordset',
		info: 'Record on which the action is triggered. May be void.',
	},
	{
		label: 'records',
		type: 'variable',
		detail: 'recordset',
		info: 'Recordset of all records on which the action is triggered in multi mode. May be void.',
	},
	{
		label: 'time',
		type: 'variable',
		detail: 'Python library',
		info: 'Python time library.',
	},
	{
		label: 'datetime',
		type: 'variable',
		detail: 'Python library',
		info: 'Python datetime library.',
	},
	{
		label: 'dateutil',
		type: 'variable',
		detail: 'Python library',
		info: 'Python dateutil library.',
	},
	{
		label: 'timezone',
		type: 'variable',
		detail: 'Python library',
		info: 'Python timezone library.',
	},
	{
		label: 'float_compare',
		type: 'function',
		detail: '(value1, value2, precision_digits) → int',
		info: 'Utility function to compare floats based on a specific precision.',
	},
	{
		label: 'log',
		type: 'function',
		detail: "(message, level='info') → void",
		info: 'Logging function to record debug information in ir.logging table.',
	},
	{
		label: '_logger',
		type: 'variable',
		detail: 'logger',
		info: 'Logger to emit messages in server logs. Usage: _logger.info(message)',
	},
	{
		label: 'UserError',
		type: 'class',
		detail: 'exception',
		info: 'Exception class for raising user-facing warning messages.',
	},
	{
		label: 'Command',
		type: 'class',
		detail: 'namespace',
		info: 'x2many commands namespace.',
	},
];

// ── hr.payroll.warning ─────────────────────────────────────────────
const HR_PAYROLL_WARNING: ModelCompletionEntry[] = [
	{
		label: 'env',
		type: 'variable',
		detail: 'Environment',
		info: 'Environment on which the action is triggered.',
	},
	{
		label: 'model',
		type: 'variable',
		detail: 'void recordset',
		info: 'Model of the record on which the action is triggered. Is a void recordset.',
	},
	{
		label: 'record',
		type: 'variable',
		detail: 'recordset',
		info: 'Record on which the action is triggered. May be void.',
	},
	{
		label: 'records',
		type: 'variable',
		detail: 'recordset',
		info: 'Recordset of all records on which the action is triggered in multi mode. May be void.',
	},
	{
		label: 'time',
		type: 'variable',
		detail: 'Python library',
		info: 'Python time library.',
	},
	{
		label: 'datetime',
		type: 'variable',
		detail: 'Python library',
		info: 'Python datetime library.',
	},
	{
		label: 'dateutil',
		type: 'variable',
		detail: 'Python library',
		info: 'Python dateutil library.',
	},
	{
		label: 'timezone',
		type: 'variable',
		detail: 'Python library',
		info: 'Python timezone library.',
	},
	{
		label: 'warning_count',
		type: 'variable',
		detail: 'int',
		info: 'Number of issues.',
	},
	{
		label: 'warning_records',
		type: 'variable',
		detail: 'recordset',
		info: 'Recordset of all records containing the issue.',
	},
	{
		label: 'warning_action',
		type: 'variable',
		detail: 'string',
		info: 'Action to open on click.',
	},
	{
		label: 'additional_context',
		type: 'variable',
		detail: 'dict',
		info: 'Dict to add in the context of action.',
	},
];

// ── Registry ───────────────────────────────────────────────────────
export const MODEL_COMPLETION_REGISTRY: ModelCompletionRegistry = {
	'ir.actions.server': IR_ACTIONS_SERVER,
	'hr.salary.rule': HR_SALARY_RULE,
	'ir.cron': IR_CRON,
	'hr.payroll.warning': HR_PAYROLL_WARNING,
	'base.automation': BASE_AUTOMATION,
};

export const getModelCompletions = (model: string | null): Completion[] => {
	if (!model) return [];

	const entries = MODEL_COMPLETION_REGISTRY[model];
	if (!entries) return [];
	return entries.map(toCompletion);
};
