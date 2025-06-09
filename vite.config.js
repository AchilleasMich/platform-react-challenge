import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
