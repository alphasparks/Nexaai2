import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // During local dev, proxy /api calls to a local server running on port 3001
    // (see api/dev-server.js). Not used in production — Vercel handles /api natively.
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  }
});
