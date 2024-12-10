import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import toUtf8 from "./utils/toUtf8";

// https://vite.dev/config/
export default defineConfig({
  plugins: [toUtf8(), react()],
  build: {
    outDir: "public",
    lib: {
      entry: "src/lib/EditorRender.jsx",
      name: "EditorRender",
      formats: ["iife"],
      fileName: (format) => `editor-render.${format}.js`,
    },
  },
});
