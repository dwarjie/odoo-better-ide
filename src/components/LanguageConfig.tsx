import { EditorLanguage } from '@/types/Config.types';

interface LANGUAGE_ITEMS {
	value: EditorLanguage;
	label: string;
}

const LANGUAGES: LANGUAGE_ITEMS[] = [
	{ value: 'python', label: 'Python' },
	{ value: 'qweb', label: 'QWeb / XML' },
	{ value: 'javascript', label: 'javascript' },
];

interface Props {
	value: EditorLanguage;
	onChange: (value: EditorLanguage) => void;
}

export default function LanguageConfig({ value, onChange }: Props) {
	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">Language</label>
					<select
						className="select select-bordered select-xs w-36 text-xs"
						disabled={true}
						value={value}
						onChange={(e) => onChange(e.target.value as EditorLanguage)}
					>
						<option value="auto">Auto detect</option>
						{LANGUAGES.map((lang) => (
							<option key={lang.value} value={lang.value}>
								{lang.label}
							</option>
						))}
					</select>
				</div>

				<p className="text-base-content/50 text-xs leading-relaxed">
					Language is automatically detected from the Ace editor mode.
				</p>
			</div>
		</div>
	);
}
