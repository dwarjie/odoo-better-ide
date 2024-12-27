import { useState, useEffect, useCallback, useRef } from "react";
import { getEditorValue, setEditorValue } from "../../utils/aceHelper";
import useCodeMirror from "../../utils/useCodeMirror";
import "../index.css"

function Editor({ ace }) {
  const editorRef = useRef(null);
  const aceEditor = useRef(ace);
  const [docValue, setDocValue] = useState(`print("Hello Odoo'ers!")`);
  const [userConfig, setUserConfig] = useState({});
  const size = { fontSize: `${userConfig.fontSize}px` };

  useEffect(() => {
    const editor = aceEditor.current || undefined;
    if (editor) {
      let value = getEditorValue(editor);
      setDocValue(value);
    }

    window.postMessage({ getConfig: true });
  }, []);

  const handleDocChange = useCallback(
    (state) => {
      const val = state.doc.toString()
      setDocValue(val)

      const editor = aceEditor.current || undefined;
      if (editor) {
        let value = setEditorValue(editor, val);
      }
    },
    [],
  );


  // const getTheme = () => {
  //   let theme = null;
  //   switch (userConfig.theme) {
  //     case "basic-dark":
  //       theme = basicDark;
  //       break;
  //     case "andromeda":
  //       theme = atomone;
  //       break;
  //     case "dracula":
  //       theme = dracula;
  //       break;
  //     case "github-light":
  //       theme = githubLight;
  //       break;
  //     case "github-dark":
  //       theme = githubDark;
  //       break;
  //     case "monokai":
  //       theme = monokai;
  //       break;
  //     case "solarized-light":
  //       theme = solarizedLight;
  //       break;
  //     case "solarized-dark":
  //       theme = solarizedDark;
  //       break;
  //     case "tokyo-night":
  //       theme = tokyoNight;
  //       break;
  //     case "tokyo-storm":
  //       theme = tokyoNightStorm;
  //       break;
  //     case "tokyo-night-day":
  //       theme = tokyoNightDay;
  //       break;
  //     default:
  //       theme = basicLight;
  //   }

  //   return theme;
  // };

  window.addEventListener(
    "message",
    (event) => {
      if (event.data.isConfig) {
        const config = {
          isEnabled: event.data.isEnabled,
          theme: event.data.theme,
          fontSize: event.data.fontSize,
        };
        setUserConfig(config);
      }
    },
    false,
  );

  const [refContainer, editorView] = useCodeMirror({initialDoc: docValue, onChange: handleDocChange})

  return (
    <div className="editor-wrapper" ref={refContainer} style={size}>
    </div>
  );
}

export default Editor;
