import { IApp } from "../types/IApp.js";
import fastifyView from "@fastify/view";
import nunjucks, { ConfigureOptions, Environment } from "nunjucks";
import { resolve, sep } from "node:path";
import fastifyStatic from "@fastify/static";

/**
 * 全局中间件
 */

export default async (app: IApp) => {
  // const viewPath = resolve(app.baseDir, `.${sep}app${sep}views`);
  const viewPath = resolve(app.baseDir, `.${sep}app${sep}public${sep}/prod`);
  console.log("viewPath======>", viewPath);
  //  注册 view 插件
  app.server.register(fastifyView, {
    engine: { nunjucks },
    root: viewPath,
    viewExt: "njk",
    options: {
      nunjucks: {
        autoescape: true, // 控制输出是否被转义 默认值：true
        noCache: !app.env.includes("production"),
        trimBlocks: true,
        lstripBlocks: true,
      } satisfies nunjucks.ConfigureOptions,
    },
  });

  // 初始化 nunjucks 环境配置
  const njkEnv: Environment = nunjucks.configure(viewPath, {
    autoescape: true, // 控制输出是否被转义 默认值：true
    noCache: !app.env.includes("production"),
    trimBlocks: true,
    lstripBlocks: true,
  } satisfies ConfigureOptions);

  // 暴露给其他地方，方便添加 filter/global 或直接使用 njkEnv
  app.server.decorate("nunjucksEnv", njkEnv);

  // 注册静态资源
  const assetPath = resolve(app.baseDir, `.${sep}app${sep}asset`);
  app.server.register(fastifyStatic, {
    root: assetPath,
    prefix: "/app/asset/",
    decorateReply: false,
  });

  // 注册 webpack 打包产物的静态资源
  const prodPath = resolve(app.baseDir, `.${sep}app${sep}public${sep}prod`);
  app.server.register(fastifyStatic, {
    root: prodPath,
    // prefix: "/dist/app/public/prod/",
    prefix: "/",
    decorateReply: false,
  });
};
