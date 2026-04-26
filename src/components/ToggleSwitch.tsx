import { useState } from 'react';

export default function ToggleSwitch() {
	const [enabled, setEnabled] = useState(true);

	return (
		<label className="flex cursor-pointer items-center gap-2">
			<span
				className={`font-mono text-xs ${enabled ? 'text-success' : 'text-base-content/40'}`}
			>
				{enabled ? 'ON' : 'OFF'}
			</span>
			<input
				type="checkbox"
				className="toggle toggle-primary toggle-sm"
				checked={enabled}
				onChange={(e) => setEnabled(e.target.checked)}
			/>
		</label>
	);
}
