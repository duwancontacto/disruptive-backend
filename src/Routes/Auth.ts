import { Router } from "express";
import AuthControllers from "../Controller/AuthControllers.ts";
import authMiddleware from "../Middleware/authMiddleware.ts";
import { check } from "express-validator";
import validateFields from "../Middleware/validateFields.ts";

const routes = Router();

routes.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  validateFields,
  AuthControllers.LoginUser
);
routes.get("/profile", authMiddleware, AuthControllers.GetProfileUser);
routes.post(
  "/register",
  [
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("alias", "Alias is required").not().isEmpty(),
    check("role", "Role is required").not().isEmpty(),
  ],
  validateFields,
  AuthControllers.RegisterUser
);

export default routes;
