import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssvite from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcssvite()],
    base: env.VITE_BASE_PATH || "/",
    resolve: {
      alias: {
        "@root": path.resolve(__dirname, "./"),
        "@pages": path.resolve(
          __dirname,
          "./src/pages/index.ts",
        ),
        "@features": path.resolve(
          __dirname,
          "./src/features/index.ts",
        ),
        "@ui": path.resolve(
          __dirname,
          "./src/shared/ui/index.ts",
        ),
        "@shared/constanst": path.resolve(
          __dirname,
          "./src/shared/constants",
        ),
        "@fonts": path.resolve(
          __dirname,
          "./src/shared/styles/fonts",
        ),
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./tests/setup.ts",
    },
  };
});
