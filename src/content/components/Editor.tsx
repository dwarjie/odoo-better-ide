import useCodeMirror from "@/hooks/useCodeMirror";
import { aceService } from "@/services/Ace.service";
import { Logger } from "@/services/Logger.service";
import { DataAceChanged } from "@/types/types";
import { EditorState } from "@codemirror/state";
import { useEffect, useRef } from "react";

interface Props {
	uniqueId: string;
}

export default function Editor({ uniqueId }: Props) {
	const [refContainer, editorView, updateCodeMirrorContent] =
		useCodeMirror<HTMLDivElement>({
			initialDoc: `# Hello this is Odoo Better IDE!`,
			onChange: (state: EditorState) => {
				console.log(state);
			},
		});

	const updateContentRef = useRef(updateCodeMirrorContent);
	useEffect(() => {
		updateContentRef.current = updateCodeMirrorContent;
	}, [updateCodeMirrorContent]);

	useEffect(() => {
		let mounted = true;
		const initialize = async () => {
			const success = await aceService.subscribeToAceChanges(uniqueId);
			if (!success) {
				Logger.error("Failed to subscribe to Ace Editor");
				return;
			}

			const aceValue = await aceService.getAceValue(uniqueId);
			if (aceValue && mounted) updateContentRef.current(aceValue);

			const aceMode = await aceService.getAceMode(uniqueId);
			console.log(aceMode);
		};

		const handleMessage = (event: MessageEvent<DataAceChanged>) => {
			if (event.data?.type === "ACE_CHANGED" && event.data?.id === uniqueId) {
				updateContentRef.current(event.data.value);
			}
		};

		window.addEventListener("message", handleMessage);
		initialize();

		return () => {
			mounted = false;
			window.removeEventListener("message", handleMessage);
		};
	}, [uniqueId]);

	return <div className="editor" ref={refContainer}></div>;
}
