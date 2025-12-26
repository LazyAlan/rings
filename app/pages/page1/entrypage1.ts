import Page1 from "./Page1.vue";
import boot from "../boot";

const routes: any[] = [{ path: "/", component: "./page1.vue" }];

boot(Page1, { routes, libs: "libs/" });
