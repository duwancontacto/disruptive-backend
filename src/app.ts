import express from "express";
import routes from "./Routes/index.ts";
import dotenv from "dotenv";
import Database from "./Config/Database.ts";
import * as url from "url";
import AdminBroConfig from "./Config/AdminBro.ts";
import cors from "cors";
import path, { dirname } from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: ".env" });
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

const start = async () => {
  app.use(express.json());

  await Database();

  routes(app);
  app.use(AdminBroConfig.AdminBroRootPath, AdminBroConfig.AdminRouter);
  app.use("/public", express.static("public"));

  //Server Up
  app.listen(port, () => {
    try {
      console.log("executed");
    } catch (error) {
      console.log("Error executed migrations", error);
    }

    console.log(` > Server Listen in port: ${port} `);
  });
};

start();
