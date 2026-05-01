import { useEffect, useRef, useState } from 'react';
import { DEFAULT_CONFIG } from '@/data/Constants';
import FontSizeConfig from './FontSizeConfig';
import FontConfig from './FontConfig';
import ThemeConfig from './ThemeConfig';
import LanguageConfig from './LanguageConfig';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';
import { StorageUtils } from '@/utils/Storage.utils';

export default function EditorConfig() {
	const [config, setConfig] = useState<EditorConfigType>(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isFirstRender = useRef(true);

	useEffect(() => {
		StorageUtils.getConfig().then(setConfig);
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		setIsSaving(true);

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(async () => {
			await StorageUtils.setConfig(config);
			setIsSaving(false);
		}, 500);

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, [config]);

	const updateConfig = <K extends keyof EditorConfigType>(
		key: K,
		value: EditorConfigType[K],
	) => {
		setConfig((prev) => ({ ...prev, [key]: value }));
	};

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
