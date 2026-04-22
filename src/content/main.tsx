import { aceService } from "@/services/Ace.service";
import { odooService } from "@/services/Odoo.service";
import { OdooVersion } from "@/types";
import loader from "./loader";

const getOdooVersion = async (): Promise<OdooVersion> => {
	const result = await odooService.getOdooVersion();
	if (!result?.version) return { version: null };

	return result;
};

const observerOdoo = (odooVersion: number): void => {
	/*
	 * Use MutationOberserver to observer Odoo Page and check
	 * if an ace field exists in the page.
	 * - For v-17.0+: Use data-mode for automatic detection of the language
	 * - For v-15.0-16.0: Since data-mode does not exist, use python as xml
	 * - For v-14.0-: Quick return (not supported)
	 */
	if (odooVersion < 15) return;

	const TARGET_NODE = document.querySelector("body");
	if (!TARGET_NODE) return;

	const callback: MutationCallback = async (mutationList) => {
		const aceEditors = document.querySelectorAll(".ace_editor");
		console.log(aceEditors);

		for (const editor of aceEditors) {
			try {
				const uniqueId = aceService.getUniqueId(editor as HTMLElement);
				if (uniqueId) continue;

				const newId = aceService.setUniqueId(editor as HTMLElement);
				loader(editor as HTMLElement, newId);
			} catch (error) {
				return error;
			}
		}
	};

	const mutationObserver = new MutationObserver(callback);
	mutationObserver.observe(TARGET_NODE, {
		childList: true,
		subtree: true,
	});
};

const watchOdooPage = async (): Promise<void> => {
	const odooInfo = await getOdooVersion();
	if (!odooInfo.version) return;

	console.log(odooInfo);
	observerOdoo(odooInfo.version);
};

watchOdooPage();
