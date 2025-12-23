import { IApp } from "types/IApp.js";
import modelList from "../../model/index.js";

export default (app: IApp) => {
  return class ProjectService {
    // 测试用例
    async getList() {
      // 打印 modelList 数据
      const models = await modelList(app);
      return [
        {
          name: "project1",
          desc: "project1 desc",
        },
        {
          name: "project2",
          desc: "project2 desc",
        },
        {
          name: "project3",
          desc: "project3 desc",
        },
      ];
    }

    // 获取 modelList 数据
    async getModelList() {
      // 获取 modelList 数据
      const models = await modelList(app);
      return models;
    }
  };
};
