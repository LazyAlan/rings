import { IApp } from "../../types/IApp.js";
import { moduleLoadClassAndFunc } from "../../utils/moduleLoad.js";

/**
 * 中间件加载器，把 app/middleware 文件目录下的文件转换成模块添加到 app 提供调用，支持多层级
 * @param {IApp} app - 应用程序实例
 * @example 把 `app/middleware/custom-module/custom-middleware.ts` 转化为 `app.middlewares.customModule.customMiddleware`
 */
export default async (app: IApp) => {
  const middlewares: any = {};
  app.middlewares = middlewares;
  await moduleLoadClassAndFunc(app, "middleware", middlewares);
};
