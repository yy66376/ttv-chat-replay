/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  plugins: [react()],
});
