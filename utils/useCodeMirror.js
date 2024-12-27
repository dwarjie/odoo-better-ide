import { useRef, useState, useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { Compartment } from "@codemirror/state";
// themes
import { oneDark } from "@codemirror/theme-one-dark";
import { materialDark } from "@fsegurai/codemirror-theme-material-dark";
import { materialLight } from "@fsegurai/codemirror-theme-material-light";
import { monokai } from "@fsegurai/codemirror-theme-monokai";
import { basicLight } from "@fsegurai/codemirror-theme-basic-light";

const useCodeMirror = ({ initialDoc, onChange, userTheme }) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState(null);
  const themeConfig = new Compartment();

  const getTheme = () => {
    let theme = null;
    switch (userTheme) {
      case "one-dark":
        theme = oneDark;
        break;
      case "material-dark":
        theme = materialDark;
        break;
      case "material-light":
        theme = materialLight;
        break;
      case "monokai":
        theme = monokai;
        break;
      default:
        theme = basicLight;
    }

    return theme;
  };

  useEffect(() => {
    if (!refContainer.current || !userTheme) return;

    const theme = getTheme();
    const view = new EditorView({
      doc: initialDoc,
      extensions: [
        basicSetup,
        python(),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
        themeConfig.of(theme),
      ],
      parent: refContainer.current,
    });

    setEditorView(view);
  }, [refContainer, userTheme]);

  return [refContainer, editorView];
};

export default useCodeMirror;
