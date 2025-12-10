import { resolve, sep } from "path";
import { IApp } from "../../types/IApp.js";

/**
 * 配置加载器，通过配置区分 本地/测试/生产 环境
 * 框架约定存在一个默认配置文件，通过加载器读取文件覆盖默认环境配置后加载到 app.config 供调用
 * 默认配置 config/config.default
 * 本地配置 config/config.local
 * 测试配置 config/config.beta
 * 生产配置 config/config.production
 * @param {IApp} app - 应用程序实例
 */
export default async (app: IApp) => {
  const filePath = resolve(app.baseDir, `.${sep}/config`);

  let defaultConfig: any = {};
  try {
    defaultConfig = await import(resolve(filePath, `.${sep}config.default.js`));
  } catch (error) {
    console.log("缺少 config/config.default.js 配置文件");
  }

  let envConfig: any = {};
  try {
    if (app.env.includes("local"))
      envConfig = await import(resolve(filePath, `.${sep}config.local.js`));

    if (app.env.includes("beta"))
      envConfig = await import(resolve(filePath, `.${sep}config.beta.js`));

    if (app.env.includes("production"))
      envConfig = await import(
        resolve(filePath, `.${sep}config.production.js`)
      );
  } catch (error) {
    console.log(`获取 ${app.env} 配置文件错误：${error}`);
  }

  app.config = Object.assign({}, defaultConfig.default, envConfig.default);
};
