import { Router } from "express";
import BranchController from "../Controller/BranchControllers.ts";

const routes = Router();

routes.get("/", BranchController.GetBranches);
routes.get("/categories", BranchController.GetCategories);
export default routes;
