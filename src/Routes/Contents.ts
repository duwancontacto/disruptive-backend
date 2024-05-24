import { Router } from "express";
import ContentsController from "../Controller/ContentsController.ts";
import authMiddleware from "../Middleware/authMiddleware.ts";
import validateFields from "../Middleware/validateFields.ts";
import { check } from "express-validator";
import fileUpload from "express-fileupload";

const routes = Router();

routes.use(
  fileUpload({
    tempFileDir: "/temp",
  })
);

routes.get("/", ContentsController.GetContents);

routes.post(
  "/upload",
  authMiddleware,
  [
    check("name", "Name is required").not().isEmpty(),
    check("theme_id", "Theme is required").not().isEmpty(),
  ],
  validateFields,
  ContentsController.UploadContent
);

routes.get(
  "/download/:contentId",
  authMiddleware,
  ContentsController.DownloadFile
);

export default routes;
