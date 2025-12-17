import { merge } from "webpack-merge";
import { join } from "node:path";
import webpackBaseConfig from "./webpack.base.js";

const webpackProductionConfig = merge(webpackBaseConfig, {
  mode: "production", // 指定为开发环境
  //开发环境的 output 配置
  output: {},
});

export default webpackProductionConfig;
