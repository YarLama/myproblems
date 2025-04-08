import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssvite from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcssvite()],
  resolve: {
    alias: {
      "!": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
