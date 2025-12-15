export default {
  //模板类型，不同模板类型对应不一样的模板数据结构
  mode: "dashboard",
  //模板名称
  name: "电商系统",
  menu: [
    {
      key: "product", //菜单项的唯一标识
      name: "商品管理", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "schema",
      //当menuType为group时可填
      schemaConfig: {
        api: "/api/proj/product",
        schema: {
          type: "object",
          required: ["product_name"],
          properties: {
            product_id: {
              type: "string",
              label: "商品ID",
              searchOption: {
                comType: "input", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                //comType ==='select'时
              },
              tableOption: {
                width: 300,
                "show-overflow-tooltip": true,
              },
              detailPanelOption: {},
            },
            product_name: {
              type: "string",
              label: "商品名称",
              minLength: 10,
              tableOption: {},
              searchOption: {
                comType: "input", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                //comType ==='select'时
              },
              createFormOption: {
                comType: "input", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                placeholder: "请输入商品名称",
                //comType ==='select'时
              },
              editFormOption: {
                comType: "input", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                //comType ==='select'时
              },
              detailPanelOption: {},
            },
            price: {
              type: "number",
              label: "商品价格",
              tableOption: {
                width: 200,
              },
              createFormOption: {
                comType: "inputNumber", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                type: "number",
                //comType ==='select'时
              },
              editFormOption: {
                comType: "inputNumber", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                type: "number",
                //comType ==='select'时
              },
              detailPanelOption: {},
            },
            inventory: {
              type: "number",
              label: "库存",
              tableOption: {
                width: 200,
              },
              createFormOption: {
                comType: "select", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                //comType ==='select'时
                enumList: [
                  {
                    label: "100",
                    value: 100,
                  },
                  {
                    label: "200",
                    value: 200,
                  },
                  {
                    label: "300",
                    value: 300,
                  },
                ],
              },
              editFormOption: {
                comType: "select", //配置组件类型 input/select/checkbox/radio/datePicker
                default: "", //默认值
                //comType ==='select'时
                enumList: [
                  {
                    label: "100",
                    value: 100,
                  },
                  {
                    label: "200",
                    value: 200,
                  },
                  {
                    label: "300",
                    value: 300,
                  },
                ],
              },
              detailPanelOption: {},
            },
            create_time: {
              type: "string",
              label: "创建时间",
              tableOption: {
                width: 200,
              },
              detailPanelOption: {},
            },
          },
        },
      },
      tableConfig: {
        headerButtons: [
          {
            label: "新增",
            type: "primary",
            plain: true,
            eventKey: "showComponent", //按钮事件名
            eventOption: {
              comName: "createForm", //组件名称
            },
          },
        ],
        rowButtons: [
          {
            label: "修改",
            type: "warning",
            eventKey: "showComponent",
            eventOption: {
              comName: "editForm", //组件名称
            },
          },
          {
            label: "删除",
            type: "danger",
            eventKey: "remove",
            eventOption: {
              params: {
                product_id: "schema::product_id",
              },
            },
          },
          {
            label: "详情",
            type: "info",
            eventKey: "showComponent",
            eventOption: {
              comName: "detailPanel", //组件名称
            },
          },
        ],
      },
      componentConfig: {
        createForm: {
          title: "新增商品",
        },
        editForm: {
          mainKey: "product_id",
          title: "修改商品",
        },
        detailPanel: {
          mainKey: "product_id",
          title: "商品详情",
        },
      },
    },
    {
      key: "order", //菜单项的唯一标识
      name: "订单管理", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "custom",
      //当menuType为group时可填
      customConfig: {
        path: "/todo",
      },
    },
    {
      key: "client", //菜单项的唯一标识
      name: "客户管理", //菜单项的名称
      menuType: "module", //枚举值：group/module
      moduleType: "custom",
      //当menuType为group时可填
      customConfig: {
        path: "/todo",
      },
    },
  ],
};
