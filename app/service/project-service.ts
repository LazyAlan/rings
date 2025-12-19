import { IApp } from "types/IApp.js";
import modelList from "../../model/index.js";

export default (app: IApp) => {
  return class ProjectService {
    async getList() {
      // 打印 modelList 数据
      const models = await modelList(app);
      console.log(
        "===========modelList data===========>",
        JSON.stringify(models)
      );
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
  };
};
