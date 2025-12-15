import _ from "lodash";
import { globSync } from "glob";
import { resolve, sep } from "node:path";
import { IApp } from "types/IApp.js";

const projectExtendModel = (model: any, project: any) => {
  _.mergeWith({}, model, project, (modelValue: any, projValue: any) => {
    // 处理数组合并的特殊情况
    if (Array.isArray(modelValue) && Array.isArray(projValue)) {
      let result: any = [];
      // 因为 project 继承自 model 所以需要处理修改和新增内容的情况
      // model 有的键值 project 也有 => 修改（重载）
      // model 没有的键值 project 有 => 新增
      // model 有的键值 project 没有 => 保留(继承)
      return result;
    }
  });
};

/**
 * 解析 model 配置，返回组织且继承后的数据结构，格式如下：
 * [{
 *   model: ${model},
 *   project:{
 *      proj1:${proj1},
 *      proj2:${proj2}
 *   }
 * },......]
 */
export default async (app: IApp) => {
  const modelList: any = [];

  const modelPath = resolve(app.baseDir, `.${sep}model`);
  const fileList = globSync(resolve(modelPath, `.${sep}**${sep}*.js`));
  for (const file of fileList) {
    if (file.indexOf("index.js") > -1) return;

    // 区分配置类型 model/project
    // const fileMainPath = file.split(process.cwd().replace(/\\/g, "/"));
    const type = file.indexOf(`${sep}project${sep}`) > -1 ? "project" : "model";

    if (type === "project") {
    }
    if (type === "model") {
      const modelKey = file.match(/\/model\/(.*?)\/model.js/)?.[1];
      let modelItem = modelList.find(
        (item: any) => item.model?.key === modelKey
      );
      if (!modelItem) {
        modelItem = {};
        modelList.push(modelItem);
      }
      modelItem.model = await import(file);
      modelItem.model.key = modelKey;
    }
  }

  return modelList;
};
