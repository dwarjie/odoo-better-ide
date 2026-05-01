import EditorConfig from '@/components/EditorConfig';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_CONFIG } from '@/data/Constants';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';
import { StorageUtils } from '@/utils/Storage.utils';

export default function Popup() {
	const [config, setConfig] = useState<EditorConfigType>(DEFAULT_CONFIG);
	const [isSaving, setIsSaving] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const reloadRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		StorageUtils.getConfig().then(setConfig);

		const removeListener = StorageUtils.onConfigChanged(() => {
			if (reloadRef.current) clearTimeout(reloadRef.current);

			reloadRef.current = setTimeout(async () => {
				await StorageUtils.applyChanges();
			}, 1000);
		});

		return () => {
			removeListener();
			if (reloadRef.current) clearTimeout(reloadRef.current);
		};
	}, []);

	useEffect(() => {
		setIsSaving(true);

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(async () => {
			await StorageUtils.setConfig(config);
			setIsSaving(false);
		}, 300);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [config]);

	const updateConfig = <K extends keyof EditorConfigType>(
		key: K,
		value: EditorConfigType[K],
	) => {
		setConfig((prev) => ({ ...prev, [key]: value }));
	};
	return (
		<div className="bg-base-100 flex min-h-screen w-full flex-col">
			<Header config={config} updateConfig={updateConfig} />
			<main className="flex flex-1 flex-col gap-4 p-4">
				<EditorConfig
					isSaving={isSaving}
					config={config}
					updateConfig={updateConfig}
				/>
			</main>
			<Footer />
		</div>
	);
}
