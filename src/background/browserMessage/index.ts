import { OdooVersion } from '@/types';
import browser from 'webextension-polyfill';

/**
 * Handles the browser message from the content script and sends the response back to the content script
 * This function uses the browser.scripting.executeScript API to run the script into the MAIN world
 *
 * @param request - The request object containing the request type and params
 * @param sender - The sender object containing the tab ID
 * @param sendResponse - The function to send the response back to the content script
 * @returns void
 */
export async function handleBrowserMessage(
	request: { requestType: string; params?: unknown },
	sender: browser.Runtime.MessageSender,
	sendResponse: (response: unknown) => void,
) {
	try {
		if (!sender?.tab?.id) {
			throw new Error('Cannot retrieve the Sender Tab ID.');
		}

		console.log('Params', request.params);
		const [{ result }] = await browser.scripting.executeScript({
			target: { tabId: sender.tab.id, allFrames: true },
			func: processMessage,
			world: 'MAIN',
			args: [request.requestType, request.params ?? null],
		});

		sendResponse(result);
	} catch (error) {
		sendResponse(error);
	}
}

/**
 * Processes the message based on the request type
 * Example: GET_ODOO_VERSION -> Returns the Odoo version
 *
 * Available request types:
 * - GET_ODOO_VERSION -> Returns the Odoo version
 * - INIT_ACE_BRIDGE -> Initializes a two-way communication bridge between the Ace Editor (MAIN world)
 * and the CodeMirror editor (content script) for a specific editor instance.
 * - GET_ACE_VALUE -> Gets the Ace Editor value through the window.ace object
 * - GET_ACE_MODE -> Gets the Ace Editor mode through the window.ace object
 *
 * This function is run in the MAIN world
 *
 * @param requestType - The request type
 * @param params - The params
 * @returns The response
 *
 * @throws Error - If the request type is invalid
 */
function processMessage(requestType: string, params?: unknown | null): unknown {
	/**
	 * Gets the Odoo MAJOR version through the window.odoo object
	 *
	 * @returns The Odoo major version
	 */
	function getOdooVersion(): OdooVersion {
		if (typeof window === 'undefined') {
			console.error('window object is not accessible');
			return { version: null };
		}

		const odoo = (window as any).odoo;
		if (!odoo) {
			console.warn('window.odoo is not accessible');
			return { version: null };
		}

		const info = odoo.info ?? odoo.session_info;
		if (!info) {
			console.warn(
				'window.odoo.info or window.odoo.session_info is not accessible',
			);
			return { version: null };
		}

		const versionArray = info.server_version_info;

		if (!Array.isArray(versionArray) || versionArray.length === 0) {
			console.warn('server_version_info property is empty', versionArray);
			return { version: null };
		}

		let majorVersion: number | string = versionArray[0];
		if (typeof majorVersion == 'string') {
			// Handle cases like "saas~16"
			majorVersion = Number(majorVersion.replace(/^saas~/, ''));
		}

		return {
			version: isNaN(majorVersion) ? null : majorVersion,
		};
	}

	/**
	 * Gets the page model through the window.odoo object
	 *
	 * @returns The page model if available, null otherwise
	 */
	function getPageModel(): string | null {
		const resModel: string =
			(window as any).odoo.__WOWL_DEBUG__?.root?.actionService
				?.currentController?.props?.resModel ?? '';

		if (!resModel) {
			console.warn('Cannot access window.odoo.__WOWL_DEBUG__.');
			return null;
		}

		return resModel;
	}

	/**
	 * Gets the Ace Editor value through the window.ace object
	 * Uses the unique ID to find the Ace Editor element
	 *
	 * @param uniqueId - The unique ID of the Ace Editor
	 * @returns The Ace Editor value
	 */
	function getAceEditor(uniqueId: string): string | null {
		if (!uniqueId) return null;

		const aceGlobal: AceAjax.Ace | undefined = (window as any)?.ace;
		if (!aceGlobal) {
			console.error('Cannot access window.ace');
			return null;
		}

		try {
			const element = document.querySelector(`[data-odoo-id="${uniqueId}"]`);
			const ace = aceGlobal.edit(element as HTMLElement);

			return ace.getValue();
		} catch (error) {
			console.error('Cannot access Ace Editor', error);
			return null;
		}
	}

	/**
	 * Initializes a two-way communication bridge between the Ace Editor (MAIN world)
	 * and the CodeMirror editor (content script) for a specific editor instance.
	 *
	 * This function runs in the MAIN world via `browser.scripting.executeScript`,
	 * giving it direct access to `window.ace`.
	 *
	 * The bridge is marked on the Ace editor instance itself (`editor.__odoo_ide_bridge`).
	 * Since `ace.edit(element)` always returns the same cached instance for the same element,
	 * this guarantees the bridge is initialized exactly once per editor — even if
	 * `initAceBridge` is called multiple times (e.g. due to MutationObserver re-firing).
	 * Multiple Ace editors on the same page are handled independently since each has
	 * its own instance with its own flag.
	 *
	 * @param id - The `data-odoo-id` attribute value used to locate the `.ace_editor` element.
	 * @returns `true` if the bridge was successfully initialized or already exists, `false` on failure.
	 *
	 * ---
	 *
	 * ## Initialization Flow
	 *
	 * ```
	 * Content Script                Background Script              MAIN World (Page)
	 *      |                               |                              |
	 *      |  aceService.initBridge(id)    |                              |
	 *      |-----------------------------> |                              |
	 *      |                               |  executeScript(             |
	 *      |                               |    initAceBridge,           |
	 *      |                               |    world: "MAIN"            |
	 *      |                               |---------------------------> |
	 *      |                               |                              |  ace.edit(element)
	 *      |                               |                              |  editor.__odoo_ide_bridge = true
	 *      |                               |                              |  session.on("change") registered
	 *      |                               |                              |  window.on("message") registered
	 *      |                               | <---------------------------|
	 *      | <-----------------------------|                              |
	 * ```
	 *
	 * ---
	 *
	 * ## Ace → CodeMirror (initialize the value from ace to codemirror)
	 *
	 * ```
	 * MAIN World (Page)                                    Content Script
	 *      |                                                     |
	 *      |  editor.session.on("change")                        |
	 *      |  isSyncingFromCodeMirror === false                  |
	 *      |                                                     |
	 *      |  window.postMessage({ type: "ACE_CHANGED", id, value })
	 *      |---------------------------------------------------> |
	 *      |                                                     |  window.on("message")
	 *      |                                                     |  updateContent(value)
	 *      |                                                     |  CodeMirror.dispatch()
	 * ```
	 *
	 * ---
	 *
	 * ## CodeMirror → Ace (user types in CodeMirror)
	 *
	 * ```
	 * Content Script                                       MAIN World (Page)
	 *      |                                                     |
	 *      |  CodeMirror onChange                                |
	 *      |  window.postMessage({ type: "SET_ACE_VALUE", id, value })
	 *      |---------------------------------------------------> |
	 *      |                                                     |  window.on("message")
	 *      |                                                     |  isSyncingFromCodeMirror = true
	 *      |                                                     |  editor.setValue(value)
	 *      |                                                     |    └── session.on("change") fires
	 *      |                                                     |         └── suppressed ✓
	 *      |                                                     |  isSyncingFromCodeMirror = false
	 * ```
	 */
	function initAceBridge(id: string): boolean {
		const element = document.querySelector(`[data-odoo-id="${id}"]`);
		if (!element) {
			console.error(`[ACE BRIDGE] Element not found for id: ${id}`);
			return false;
		}

		const aceGlobal: AceAjax.Ace | undefined = (window as any).ace;
		if (!aceGlobal) {
			console.error('[ACE BRIDGE] window.ace is not available');
			return false;
		}

		const editor: AceAjax.Editor = aceGlobal.edit(element as HTMLElement);
		if (!editor) {
			console.error(`[ACE BRIDGE] Failed to get Ace editor for id: ${id}`);
			return false;
		}

		if ((editor as any).__odoo_ide_bridge) {
			console.warn(`[ACE BRIDGE] Bridge already initialized for id: ${id}`);
			return true;
		}

		let isSyncingFromCodeMirror = false;

		// Direction 1: Ace → CodeMirror
		// Listen to Ace changes and postMessage to content script
		editor.session.on('change', () => {
			if (isSyncingFromCodeMirror) return;

			window.postMessage(
				{
					type: 'ACE_CHANGED',
					id,
					value: editor.getValue(),
				},
				'*',
			);
		});

		// Direction 2: CodeMirror → Ace
		// Listen for SET_ACE_VALUE from content script
		const handleSetAceValue = (event: MessageEvent) => {
			if (event.data?.type !== 'SET_ACE_VALUE') return;
			if (event.data?.id !== id) return;

			const newValue: string = event.data.value;

			if (editor.getValue() === newValue) return;

			isSyncingFromCodeMirror = true;
			editor.setValue(newValue, -1);
			isSyncingFromCodeMirror = false;
		};

		window.addEventListener('message', handleSetAceValue);

		(editor as any).__odoo_ide_bridge = true;
		return true;
	}

	/**
	 * Gets the Ace Editor mode through the window.ace object
	 * Uses the unique ID to find the Ace Editor element
	 *
	 * @param uniqueId - The unique ID of the Ace Editor
	 * @returns The Ace Editor mode
	 */
	function getAceMode(uniqueId: string): string | null {
		if (!uniqueId) return null;

		const aceGlobal: AceAjax.Ace | undefined = (window as any)?.ace;
		if (!aceGlobal) {
			console.error('Cannot access window.ace');
			return null;
		}

		try {
			const element = document.querySelector(`[data-odoo-id="${uniqueId}"]`);
			const ace = aceGlobal.edit(element as HTMLElement);

			const mode: string | null = ace.getOption('mode');
			if (!mode) return null;

			function cleanAceModeString(mode: string): string {
				return mode.replace('ace/mode/', '');
			}
			const cleanMode = cleanAceModeString(mode);

			return cleanMode;
		} catch (error) {
			console.error('Cannot access Ace Editor', error);
			return null;
		}
	}

	try {
		switch (requestType) {
			case 'GET_ODOO_VERSION':
				return getOdooVersion();
			case 'GET_PAGE_MODEL':
				return getPageModel();
			case 'INIT_ACE_BRIDGE':
				if (!params || typeof params !== 'string') {
					throw new Error(`Invalid element to access Ace Editor: ${params}`);
				}

				return initAceBridge(params);
			case 'GET_ACE_VALUE':
				if (!params || typeof params !== 'string') {
					throw new Error(`Invalid element to access Ace Editor: ${params}`);
				}

				return getAceEditor(params);
			case 'GET_ACE_MODE':
				if (!params || typeof params !== 'string') {
					throw new Error(`Invalid element to access Ace Editor: ${params}`);
				}

				return getAceMode(params);
			default:
				throw new Error(`Invalid request type: ${requestType}`);
		}
	} catch (error) {
		console.log('[LOG]', error);
		return error;
	}
}
