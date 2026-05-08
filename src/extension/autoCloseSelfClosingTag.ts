import { EditorView } from '@codemirror/view';
import { Transaction } from '@codemirror/state';

export const autoCloseSelfClosingTag = EditorView.inputHandler.of(
	(view, _from, _to, insert) => {
		if (insert !== '/') return false;

		const cursor = view.state.selection.main.head;
		const charBefore = view.state.sliceDoc(cursor - 1, cursor);
		const charAfter = view.state.sliceDoc(cursor, cursor + 1);

		// Already properly closed
		if (charAfter === '>') return false;

		// Must be inside a tag — char before should be a letter, space, or quote
		const isMaybeInsideTag = /[\w\s"']/.test(charBefore);
		if (!isMaybeInsideTag) return false;

		// Look back to confirm we're inside an opening tag (find a < without a preceding >)
		const docBefore = view.state.sliceDoc(0, cursor);
		const lastOpen = docBefore.lastIndexOf('<');
		const lastClose = docBefore.lastIndexOf('>');
		if (lastOpen === -1 || lastClose > lastOpen) return false;

		// Confirm it's not a closing tag e.g. </field
		const tagContent = docBefore.slice(lastOpen + 1).trimStart();
		if (tagContent.startsWith('/')) return false;

		// Insert /> and trim any trailing space before the slash
		const trailingSpace = charBefore === ' ' ? 1 : 0;

		view.dispatch({
			changes: {
				from: cursor - trailingSpace,
				to: cursor,
				insert: '/>',
			},
			selection: { anchor: cursor - trailingSpace + 2 },
			annotations: Transaction.userEvent.of('input'),
		});

		return true;
	},
);
