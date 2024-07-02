import Database from "../Config/Database.ts";
import BranchCategoryModel from "../Model/BranchCategoryModel.ts";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const seedDatabaseBranchCategory = async () => {
  await Database();

  //drop database
  await BranchCategoryModel.deleteMany({});

  const categories = [{ name: "CABA" }, { name: "GBA" }, { name: "INTERIOR" }];

  for (const category of categories) {
    await BranchCategoryModel.create(category);
  }

  console.log("Categorías sembradas con éxito");
};

export default seedDatabaseBranchCategory;
