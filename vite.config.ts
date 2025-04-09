import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcssvite from "@tailwindcss/vite"
import path from "path"

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), tailwindcssvite()],
    base: env.VITE_BASE_PATH || "/",
    resolve: {
      alias: {
        "!": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src/"),
        "@fonts": path.resolve(__dirname, "./src/shared/styles/fonts"),
      },
    },
  }
})
