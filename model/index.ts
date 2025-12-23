import _ from "lodash";
import { globSync } from "glob";
import { resolve, sep } from "node:path";
import { IApp } from "types/IApp.js";

const projectExtendModel = (model: any, project: any) => {
  return _.mergeWith({}, model, project, (modelValue: any, projValue: any) => {
    // 处理数组合并的特殊情况
    if (Array.isArray(modelValue) && Array.isArray(projValue)) {
      let result: any = [];
      // 因为 project 继承自 model 所以需要处理修改和新增内容的情况
      // model 有的键值 project 也有 => 修改（重载）
      // model 没有的键值 project 有 => 新增
      // model 有的键值 project 没有 => 保留(继承)

      // 处理修改和保留
      for (let i = 0; i < modelValue.length; ++i) {
        let modelItem = modelValue[i];
        let projItem = projValue.find((item) => item.key === modelItem.key);
        // project有的键值，model也有，则递归调用projectExtendModel方法覆盖修改
        result.push(
          projItem ? projectExtendModel(modelItem, projItem) : modelItem
        );
      }

      //处理新增
      for (let i = 0; i < projValue.length; ++i) {
        let projItem = projValue[i];
        let modelItem = modelValue.find((item) => item.key === projItem.key);
        // project有的键值，model没有，则直接添加到result中
        if (!modelItem) {
          result.push(projItem);
        }
      }

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
    if (file.indexOf("index.js") > -1) continue; // 不处理当前文件
    // 区分配置类型 model/project
    // const fileMainPath = file.split(process.cwd().replace(/\\/g, "/"));
    const type = file.indexOf(`${sep}project${sep}`) > -1 ? "project" : "model";

    if (type === "project") {
      const modelKey = file.match(/\/model\/(.*?)\/project/)?.[1];
      const projKey = file.match(/\/project\/(.*?)\.js/)?.[1] || Symbol();

      let modelItem = modelList.find(
        (item: any) => item.model?.key === modelKey
      );
      if (!modelItem) {
        modelItem = {};
        modelList.push(modelItem);
      }
      if (!modelItem.project) modelItem.project = {};
      const mdl = await import(file);
      modelItem.project[projKey] = mdl.default;
      modelItem.project[projKey].key = projKey;
      // console.log("projKdy:", projKey);
      // console.log("modelItem.project[projKey]:", modelItem.project[projKey]);
      // console.log(
      //   "modelItem.project[projKey].key:",
      //   modelItem.project[projKey].key
      // );
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
      const mdl = await import(file);
      modelItem.model = mdl.default;
      modelItem.model.key = modelKey;
    }
  }

  // 进一步整理数据，体现继承关系，比如 project extends model
  modelList.forEach((item: any) => {
    const { model, project } = item;
    for (const key in project)
      project[key] = projectExtendModel(model, project[key]);
  });

  return modelList;
};
