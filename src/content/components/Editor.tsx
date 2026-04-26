import LoadingIndicator from '@/components/Loading/Loading';
import useCodeMirror from '@/hooks/useCodeMirror';
import { aceService } from '@/services/Ace.service';
import { Logger } from '@/services/Logger.service';
import { DataAceChanged } from '@/types/types';
import { EditorState } from '@codemirror/state';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
	uniqueId: string;
}

export default function Editor({ uniqueId }: Props) {
	const [mode, setMode] = useState('python');

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
