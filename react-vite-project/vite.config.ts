import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), visualizer() as PluginOption],
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "dayjs", "antd"],
      plugins: [
        externalGlobals({
          react: "React",
          "react-dom": "ReactDOM",
          dayjs: "dayjs",
          antd: "antd",
        }),
      ],
    },
  },
});
