import ToggleSwitch from './ToggleSwitch';

export default function Header() {
	return (
		<header className="border-base-300 flex items-center justify-between border-b px-4 py-3">
			<div className="flex items-center gap-2">
				<div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2 4L6 8L2 12"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8 11H12"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</div>
				<span className="text-sm font-semibold tracking-tight">
					Odoo Better IDE
				</span>
			</div>
			<ToggleSwitch />
		</header>
	);
}
