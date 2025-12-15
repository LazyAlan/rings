import { IApp } from "../../types/IApp.js";
import { moduleLoadClassAndFunc } from "../../utils/moduleLoad.js";

/**
 * 路由加载器，把 app/router 目录下的所有文件加载到 fastify.router
 * 因为我直接用了 app.server 里的路由，所以这个 router 实际上并没有使用到
 * @param {IApp} app - 应用程序实例
 */
export default async (app: IApp) => {
  const router: any = {};
  app.router = router;
  await moduleLoadClassAndFunc(app, "router", router);
};
