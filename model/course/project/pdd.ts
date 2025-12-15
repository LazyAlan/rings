export default {
  //模板名称
  name: "抖音课堂",
  desc: "抖音课堂系统",
  homePage: "/schema?proj_key=douyin&&key=product",
  menu: [
    {
      key: "traffic", //菜单项的唯一标识
      name: "流量管理", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "sider",
      //当menuType为group时可填
      siderConfig: {
        menu: [
          {
            key: "user-traffic",
            name: "学员流量",
            menuType: "module",
            moduleType: "custom",
            customConfig: {
              path: "/todo",
            },
          },
        ],
      },
    },
  ],
};
