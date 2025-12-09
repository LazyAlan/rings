import Fastify, { FastifyInstance } from "fastify";
import { IApp } from "types/IApp";
import { resolve, sep } from "node:path";
import { getEnv } from "./env";

// 加载器部分
import configLoader from "./loader/config";
import controllerLoader from "./loader/controller";
import extendLoader from "./loader/extend";
import middlewareLoader from "./loader/middleware";
import routerSchemaLoader from "./loader/router-schema";
import routerLoader from "./loader/router";
import serviceLoader from "./loader/service";

const start = async (options?: any) => {
  const app: IApp = {} as IApp;

  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  app.server = fastify;
  app.options = options ?? {};
  // 基础路径
  // 这里假设编译后的代码都在 dist 目录下，实际项目可根据需求调整，开发过程中为了避免获取 .ts 和 .js 模块混淆，需要保留 dist 目录
  app.baseDir = process.cwd() + "/dist/";

  // 业务文件路径
  app.businessPath = resolve(app.baseDir, `.${sep}app`);

  // 初始化环境配置
  app.env = getEnv();
  fastify.log.info(`当前环境： ${app.env}`);

  // 加载器，需要按顺序加载，因为后面洋葱圈框架处理需要他们的顺序
  await middlewareLoader(app);
  console.log(`loaded middleware====>`, app.middlewares);

  await routerSchemaLoader(app);
  console.log(`loaded routerSchema====>`, app.routerSchema);

  await controllerLoader(app);
  console.log(`loaded controller====>`, app.controller);

  await serviceLoader(app);
  console.log(`loaded service====>`, app.service);

  await configLoader(app);
  console.log(`loaded config====>`, app.config);

  await extendLoader(app);
  console.log(`loaded extend====>`, app.extend);

  // 在 app/middleware/ 文件夹下注册全局中间件
  try {
    let module = await import(`${app.businessPath + sep}middleware`);
    module.default(app);
  } catch (error) {
    console.log("app/middleware/ 目录下没有找到任何文件");
  }

  await routerLoader(app);
  console.log(`loaded router====>`, app.router);

  // 测试路由
  fastify.get("/hello", async (request, reply) => {
    return reply.send("Hello Rigns App");
  });

  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

export { start };
