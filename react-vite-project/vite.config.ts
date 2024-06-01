import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
// import externalGlobals from "rollup-plugin-external-globals";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    visualizer() as PluginOption,
    importToCDN({
      prodUrl: "https://cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path}",
      modules: [
        {
          name: "react",
          var: "React",
          path: `umd/react.production.min.js`,
        },
        {
          name: "react-dom",
          var: "ReactDOM",
          path: `umd/react-dom.production.min.js`,
        },
        {
          name: "dayjs",
          var: "dayjs",
          path: `dayjs.min.js`,
        },
        {
          name: "antd",
          var: "antd",
          path: `antd.min.js`,
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "dayjs", "antd"],
    },
  },
});
