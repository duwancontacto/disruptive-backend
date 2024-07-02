import { Request, Response } from "express";
import BranchModel from "../Model/BranchModel.ts";
import BoxTypesModel from "../Model/BoxTypesModel.ts";
import BranchCategoryModel from "../Model/BranchCategoryModel.ts";

const GetBranches = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { robotic: { $regex: search, $options: "i" } },
        ],
      };
    }

    const boxTypes = await BoxTypesModel.find();

    const contents = await BranchModel.find(query).populate(
      "boxes.box_type_id"
    );

    res.status(200).json(contents);
  } catch (error) {
    console.log("Error getting contents", error);
    res.status(500).json({ message: "Error getting contents" });
  }
};

const GetCategories = async (req: Request, res: Response) => {
  try {
    const categories = await BranchCategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error getting categories", error);
    res.status(500).json({ message: "Error getting categories" });
  }
};

export default { GetBranches, GetCategories };
