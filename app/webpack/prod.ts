import webpack from "webpack";
import webpackProductionConfig from "./config/webpack.production.js";

console.log("webpack building...");

webpack(webpackProductionConfig, (err: any, stats: any) => {
  if (err) {
    console.error("webpack build error:", err);
    throw err;
  }
  process.stdout.write(
    stats.toString({
      colors: true, // 在控制台打印彩色信息
      modules: false, // 不显示每个模块的打包信息
      children: false, // 不显示子模块的打包信息
      chunks: false, // 不显示每个 chunk 的打包信息
      chunkModules: true, // 显示每个 chunk 包含的模块信息
    })
  );
});
