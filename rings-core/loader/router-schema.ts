import { IApp } from "../../types/IApp.js";
import { resolve, sep } from "node:path";
import { globSync } from "glob";

/**
 * 路由规则加载器
 * 通过 'typebox && @fastify/type-provider-typebox && ajv' 对 API 规则进行约束和校验，不支持层级
 * 把 'app/router-schema' 下的所有 js 文件转化输出为:
 * app.routerSchema={
 *     'apiname1':'jsonschema1',
 *     'apiname2':'jsonschema2',
 *     'apiname3':'jsonschema3',
 *     ......
 *     ......
 * }
 * @param {IApp} app - 应用程序实例
 */
export default async (app: IApp) => {
  let routerSchema: any = {};
  app.routerSchema = routerSchema;

  // 读取文件
  const filePath = resolve(app.businessPath, `.${sep}router-schema`);
  const filePathList = globSync(resolve(filePath) + `/**/*.js`); // 这里要写 .js 因为最终执行的是 js 文件

  for (const file of filePathList) {
    const module = await import(file);
    routerSchema = {
      ...routerSchema,
      ...module,
    };
  }
};
