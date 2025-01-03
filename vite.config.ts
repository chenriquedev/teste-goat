import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, process.cwd(), "");
  const BASE_URL = `${ENV.VITE_BASE_URL ?? ""} `;
  return {
    plugins: [vue()],
    server: {
      proxy: {
        "/api": {
          target: BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
