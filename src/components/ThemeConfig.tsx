import { EditorTheme } from '@/types/Config.types';

interface THEME_ITEMS {
	value: EditorTheme;
	label: string;
}

const THEMES: THEME_ITEMS[] = [
	{ value: 'andromeda', label: 'Andromeda' },
	{ value: 'basic-dark', label: 'Basic Dark' },
	{ value: 'basic-light', label: 'Basic Light' },
	{ value: 'catpuccin', label: 'Catpuccin' },
	{ value: 'github-dark', label: 'GitHub Dark' },
	{ value: 'github-light', label: 'GitHub Light' },
	{ value: 'high-contrast-dark', label: 'High Contrast Dark' },
	{ value: 'high-contrast-light', label: 'High Contrast Light' },
	{ value: 'monokai', label: 'Monokai' },
	{ value: 'one-dark', label: 'One Dark' },
	{ value: 'solarized-dark', label: 'Solarized Dark' },
	{ value: 'solarized-light', label: 'Solarized Light' },
	{ value: 'tokyo-night-storm', label: 'Tokyo Night Storm' },
	{ value: 'tokyo-night-day', label: 'Tokyo Night Day' },
	{ value: 'vscode-dark', label: 'VS Code Dark' },
	{ value: 'vscode-light', label: 'VS Code Light' },
];

interface Props {
	value: EditorTheme;
	onChange: (value: EditorTheme) => void;
}

export default function ThemeConfig({ value, onChange }: Props) {
	return (
		<div className="card bg-base-200 border-base-300 border">
			<div className="card-body gap-2 p-3">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium">IDE Theme</label>
					<select
						className="select select-bordered select-xs w-44 text-xs"
						value={value}
						onChange={(e) => onChange(e.target.value as EditorTheme)}
					>
						{THEMES.map((t) => (
							<option key={t.value} value={t.value}>
								{t.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
