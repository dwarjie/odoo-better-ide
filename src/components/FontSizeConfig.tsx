const MIN = 10;
const MAX = 24;

interface Props {
	value: number;
	onChange: (size: number) => void;
}
export default function FontSizeConfig({ value, onChange }: Props) {
	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">Font Size</label>
					<span className="text-primary font-mono text-xs font-semibold">
						{value}px
					</span>
				</div>
				<input
					type="range"
					min={MIN}
					max={MAX}
					value={value}
					className="range range-primary range-xs"
					onChange={(e) => onChange(Number(e.target.value))}
				/>
				<div className="text-base-content/30 flex justify-between font-mono text-xs">
					<span>{MIN}px</span>
					<span>{MAX}px</span>
				</div>
			</div>
		</div>
	);
}
