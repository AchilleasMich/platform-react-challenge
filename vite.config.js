import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"), // example
      "@utils": path.resolve(__dirname, "src/utils"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@common": path.resolve(__dirname, "src/common"),
      "@providers": path.resolve(__dirname, "src/providers"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.js", // optional
    globals: true, // if you want to use `describe`, `it`, etc. globally
    include: [
      "src/**/*.test.js",
      "tests/**/*.test.js",
      "src/**/*.test.jsx",
      "tests/**/*.test.jsx",
    ],
  },
});
