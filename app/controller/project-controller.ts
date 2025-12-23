import { IApp } from "types/IApp.js";

type PageParams = { page: string }; // 这里可以在 schema 里用，就不需要在每个 controller 里写了

export default (app: IApp) => {
  return class ProjectController {
    // 测试用例
    async getList(request: any, reply: any) {
      const { projectService: service } = app.service;
      const result = await service.getList();
      reply.send(result);
    }
    // 获取模型列表
    async getModelList(request: any, reply: any) {
      const { projectService: service } = app.service;
      const modelList = await service.getModelList();
      //构造model关键数据
      const dtoModelList = modelList.reduce((preList: any, item: any) => {
        const { model, project } = item;
        //构造model关键数据
        const { key, name, desc } = model;
        const dtoModel = { key, name, desc };
        //构造project关键数据
        const dtoProject = Object.keys(project).reduce(
          (preObj: any, projKey: any) => {
            const { key, name, desc, homePage } = project[projKey];
            preObj[projKey] = { key, name, desc, homePage };
            return preObj;
          },
          {}
        );
        // const dtoProject={}
        // for (const projKey in project) {
        //   const { key,name, desc,homePage } = project[projKey];
        //   dtoProject[projKey] = {  key,name, desc,homePage};
        // }
        //整合返回结构
        preList.push({
          model: dtoModel,
          project: dtoProject,
        });
        return preList;
      }, []);
      reply.send(dtoModelList);
    }
  };
};
