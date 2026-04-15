import { odooService } from "@/services/Odoo.service";
import { OdooVersion } from "@/types";
import { useEffect, useState } from "react";
import CodeMirror from "./views/codemirror/CodeMirror";

export function Loader() {
	const [odooVersion, setOdooVersion] = useState<OdooVersion | null>(null);

	useEffect(() => {
		const getOdooVersion = async (): Promise<OdooVersion | null> => {
			const result = await odooService.getOdooVersion();
			if (!result?.version) return null;

			return result;
		};

		const initialize = async () => {
			const version = await getOdooVersion();
			setOdooVersion(version);
		};

		initialize();
	}, []);

	if (!odooVersion) return;

	return (
		<>
			<CodeMirror />
		</>
	);
}
