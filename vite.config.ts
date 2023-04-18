import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import progress from "vite-plugin-progress";
import colors from "picocolors";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    progress({
      format: `${colors.green(colors.bold("Bouilding"))} ${colors.cyan(
        "[:bar]",
      )} :percent | Rate: :rate | Time: :elapseds`,
    }),
  ],
  server: {
    hmr: {
      host: "localhost",
      port: 3000,
    },
    port: 3000,
    open: true,
    cors: true,
    // 设置代理
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
