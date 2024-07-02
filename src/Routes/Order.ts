import { Router } from "express";
import OrderControllers from "../Controller/OrderControllers.ts";
import { body } from "express-validator";
import validateFields from "../Middleware/validateFields.ts";

const routes = Router();

routes.post(
  "/",
  body("box_type_id").exists().withMessage("box_type_id es requerido"),
  body("branch_id").exists().withMessage("branch_id es requerido"),
  body("payment_method").exists().withMessage("payment_method es requerido"),
  body("customer.name")
    .exists()
    .withMessage("El nombre del cliente es requerido"),
  body("customer.email")
    .exists()
    .withMessage("El email del cliente es requerido"),
  body("customer.dni").exists().withMessage("El dni del cliente es requerido"),
  body("customer.phone")
    .exists()
    .withMessage("El teléfono del cliente es requerido"),
  validateFields,
  OrderControllers.CreateOrder
);

routes.post(
  "/customers",

  body("name").exists().withMessage("El nombre del cliente es requerido"),
  body("email").exists().withMessage("El email del cliente es requerido"),

  validateFields,
  OrderControllers.CreateCustomer
);

export default routes;
