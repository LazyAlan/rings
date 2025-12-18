// 开发环境我就不配置了，提供一个参考
// const express = require("express");
// const path = require("path");
// const consoler = require("consoler");
// const webpack = require("webpack");
// const devMiddleware = require("webpack-dev-middleware");
// const hotMiddleware = require("webpack-hot-middleware");
// // 从webpack.config.js中获取webpack配置和devServer配置

// module.exports = () => {
//   const {
//     webpackConfig,
//     DEV_SERVER_CONFIG,
//   } = require("./config/webpack.dev.js");

//   const app = express();
//   const compiler = webpack(webpackConfig);
//   // 指定静态文件目录
//   app.use(express.static(path.join(__dirname, "../public/dist")));
//   //引用devMiddlewarez中间件（监控文件改动）
//   app.use(
//     devMiddleware(compiler, {
//       //落地文件
//       writeToDisk: (filePath) => filePath.endsWith(".tpl"),
//       //资源路径
//       publicPath: webpackConfig.output.publicPath,
//       //headers配置
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers":
//           "X-Requested-With,Content-Type,Authorization",
//         "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
//       },
//       stats: {
//         colors: true,
//       },
//     })
//   );
//   //引用hotMiddleware中间件（热更新）
//   app.use(
//     hotMiddleware(compiler, {
//       path: `/${DEV_SERVER_CONFIG.HMR_PATH}`,
//       log: () => {},
//     })
//   );
//   consoler.info("请等待webpack初次构建完成提示...");
//   //启动服务devServer
//   const port = DEV_SERVER_CONFIG.PORT;
//   app.listen(port, () => {
//     console.log(`app listening on port${port}`);
//   });
// };
