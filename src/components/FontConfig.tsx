import { useState } from 'react';

const FONTS = [
	{ value: 'JetBrains Mono', label: 'JetBrains Mono' },
	{ value: 'Fira Code', label: 'Fira Code' },
	{ value: 'Source Code Pro', label: 'Source Code Pro' },
	{ value: 'Cascadia Code', label: 'Cascadia Code' },
	{ value: 'Inconsolata', label: 'Inconsolata' },
	{ value: 'monospace', label: 'System Monospace' },
];

export default function FontConfig() {
	const [font, setFont] = useState('JetBrains Mono');

	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">Font Family</label>
					<select
						className="select select-bordered select-xs w-44 text-xs"
						value={font}
						onChange={(e) => setFont(e.target.value)}
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
					style={{ fontFamily: font }}
				>
					const odoo = window.odoo?.info;
				</p>
			</div>
		</div>
	);
}
