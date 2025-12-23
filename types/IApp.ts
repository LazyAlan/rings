import { FastifyInstance } from "fastify";

interface IController {
  viewController: {
    renderPage: Function;
  };
  projectController: {
    getList: Function;
    getModelList: Function;
  };
}

interface IServece {
  projectService: {
    getList: Function;
    getModelList: Function;
  };
}

/**
 * 应用程序类型接口
 * @interface IApp
 * @property {FastifyInstance} server - Fastify服务器实例
 * @property {Object} options - 应用程序配置选项
 * @property {string} baseDir - 应用程序基础目录路径
 * @property {string} businessPath - 业务代码目录路径
 * @property {string} env - 当前环境名称：local、beta、production
 * @property {Object} middlewares - 中间件对象
 * @property {Object} routerSchema - 路由规则对象
 * @property {IController} controller - 控制器对象
 * @property {IServece} service - 服务对象
 * @property {Object} config - 配置对象
 * @property {Object} extend - 扩展对象
 * @property {Array} router - 路由对象
 */
interface IApp {
  server: FastifyInstance;
  options: {};
  baseDir: string;
  businessPath: string;
  env: string;
  middlewares: {};
  routerSchema: {};
  controller: IController;
  service: IServece;
  config: {};
  extend: {};
  router: {};
}

export { IApp };
