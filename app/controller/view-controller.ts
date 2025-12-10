import { IApp } from "types/IApp.js";

export default (app: IApp) => {
  return class ViewController {
    // 根据模板渲染一个页面，填充数据可以从 service 里查询
    async renderPage(request: any, reply: any) {
      return reply.view(`${request.params?.page}.njk`, {
        title: "home page",
        user: { name: "AlanXu" },
      });
    }
  };
};
