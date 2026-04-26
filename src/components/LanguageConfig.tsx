import { useState } from 'react';

const LANGUAGES = [
	{ value: 'python', label: 'Python' },
	{ value: 'qweb', label: 'QWeb / XML' },
	{ value: 'json', label: 'JSON' },
];

export default function LanguageConfig() {
	const [language, setLanguage] = useState('auto');

	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">Language</label>
					<select
						className="select select-bordered select-xs w-36 text-xs"
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value="auto">Auto detect</option>
						{LANGUAGES.map((lang) => (
							<option key={lang.value} value={lang.value}>
								{lang.label}
							</option>
						))}
					</select>
				</div>

				{language !== 'auto' && (
					<div
						role="alert"
						className="alert alert-warning gap-2 rounded-lg px-3 py-2 text-xs"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
							/>
						</svg>
						<span>
							Overriding auto-detect may disable syntax highlighting and
							autocomplete for this editor.
						</span>
					</div>
				)}

				{language === 'auto' && (
					<p className="text-base-content/50 text-xs leading-relaxed">
						Language is automatically detected from the Ace editor mode.
					</p>
				)}
			</div>
		</div>
	);
}
