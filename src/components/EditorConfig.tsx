import FontSizeConfig from './FontSizeConfig';
import FontConfig from './FontConfig';
import LanguageConfig from './LanguageConfig';

export default function EditorConfig() {
	return (
		<section className="flex flex-col gap-3">
			<h2 className="text-base-content/40 text-xs font-semibold tracking-widest uppercase">
				Editor Settings
			</h2>
			<div className="flex flex-col gap-2">
				<LanguageConfig />
				<FontConfig />
				<FontSizeConfig />
			</div>
		</section>
	);
}
