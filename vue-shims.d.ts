// 为了让 TS 识别 vue 文件，需要增加下面的配置
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
