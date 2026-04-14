import { odooService } from "@/services/Odoo.service";
import { useEffect } from "react";

export default function CodeMirror() {
	useEffect(() => {
		const getOdooVersion = async () => {
			const version = await odooService.getOdooVersion();
			console.log(version);
		};

		getOdooVersion();
	}, []);

	return (
		<>
			<h1>Hello Odoo Better IDE</h1>
		</>
	);
}
