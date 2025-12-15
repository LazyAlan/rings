export default {
  //模板名称
  name: "B站课堂",
  desc: "B站课堂系统",
  homePage: "/schema?proj_key=bilibili&&key=product",
  menu: [
    {
      key: "product",
      menuType: "module",
      moduleType: "custom",
      name: "商品管理(B站)",
      customConfig: {
        path: "/todo",
      },
    },
    {
      key: "user",
      menuType: "module",
      name: "用户管理(B站)",
      moduleType: "custom",
      customConfig: {
        path: "/todo",
      },
    },
    {
      key: "course", //菜单项的唯一标识
      name: "课程资料", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "sider",
      //当menuType为group时可填
      siderConfig: {
        menu: [
          {
            key: "pdf",
            name: "PDF",
            menuType: "module",
            moduleType: "custom",
            customConfig: {
              path: "/todo",
            },
          },
          {
            key: "excel",
            name: "Excel",
            menuType: "module",
            moduleType: "custom",
            customConfig: {
              path: "/todo",
            },
          },
          {
            key: "ppt",
            name: "PPT",
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
