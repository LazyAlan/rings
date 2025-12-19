// 模板类型配置参考 doc/dashboard-model.md 文档
export default {
  //模板类型，不同模板类型对应不一样的模板数据结构
  mode: "dashboard",
  //模板名称
  name: "课程系统",
  menu: [
    {
      key: "video", //菜单项的唯一标识
      name: "视频管理", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "custom",
      //当menuType为group时可填
      customConfig: {
        path: "/todo",
      },
    },
    {
      key: "user", //菜单项的唯一标识
      name: "用户管理", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "custom",
      //当menuType为group时可填
      customConfig: {
        path: "/todo",
      },
    },
  ],
};
