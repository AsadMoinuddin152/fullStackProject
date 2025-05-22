import { defaults } from "jest-config";

export default {
  ...defaults,
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/setupTests.js"],
  testMatch: [
    "**/src/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
};
