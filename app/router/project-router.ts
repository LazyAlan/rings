import { IApp } from "types/IApp.js";

export default async (app: IApp) => {
  const { projectController: ctl } = app.controller;
  app.server.post("/project", (req, rep) => ctl.getList(req, rep));
};
