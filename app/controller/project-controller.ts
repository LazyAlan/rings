import { IApp } from "types/IApp.js";

type PageParams = { page: string }; // 这里可以在 schema 里用，就不需要在每个 controller 里写了

export default (app: IApp) => {
  return class ProjectController {
    async getList(request: any, reply: any) {
      const { projectService: service } = app.service;
      const result = await service.getList();
      reply.send(result);
    }
  };
};
