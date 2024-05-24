import { Router } from "express";
import ThemesController from "../Controller/ThemesController.ts";

const routes = Router();

routes.get("/", ThemesController.GetThemes);

export default routes;
