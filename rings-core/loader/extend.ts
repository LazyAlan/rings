import { IApp } from "../../types/IApp.js";
import { moduleLoadClassAndFunc } from "../../utils/moduleLoad.js";

/**
 * 扩展加载器，把 app/extend 文件目录下的文件转换成模块添加到 app 提供调用，支持多层级
 * @param {IApp} app - 应用程序实例
 * @example 把 `app/extend/custom-module/custom-extend` 转化为 `app.extend.customModule.customExtend`
 */
export default async (app: IApp) => {
  const extend: any = {};
  app.extend = extend;
  await moduleLoadClassAndFunc(app, "extend", extend);
};
