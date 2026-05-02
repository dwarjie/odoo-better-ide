import { Logger } from '@/services/Logger.service';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Editor from './components/Editor';
import { embedGoogleFont } from '@/utils';
import { StorageUtils } from '@/utils/Storage.utils';
import { EditorConfig } from '@/types/Config.types';

const getConfig = async (): Promise<EditorConfig> => {
	const config = await StorageUtils.getConfig();
	return config;
};

export default async function loader(
	element: HTMLElement,
	uniqueId: string,
): Promise<void> {
	if (!element || !uniqueId) {
		Logger.error('No element or uniqueId provided in the loader.');
		return;
	}

	if (document.querySelector(`#code-mirror-${uniqueId}`)) {
		return;
	}

	const config = await getConfig();
	if (!config) {
		Logger.error('Failed to get config');
		return;
	}

	if (!config.enabled) {
		return;
	}

	embedGoogleFont();
	element.style = 'display: none;';
	const codeMirrorWrapper = document.createElement('div');
	codeMirrorWrapper.id = `code-mirror-${uniqueId}`;
	element.insertAdjacentElement('afterend', codeMirrorWrapper);

	createRoot(codeMirrorWrapper).render(
		<StrictMode>
			<Editor uniqueId={uniqueId} />
		</StrictMode>,
	);
}
