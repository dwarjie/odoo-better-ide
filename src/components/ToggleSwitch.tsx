interface Props {
	value: boolean;
	onChange: (value: boolean) => void;
}

export default function ToggleSwitch({ value, onChange }: Props) {
	return (
		<label className="flex cursor-pointer items-center gap-2">
			<span
				className={`font-mono text-xs ${value ? 'text-success' : 'text-base-content/40'}`}
			>
				{value ? 'ON' : 'OFF'}
			</span>
			<input
				type="checkbox"
				className="toggle toggle-primary toggle-sm"
				checked={value}
				onChange={(e) => onChange(e.target.checked)}
			/>
		</label>
	);
}
