import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { development } from "./config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: development ? "localhost" : "0.0.0.0",
    port: 5173,
  },
});
