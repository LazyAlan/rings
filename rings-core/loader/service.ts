import { IApp } from "../../types/IApp.js";
import { moduleLoadClassAndFunc } from "../../utils/moduleLoad.js";

/**
 * 服务加载器，把 app/service 文件目录下的文件转换成模块添加到 app 提供调用，支持多层级
 * @param {IApp} app - 应用程序实例
 * @example 把 `app/service/custom-module/custom-service.ts` 转化为 `app.service.customModule.customService`
 */
export default async (app: IApp) => {
  const service: any = {};
  app.service = service;
  await moduleLoadClassAndFunc(app, "service", service);
};
