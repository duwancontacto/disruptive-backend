import { Request, Response } from "express";
import CategoryModel from "../Model/CategoryModel.ts";

const GetCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log("Error getting categories", error);
    res.status(500).json({ message: "Error getting categories" });
  }
};

export default { GetCategories };
