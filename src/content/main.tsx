import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodeMirror from "./views/codemirror/CodeMirror";

console.log(
	"[Odoo-Better-IDE]: This is an extension for better Odoo IDE experience.",
);

const container = document.createElement("div");
container.id = "odoo-better-ide";
document.body.appendChild(container);
createRoot(container).render(
	<StrictMode>
		<CodeMirror />
	</StrictMode>,
);
