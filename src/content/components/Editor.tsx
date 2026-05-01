import LoadingIndicator from '@/components/Loading/Loading';
import useCodeMirror from '@/hooks/useCodeMirror';
import { useCallback, useEffect, useRef, useState } from 'react';
import { aceService } from '@/services/Ace.service';
import { Logger } from '@/services/Logger.service';
import { DataAceChanged } from '@/types/types';
import { filterAceMode } from '@/utils';
import { StorageUtils } from '@/utils/Storage.utils';
import { EditorState } from '@codemirror/state';
import type { EditorConfig as EditorConfigType } from '@/types/Config.types';
import { DEFAULT_CONFIG } from '@/data/Constants';

interface Props {
	uniqueId: string;
}

export default function Editor({ uniqueId }: Props) {
	const [mode, setMode] = useState('python');
	const [config, setConfig] = useState<EditorConfigType>(DEFAULT_CONFIG);

	useEffect(() => {
		StorageUtils.getConfig().then(setConfig);
	}, []);

	const handleCodeMirrorChange = useCallback(
		(state: EditorState) => {
			window.postMessage(
				{
					type: 'SET_ACE_VALUE',
					id: uniqueId,
					value: state.doc.toString(),
				},
				'*',
			);
		},
		[uniqueId],
	);

	const [refContainer, editorView, updateCodeMirrorContent] =
		useCodeMirror<HTMLDivElement>({
			initialDoc: `# Hello this is Odoo Better IDE!`,
			config,
			mode,
			onChange: handleCodeMirrorChange,
		});

	const updateContentRef = useRef(updateCodeMirrorContent);
	useEffect(() => {
		updateContentRef.current = updateCodeMirrorContent;
	}, [updateCodeMirrorContent]);

	useEffect(() => {
		let mounted = true;
		const initialize = async () => {
			const success = await aceService.initBridge(uniqueId);
			if (!success) {
				Logger.error('Failed to initialize Ace Editor Bridge');
				return;
			}

			const aceValue = await aceService.getAceValue(uniqueId);
			if (aceValue && mounted) updateContentRef.current(aceValue);

			const aceMode = await aceService.getAceMode(uniqueId);
			setMode(aceMode);

			// Update the config language
			const configLanguage = filterAceMode(aceMode);
			StorageUtils.updateConfig({ language: configLanguage });
		};

		const handleMessage = (event: MessageEvent<DataAceChanged>) => {
			if (event.data?.type === 'ACE_CHANGED' && event.data?.id === uniqueId) {
				updateContentRef.current(event.data.value);
			}
		};

		window.addEventListener('message', handleMessage);
		initialize();

		return () => {
			mounted = false;
			window.removeEventListener('message', handleMessage);
		};
	}, [uniqueId]);

	return (
		<>
			{!editorView && <LoadingIndicator />}
			<div className="codemirror" data-mode={mode} ref={refContainer}></div>
		</>
	);
}
