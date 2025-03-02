import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
let development = true;
export default defineConfig({
  plugins: [react()],
  server: {
    host: development ? "localhost" : "0.0.0.0",
    port: 5173,
  },
});
