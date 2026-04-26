import { useState } from 'react';

const MIN = 10;
const MAX = 24;

export default function FontSizeConfig() {
	const [size, setSize] = useState(14);

	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">Font Size</label>
					<span className="text-primary font-mono text-xs font-semibold">
						{size}px
					</span>
				</div>
				<input
					type="range"
					min={MIN}
					max={MAX}
					value={size}
					className="range range-primary range-xs"
					onChange={(e) => setSize(Number(e.target.value))}
				/>
				<div className="text-base-content/30 flex justify-between font-mono text-xs">
					<span>{MIN}px</span>
					<span>{MAX}px</span>
				</div>
			</div>
		</div>
	);
}
