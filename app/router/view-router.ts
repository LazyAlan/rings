import { IApp } from "types/IApp.js";

export default async (app: IApp) => {
  const { viewController: ctl } = app.controller;
  //   app.server.get("/view/:page", ctl.renderPage.bind(ctl));
  app.server.get("/view/:page", (req, rep) => ctl.renderPage(req, rep));
};
