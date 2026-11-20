import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },

  base: "/",

  server: {
    port: 5173,
    open: true,
    proxy: { "/api": { target: "http://localhost:8000", changeOrigin: true } },
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: { manualChunks: { react: ["react", "react-dom"] } },
    },
  },
});


VITE_API_BASE_URL = 

API_BASE_URL = 