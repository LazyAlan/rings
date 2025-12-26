import boot from "../boot";
import projectList from "./ProjectList.vue";

const routes: any[] = [{ path: "/", component: "./ProjectList.vue" }];

boot(projectList, { routes, libs: "" });
