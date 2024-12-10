import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
