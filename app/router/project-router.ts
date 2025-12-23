import { IApp } from "types/IApp.js";

export default async (app: IApp) => {
  const { projectController: ctl } = app.controller;
  // 测试用例
  app.server.route({
    method: "POST",
    url: "/project",
    schema: {
      // request needs to have a querystring with a `name` parameter
      // querystring: {
      //   type: "object",
      //   properties: {
      //     a: { type: "number" },
      //     b: { type: "number" },
      //   },
      //   required: ["a", "b"],
      // },
      body: {
        type: "object",
        properties: {
          a: { type: "number" },
          b: { type: "number" },
        },
        required: ["a", "b"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      // response: {
      //   200: {
      //     type: "object",
      //     properties: {
      //       hello: { type: "string" },
      //     },
      //   },
      // },
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      return ctl.getList(request, reply);
    },
  });

  // 获取模型列表
  app.server.route({
    method: "get",
    url: "/api/project/model_list",
    schema: {
      // request needs to have a querystring with a `name` parameter
      // querystring: {
      //   type: "object",
      //   properties: {
      //     a: { type: "number" },
      //     b: { type: "number" },
      //   },
      //   required: ["a", "b"],
      // },
      // body: {
      // type: "object",
      // properties: {
      //   a: { type: "number" },
      //   b: { type: "number" },
      // },
      // required: ["a", "b"],
      // },
      // the response needs to be an object with an `hello` property of type 'string'
      // response: {
      //   200: {
      //     type: "object",
      //     properties: {
      //       hello: { type: "string" },
      //     },
      //   },
      // },
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      return ctl.getModelList(request, reply);
    },
  });
};
