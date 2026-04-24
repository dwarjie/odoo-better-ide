import { Logger } from "@/services/Logger.service";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodeMirror from "./views/codemirror/CodeMirror";

export default function loader(element: HTMLElement, uniqueId: string): void {
	if (!element || !uniqueId) {
		Logger.error("No element or uniqueId provided in the loader.");
		return;
	}

	if (document.querySelector(`#code-mirror-${uniqueId}`)) {
		return;
	}

	const codeMirrorWrapper = document.createElement("div");
	codeMirrorWrapper.id = `code-mirror-${uniqueId}`;
	element.insertAdjacentElement("afterend", codeMirrorWrapper);

	createRoot(codeMirrorWrapper).render(
		<StrictMode>
			<CodeMirror uniqueId={uniqueId} />
		</StrictMode>,
	);
}
