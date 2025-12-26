import type { Configuration } from "webpack";
import webpack from "webpack";
import { basename, join, resolve } from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { globSync } from "glob";

// 动态构造 pageEntries 和 HtmlWebpackPlugin
const pageEntries: Record<string, string> = {};
const htmlWebpackPluginList: HtmlWebpackPlugin[] = [];
// 获取 app/pages 下的入口文件，命名约定为 entryXX.ts
const entryList = resolve(process.cwd(), "./app/pages/**/*.ts");
globSync(entryList).forEach((file) => {
  const entryName = basename(file, ".ts");
  pageEntries[entryName] = file;
  htmlWebpackPluginList.push(
    new HtmlWebpackPlugin({
      template: resolve(process.cwd(), "./dist/app/views/entry.njk"), // 模板文件路径
      filename: resolve(
        process.cwd(),
        "./dist/app/public/prod/",
        `${entryName}.njk`
      ), //产物输出路径
      chunks: [entryName], // 引入的 chunk 名称，要和入口文件中的名称一致
      inject: "body",
    })
  );
});

/**
 * webpack 基础配置
 */
const webpackBaseConfig: Configuration = {
  // 入口文件
  entry: {
    // 这里要把 ts 交给 webpack 处理，因为只有这样才能把源代码中的 .vue 文件正确打包到 dist 目录下
    // 之前的做法是把 .vue 文件在 build 阶段复制到打包后的 dist 目录下，这样是不能正确处理 .vue 文件中的
    entrypage1: "./app/pages/page1/entrypage1.ts",
    entryprojectlist: "./app/pages/project-list/entryprojectlist.ts",
  },
  // 模块解析规则，决定了要加载哪些模块，以及用什么方式去解析
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // 提高编译速度
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: "file-loader",
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: "file-loader",
      },
    ],
  },
  // 输出配置
  // output: {
  //   path: join(process.cwd(), "./dist/app/public/prod"), // 输出目录
  //   filename: "js/[name]_[chunkhash:8].bundle.js", // 输出文件名
  //   publicPath: "/", // 产物文件中的资源引用路径，例如：<script src="./js/entrypage1_c027fac3.bundle.js"></script>
  //   crossOriginLoading: "anonymous", // 跨域加载资源时，是否添加 crossorigin 属性
  // },
  // 配置模块解析的具体行为，定义 webpack 在打包时如何解析模块的路径
  resolve: {
    extensions: [".ts", ".vue", ".js", ".css", ".scss"], // 查找的扩展名
    alias: {
      $pages: resolve(process.cwd(), "./app/pages"),
      $common: resolve(process.cwd(), "./app/pages/common"),
      $widgets: resolve(process.cwd(), "./app/pages/widgets"),
      $store: resolve(process.cwd(), "./app/pages/store"),
    },
  },
  // 插件配置
  plugins: [
    // 处理 VUE 文件，这个插件是必须的
    // 它的职能是将定义的其他规则复制并应用到 VUE 文件中
    // 例如：如果定义了处理 TS 文件的规则，那么 VUE 文件中 <script> 板块也会应用这个规则
    new VueLoaderPlugin(),
    // 把第三方库暴露到 window 上
    new webpack.ProvidePlugin({
      Vue: "vue",
      axios: "axios",
      _: "lodash",
    }),
    // 定义全局常量
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true), // 是否启用 Vue 选项 API
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // 是否启用 Vue 生产环境下的 DevTools
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // 是否启用 Vue 生产环境下的 hydration(谁喝)
    }),
    // 构造最终渲染的页面模板
    ...htmlWebpackPluginList,
  ],
  // 优化配置，例如：代码分割，模块合并，缓存，TreeShaking，压缩等
  optimization: {
    /**
     * 代码分割
     * vendor: 第三方库
     * common: 业务组件代码的公共部分
     * entry{page}: 不同页面的代码会经常改变，所以单独提取出来
     */
    splitChunks: {
      chunks: "all" as const, // 对同步和异步模块都进行分割
      maxAsyncRequests: 10, // 最大异步请求数，默认值为 5
      maxInitialRequests: 10, // 最大初始请求数，默认值为 3
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 20,
          enforce: true,
          reuseExistingChunk: true, // 复用已有的公共 chunk
        },
        common: {
          name: "common",
          priority: 10,
          minChunks: 2, // 至少被引用的次数
          minSize: 1, // 最小分割文件大小（byte)，这里设置较小的值方便测试
          reuseExistingChunk: true, // 复用已有的公共 chunk
        },
      },
    },
  },
};

export default webpackBaseConfig;
