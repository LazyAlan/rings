import Page2 from "./Page2.vue";
import boot from "../boot";

const routes: any[] = [
  { path: "/", component: "./page2.vue" },
  { path: "/about", component: "./page2.vue" },
];

boot(Page2, { routes, libs: "libs/" });
