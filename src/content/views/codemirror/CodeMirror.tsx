import { aceService } from "@/services/Ace.service";
import { useEffect, useState } from "react";

interface CodeMirrorProps {
	aceEditor: HTMLElement;
	uniqueId: string;
}

export default function CodeMirror({ aceEditor, uniqueId }: CodeMirrorProps) {
	const [editorValue, setEditorValue] = useState<String | null>(
		`print("Hello this is Odoo Better IDE!")`,
	);

	useEffect(() => {
		const getAceValue = async () => {
			const aceValue = await aceService.getAceValue(uniqueId);
			return aceValue;
		};

		const initialize = async () => {
			const value = await getAceValue();
			setEditorValue(value);
		};
		initialize();
	}, []);

	return (
		<>
			<p>{editorValue}</p>
		</>
	);
}
