import { useState, useEffect, useCallback, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { getEditorValue, setEditorValue } from "../../utils/aceHelper";
// themes
import { basicLight, basicDark } from "@uiw/codemirror-theme-basic";
import { atomone } from "@uiw/codemirror-theme-atomone"; 
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github"; 
import { monokai } from "@uiw/codemirror-theme-monokai"; 
import { solarizedDark, solarizedLight } from "@uiw/codemirror-theme-solarized"; 
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"; 
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm"; 
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day"; 

function Editor({ ace }) {
  let aceEditor = useRef(ace);
  const valueRef = useRef(`print(Hello Odoo'ers!)`);
  const [docValue, setDocValue] = useState(valueRef.current);
  const [userConfig, setUserConfig] = useState({});
  const size = { fontSize: `${userConfig.fontSize}px`  }

  useEffect(() => {
    const editor = aceEditor.current || undefined;
    if (editor) {
      let value = getEditorValue(editor);
      setDocValue(value);
    }
    
    window.postMessage({ getConfig: true });
  }, []);

  const getTheme = () => {
    let theme = null
    switch(userConfig.theme) {
      case "basic-dark":
        theme = basicDark;
      break;
      case "andromeda":
        theme = atomone;
      break;
      case "dracula":
        theme = dracula
      break;
      case "github-light":
        theme = githubLight
      break;
      case "github-dark":
        theme = githubDark
      break;
      case "monokai":
        theme = monokai
      break;
      case "solarized-light":
        theme = solarizedLight
      break;
      case "solarized-dark":
        theme = solarizedDark
      break;
      case "tokyo-night":
        theme = tokyoNight
      break;
      case "tokyo-storm":
        theme = tokyoNightStorm
      break;
      case "tokyo-night-day":
        theme = tokyoNightDay
      break;
      default:
        theme = basicLight;
    }

    return theme;
  }

  window.addEventListener("message", (event) => {
    if (event.data.isConfig) {
      const config = {
        isEnabled: event.data.isEnabled,
        theme: event.data.theme,
        fontSize: event.data.fontSize,
      };
      setUserConfig(config);
    }
  }, false);

  const handleDocChange = useCallback(
    (val, viewUpdate) => {
      setDocValue(val);

      const editor = aceEditor.current || undefined;
      if (editor) {
        let value = setEditorValue(editor, val);
      }
    },
    [aceEditor.current, docValue],
  );

  return (
    <CodeMirror
      value={docValue}
      extensions={[python()]}
      onChange={handleDocChange}
      style={size}
      theme={getTheme()}
    />
  );
}

export default Editor;
