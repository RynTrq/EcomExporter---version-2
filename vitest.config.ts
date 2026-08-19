import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    env: {
      NODE_ENV: "test",
      ADMIN_KEY: "test-admin-key-12345",
      IP_HASH_SALT: "test-ip-hash-salt-12345",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
    globals: false,
    include: ["tests/**/*.test.ts"],
    fileParallelism: false,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "tests/mocks/server-only.ts"),
    },
  },
});
