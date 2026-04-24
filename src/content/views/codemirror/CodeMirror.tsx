import { aceService } from "@/services/Ace.service";
import { Logger } from "@/services/Logger.service";
import { DataAceChanged } from "@/types/types";
import { useEffect, useState } from "react";

interface CodeMirrorProps {
	uniqueId: string;
}

export default function CodeMirror({ uniqueId }: CodeMirrorProps) {
	const [editorValue, setEditorValue] = useState<String | null>(
		`print("Hello this is Odoo Better IDE!")`,
	);

	useEffect(() => {
		const subscribeToAceChanges = async () => {
			const success = await aceService.subscribeToAceChanges(uniqueId);
			if (!success) {
				Logger.error("Failed to subscribe to Ace Editor");
			}
		};

		const initialize = async () => {
			await subscribeToAceChanges();
			const aceValue = await aceService.getAceValue(uniqueId);
			if (aceValue) setEditorValue(aceValue);

			window.addEventListener(
				"message",
				(event: MessageEvent<DataAceChanged>) => {
					if (
						event.data?.type === "ACE_CHANGED" &&
						event.data.id === uniqueId
					) {
						setEditorValue(event.data.value);
					}
				},
			);
		};

		initialize();
		return () => {
			window.removeEventListener("message", () => {});
		};
	}, [uniqueId]);

	return (
		<>
			<p>{editorValue}</p>
		</>
	);
}
