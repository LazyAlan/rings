import { IApp } from "types/IApp.js";
import { FastifyRequest, FastifyReply } from "fastify";

type PageParams = { page: string }; // 这里可以在 schema 里用，就不需要在每个 controller 里写了

export default (app: IApp) => {
  return class ViewController {
    // 根据模板渲染一个页面，填充数据可以从 service 里查询
    async renderPage(
      req: FastifyRequest<{ Params: PageParams }>,
      rep: FastifyReply
    ) {
      console.log("req.params?.page=========>", req.params?.page);
      // 通过 http://IP:port/view/page1 访问当前页面，不需要浏览器显示输入 entrypage1
      return rep.view(`entry${req.params?.page}`, {
        title: "home page!!!",
        user: { name: "AlanXu" },
      });
    }
  };
};
