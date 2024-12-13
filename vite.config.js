import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import toUtf8 from "./utils/toUtf8";

// https://vite.dev/config/
export default defineConfig({
  plugins: [toUtf8(), react(), crx({ manifest })],
});
