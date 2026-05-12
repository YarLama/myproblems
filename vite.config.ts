import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssvite from "@tailwindcss/vite";
import path from "path";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcssvite()],
    base: "/myproblems",
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        "@root": path.resolve(__dirname, "./"),
        "@layouts": path.resolve(
          __dirname,
          "./src/app/layouts/index.ts",
        ),
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
        "@types": path.resolve(
          __dirname,
          "./src/shared/types/index.ts",
        ),
        "@entities": path.resolve(
          __dirname,
          "./src/entities/index.ts",
        ),
        "@lib": path.resolve(
          __dirname,
          "./src/shared/lib/index.ts",
        ),
        "@model": path.resolve(
          __dirname,
          "./src/shared/model/index.ts",
        ),
        "@api": path.resolve(
          __dirname,
          "./src/shared/api/index.ts",
        ),
        "@constants": path.resolve(
          __dirname,
          "./src/shared/constants",
        ),
        "@utils": path.resolve(
          __dirname,
          "./src/shared/utils",
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
