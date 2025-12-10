import { IApp } from "../../types/IApp.js";
import { moduleLoadClassAndFunc } from "../../utils/moduleLoad.js";

/**
 * 控制器加载器，把 app/controller 文件目录下的文件转换成模块添加到 app 提供调用，支持多层级
 * @param {IApp} app - 应用程序实例
 * @example 把 `app/controller/custom-module/custom-controller.ts` 转化为 `app.controller.customModule.customController`
 */
export default async (app: IApp) => {
  const controller: any = {};
  app.controller = controller;
  await moduleLoadClassAndFunc(app, "controller", controller);
};
