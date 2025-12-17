import { merge } from "webpack-merge";
import { join } from "node:path";
import webpackBaseConfig from "./webpack.base.js";
import { Configuration } from "webpack";

// 这里可以为生产环境做不同的配置，比如压缩，代码分割，启用多核加快打包速度，清除 console 等等，我就不具体做了，留个参考代码
// const path = require("path");
// const merge = require("webpack-merge");
// const os = require("os");
// const HappyPack = require("happypack");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
// const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlWebpackInjectAttributesPlugin = require("html-webpack-inject-attributes-plugin");
// const TerserWebpackPlugin = require("terser-webpack-plugin");
// const happypackCommonCinfig = {
//   debug: false,
//   threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
// };
// //基类配置
// const baseConfig = require("./webpack.base.js");
// // 生产环境下的 webpack 配置
// const webpackConfig = merge.smart(baseConfig, {
//   //指定生产环境
//   mode: "production",
//   //生产环境的output配置
//   output: {
//     filename: "js/[name]_[chunkhash:8].bundle.js",
//     path: path.join(process.cwd(), "./app/public/dist/prod/"),
//     publicPath: "/dist/prod/",
//     crossOriginLoading: "anonymous",
//   },
//   module: {
//     rules: [
//       // 处理css
//       {
//         test: /\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           `${require.resolve("happypack/loader")}?id=css`,
//         ],
//       },
//       {
//         test: /\.js$/,
//         include: [
//           //处理elpis目录
//           path.resolve(__dirname, "../../pages"),
//           //处理业务目录
//           path.resolve(process.cwd(), "./app/pages"),
//         ],
//         // 遇到.js文件时，不要直接处理，而是交给id为'js'的HappyPack实例来处理
//         use: [`${require.resolve("happypack/loader")}?id=js`],
//       },
//     ],
//   },
//   //webpack 不会有大量 hints 信息，默认为warning
//   performance: {
//     hints: false, // 关闭性能提示
//   },
//   plugins: [
//     //每次build时，清空public/dist目录
//     new CleanWebpackPlugin(["public/dist"], {
//       root: path.resolve(process.cwd(), "./app/"),
//       exclde: [],
//       verbose: true,
//       dry: false,
//     }),
//     //提取css的公共部分，有效利用缓存，（非公共部分使用inline）
//     new MiniCssExtractPlugin({
//       chunkFilename: "css/[name]_[contenthash:8].bundle.css",
//     }),
//     //优化并压缩css资源
//     new CSSMinimizerPlugin(),
//     //多线程打包js,加快打包速度
//     new HappyPack({
//       id: "js",
//       ...happypackCommonCinfig,
//       loaders: [
//         `${require.resolve("babel-loader")}?${JSON.stringify({
//           presets: [require.resolve("@babel/preset-env")],
//           plugins: [require.resolve("@babel/plugin-transform-runtime")],
//         })}`,
//       ],
//     }),
//     //多线程打包css,加快打包速度
//     new HappyPack({
//       id: "css",
//       ...happypackCommonCinfig,
//       loaders: [
//         {
//           path: require.resolve("css-loader"),
//           options: {
//             importLoaders: 1,
//           },
//         },
//       ],
//     }),
//     //浏览器在请求资源时不发送用户的身份凭证
//     new HtmlWebpackInjectAttributesPlugin({
//       crossorigin: "anonymous",
//     }),
//   ],
//   optimization: {
//     //使用 TerserPlugin 的并发和缓存，提升压缩阶段的性能
//     //清除console.log
//     minimize: true,
//     minimizer: [
//       new TerserWebpackPlugin({
//         cache: true, //启用缓存来加速构建过程
//         parallel: true, //利用多核CPU的优势来加快压缩速度
//         terserOptions: {
//           compress: {
//             drop_console: true, //清除console.log
//           },
//         },
//       }),
//     ],
//   },
// });
// module.exports = webpackConfig;

const productionConfig: Configuration = {
  mode: "production", // 指定为生产环境
  //生产环境的 output 配置
  output: {
    path: join(process.cwd(), "./dist/app/public/prod"), // 输出目录
    filename: "js/[name]_[chunkhash:8].bundle.js", // 输出文件名
    publicPath: "/", // 产物文件中的资源引用路径，例如：<script src="./js/entrypage1_c027fac3.bundle.js"></script>
    crossOriginLoading: "anonymous", // 跨域加载资源时，是否添加 crossorigin 属性
  },
  optimization: {
    runtimeChunk: true,
  },
};

export default merge(webpackBaseConfig, productionConfig);
