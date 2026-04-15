import { odooService } from "@/services/Odoo.service";
import { OdooVersion } from "@/types";

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

	const CONFIG: MutationObserverInit = {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["class"],
	};
	const TARGET_NODE = document.querySelector("body");
	if (!TARGET_NODE) return;

	const callback: MutationCallback = (mutationList) => {
		for (const mutationRecord of mutationList) {
			if (
				mutationRecord.type == "attributes" &&
				mutationRecord.attributeName == "class"
			) {
				const mutationTarget = mutationRecord.target as HTMLElement;
				if (!mutationTarget) continue;

				const targetClassList = mutationTarget.classList;
				if (!targetClassList) continue;

				if (targetClassList.contains("ace_editor")) {
					console.log("Ace Editor", mutationTarget);
				}

				if (targetClassList.contains("ace_line")) {
					console.log("Ace Line", mutationTarget);
				}
			}
		}
	};

	const mutationObserver = new MutationObserver(callback);
	mutationObserver.observe(TARGET_NODE, CONFIG);
};

const watchOdooPage = async (): Promise<void> => {
	const odooInfo = await getOdooVersion();
	if (!odooInfo.version) return;

	console.log(odooInfo);
	observerOdoo(odooInfo.version);
};

watchOdooPage();
// const container = document.createElement("div");
// container.id = "odoo-better-ide";
// document.body.appendChild(container);
// createRoot(container).render(
// 	<StrictMode>
// 		<Loader />
// 	</StrictMode>,
// );
