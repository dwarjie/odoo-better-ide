import { AttrSpec, ElementSpec } from '@codemirror/lang-xml';

export interface OdooVersion {
	version: number | null;
}

export type OdooField = {
	string: string;
	type: string;
	relation?: string;
	help?: string;
};

export type OdooFieldMap = Record<string, OdooField>;

export type RpcParams = {
	model: string;
	method: string;
	args?: unknown[];
	kwargs?: Record<string, unknown>;
};

export type RpcResponse<T> = {
	jsonrpc: string;
	id: number | null;
	result?: T;
	error?: {
		code: number;
		message: string;
		data: unknown;
	};
};

export type Many2one = [number, string];

export type XmlSchema = {
	elements: ElementSpec[];
	attributes: AttrSpec[];
};
