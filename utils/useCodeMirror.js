import { useRef, useState, useEffect } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { indentWithTab, historyKeymap } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { xml, autoCloseTags } from "@codemirror/lang-xml";
import { Compartment } from "@codemirror/state";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
// themes
import { oneDark } from "@codemirror/theme-one-dark";
import { materialDark } from "@fsegurai/codemirror-theme-material-dark";
import { materialLight } from "@fsegurai/codemirror-theme-material-light";
import { monokai } from "@fsegurai/codemirror-theme-monokai";
import { basicLight } from "@fsegurai/codemirror-theme-basic-light";

const useCodeMirror = ({
  initialDoc,
  onChange,
  userTheme,
  languageMode,
  setLanguageConfig,
}) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState(null);
  const themeConfig = new Compartment();
  const languageConfig = new Compartment();

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

  const setLanguageMode = (view) => {
    let language = null;

    switch (languageMode) {
      case "qweb":
      case "xml":
        language = xml;
        break;
      case "python":
        language = python;
        break;
      default:
        language = python;
    }
    setLanguageConfig(languageMode);
    return view.dispatch({
      effects: languageConfig.reconfigure(language()),
    });
  };

  useEffect(() => {
    if (!refContainer.current || !userTheme) return;

    const theme = getTheme();
    const view = new EditorView({
      doc: initialDoc,
      extensions: [
        basicSetup,
        indentUnit.of("    "),
        keymap.of([indentWithTab, historyKeymap]),
        languageConfig.of(xml()),
        indentationMarkers(),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
        themeConfig.of(theme),
        autoCloseTags,
      ],
      parent: refContainer.current,
    });

    setLanguageMode(view);
    setEditorView(view);
  }, [refContainer, userTheme]);

  return [refContainer, editorView];
};

export default useCodeMirror;
