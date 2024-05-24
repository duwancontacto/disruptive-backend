import express from "express";
import Categories from "./Categories.ts";
import Contents from "./Contents.ts";
import Themes from "./Themes.ts";
import Auth from "./Auth.ts";

const routes = (app: express.Application) => {
  app.use("/api/v1/categories", Categories);
  app.use("/api/v1/contents", Contents);
  app.use("/api/v1/auth", Auth);
  app.use("/api/v1/themes", Themes);
};

export default routes;
