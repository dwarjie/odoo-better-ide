import { useRef, useState, useEffect } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { indentWithTab, historyKeymap } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { xml, autoCloseTags } from "@codemirror/lang-xml";
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
  setLanguageMode,
  setEditorView,
  languageConfig,
  themeConfig,
}) => {
  const refContainer = useRef(null);

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

    setEditorView(view);
    setLanguageMode(view);
  }, [refContainer, userTheme]);

  return [refContainer];
};

export default useCodeMirror;
