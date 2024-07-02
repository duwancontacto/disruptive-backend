import express from "express";
import Branch from "./Branch.ts";
import Order from "./Order.ts";

const routes = (app: express.Application) => {
  app.use("/api/v1/branchs", Branch);
  app.use("/api/v1/orders", Order);
};

export default routes;
