import { resolve } from "path";
import { PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import vuejs from "@vitejs/plugin-vue-jsx";
import eslintPlugin from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (
  viteEnv: ViteEnv,
): (PluginOption | PluginOption[])[] => [
  vue(),
  vuejs(), // vue 可以使用 jsx/tsx 语法
  vueSetupExtend({}), // name 可以写在 script 标签上
  eslintPlugin(), // eslint 报错信息显示在浏览器上
  createCompression(viteEnv), // 创建打包压缩配置
  createHtmlPlugin({
    inject: {
      data: { title: viteEnv.VITE_GLOB_APP_TITLE },
    },
  }),
  createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd()), "src/assets/icons"],
    symbolId: "icon-[dir]-[name]",
  }),
  // 是否生成打包预览，分析依赖包大小做优化处理
  viteEnv.VITE_PROXY &&
    (visualizer({
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption),
];

/**
 * 根据 compression 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const {
    VITE_BUILD_COMPRESS = "none",
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins: PluginOption[] = [];

  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    );
  }

  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    );
  }

  return plugins;
};
