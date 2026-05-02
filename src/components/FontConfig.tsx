import { EditorFont } from '@/types/Config.types';

interface FONT_ITEMS {
	value: EditorFont;
	label: string;
}
const FONTS: FONT_ITEMS[] = [
	{ value: 'JetBrains Mono', label: 'JetBrains Mono' },
	{ value: 'Fira Code', label: 'Fira Code' },
	{ value: 'Source Code Pro', label: 'Source Code Pro' },
	{ value: 'Cascadia Code', label: 'Cascadia Code' },
	{ value: 'monospace', label: 'System Monospace' },
];

interface Props {
	value: EditorFont;
	onChange: (value: EditorFont) => void;
}
export default function FontConfig({ value, onChange }: Props) {
	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">Font Family</label>
					<select
						className="select select-bordered select-xs w-44 text-xs"
						value={value}
						onChange={(e) => onChange(e.target.value as EditorFont)}
					>
						{FONTS.map((f) => (
							<option key={f.value} value={f.value}>
								{f.label}
							</option>
						))}
					</select>
				</div>
				<p
					className="text-base-content/40 truncate text-xs"
					style={{ fontFamily: value }}
				>
					const odoo = window.odoo?.info;
				</p>
			</div>
		</div>
	);
}
