import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { development } from "./config";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: development ? "localhost" : "0.0.0.0",
    port: 5173,
  },
});
