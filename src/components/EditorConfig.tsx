import FontSizeConfig from './FontSizeConfig';
import FontConfig from './FontConfig';
import ThemeConfig from './ThemeConfig';
import LanguageConfig from './LanguageConfig';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';

interface Props {
	isSaving: boolean;
	updateConfig: <K extends keyof EditorConfigType>(
		key: K,
		value: EditorConfigType[K],
	) => void;
	config: EditorConfigType;
}
export default function EditorConfig({
	isSaving,
	updateConfig,
	config,
}: Props) {
	return (
		<section className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h2 className="text-base-content/40 text-xs font-semibold tracking-widest uppercase">
					Editor Settings
				</h2>
				{isSaving && (
					<span className="text-base-content/30 font-mono text-xs">
						saving...
					</span>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<LanguageConfig
					value={config.language}
					onChange={(value) => updateConfig('language', value)}
				/>
				<ThemeConfig
					value={config.theme}
					onChange={(value) => updateConfig('theme', value)}
				/>
				<FontConfig
					value={config.fontFamily}
					onChange={(value) => updateConfig('fontFamily', value)}
				/>
				<FontSizeConfig
					value={config.fontSize}
					onChange={(value) => updateConfig('fontSize', value)}
				/>
			</div>
		</section>
	);
}
