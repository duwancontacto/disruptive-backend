import { Router } from "express";
import CategoriesController from "../Controller/CategoriesController.ts";

const routes = Router();

routes.get("/", CategoriesController.GetCategories);

export default routes;
