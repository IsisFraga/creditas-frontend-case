import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "src/utils/__tests__/E2E/**/*.test.{js,jsx,ts,tsx}",
    supportFile: false,
    setupNodeEvents(on, config) {
    },
  },
});