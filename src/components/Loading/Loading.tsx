import './index.css';

export default function LoadingIndicator() {
	return (
		<div className="odoo-ide-loading">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				className="odoo-ide-loading__spinner"
			>
				<circle cx="8" cy="8" r="6" fill="none" stroke="#555" strokeWidth="2" />
				<path
					d="M8 2 A6 6 0 0 1 14 8"
					fill="none"
					stroke="#858585"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
			<span>Initializing Odoo Better IDE...</span>
		</div>
	);
}
