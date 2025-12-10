import Fastify, { FastifyInstance } from "fastify";
import { IApp } from "types/IApp.js";
import { resolve, sep } from "node:path";
import { getEnv } from "./env.js";

// 加载器部分
import configLoader from "./loader/config.js";
import controllerLoader from "./loader/controller.js";
import extendLoader from "./loader/extend.js";
import middlewareLoader from "./loader/middleware.js";
import routerSchemaLoader from "./loader/router-schema.js";
import routerLoader from "./loader/router.js";
import serviceLoader from "./loader/service.js";

const start = async (options?: any) => {
  const app: IApp = {} as IApp;

  const fastify: FastifyInstance = Fastify({
    logger: true,
    ajv: {
      customOptions: { strict: true },
    },
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

  // 把 app/middleware.js 注册为全局中间件，统一为 ESM 之后就不用兼容处理了
  // const mod = await import(`${app.businessPath + sep}middleware.js`);
  // const fn =
  //   typeof mod === "function"
  //     ? mod
  //     : typeof mod?.default === "function"
  //     ? mod.default
  //     : typeof mod?.default?.default === "function"
  //     ? mod.default.default
  //     : null;
  // if (typeof fn === "function") {
  //   await fn(app);
  // } else {
  //   console.log("找到 middleware 模块，但没有可执行的默认导出，module:", mod);
  // }
  try {
    const module = await import(`${app.businessPath + sep}middleware.js`);
    await module.default(app);
  } catch (error) {
    console.log("找到 middleware 模块，但没有可执行的默认导出，错误：", error);
  }

  await routerLoader(app);
  console.log(`loaded router====>`, app.router);

  // 测试路由
  fastify.get("/hello", async (request, reply) => {
    return reply.send("Hello Rigns App");
  });

  // fastify.get("/view", async (request, reply) => {
  //   return reply.view("index.njk", {
  //     title: "website",
  //     user: { name: "Alan" },
  //   });
  // });

  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

export { start };
