import express from "express";
import routes from "./Routes/index.ts";
import dotenv from "dotenv";
import Database from "./Config/Database.ts";
import AdminBroConfig from "./Config/AdminBro.ts";
import cors from "cors";

dotenv.config({ path: ".env" });
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

const start = async () => {
  app.use(express.json());

  await Database();

  routes(app);
  app.use(AdminBroConfig.AdminBroRootPath, AdminBroConfig.AdminRouter);

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
