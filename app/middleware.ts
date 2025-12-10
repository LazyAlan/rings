import { IApp } from "../types/IApp.js";
import fastifyView from "@fastify/view";
import nunjucks, { ConfigureOptions, Environment } from "nunjucks";
import { resolve, sep } from "node:path";

/**
 * 全局中间件
 */

export default async (app: IApp) => {
  const viewPath = resolve(app.baseDir, `.${sep}views`);
  //  注册 view 插件
  app.server.register(fastifyView, {
    engine: { nunjucks },
    root: viewPath,
    viewExt: "njk",
    options: {
      nunjucks: {
        autoescape: true,
        noCache: !app.env.includes("production"),
        trimBlocks: true,
        lstripBlocks: true,
      } satisfies nunjucks.ConfigureOptions,
    },
  });

  // 初始化 nunjucks 环境配置
  const njkEnv: Environment = nunjucks.configure(viewPath, {
    autoescape: true,
    watch: false,
  } satisfies ConfigureOptions);
};
