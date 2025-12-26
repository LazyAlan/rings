import { Component, createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import pinpa from "./store";
import { createMemoryHistory, createRouter } from "vue-router";
// import type { RouteRecordRaw } from "vue-router";
import "./asset/custom.css";
import "element-plus/theme-chalk/dark/css-vars.css";

/**
 * vue 页面主入口，用于启动 vue
 * @param pageComponent 页面组件
 * @param routes 路由列表
 * @param libs 页面依赖的第三方库
 */
export default (
  pageComponent: Component,
  { routes, libs }: { routes: any | undefined; libs: any | undefined }
) => {
  const app = createApp(pageComponent);

  if (libs && libs.length) {
    for (const lib of libs) {
      app.use(lib);
    }
  }

  app.use(ElementPlus);
  app.use(pinpa);

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });
  app.use(router);

  app.mount("#root");
};
