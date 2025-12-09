import { resolve, sep } from "path";
import { IApp } from "../../types/IApp";
import { moduleLoadClassAndFunc } from "../../utils/moduleLoad";

/**
 * 路由加载器，把 app/router 目录下的所有文件加载到 fastify.router
 * @param {IApp} app - 应用程序实例
 */
export default async (app: IApp) => {
  const router: any = {};
  app.router = router;
  await moduleLoadClassAndFunc(app, "router", router);
};
