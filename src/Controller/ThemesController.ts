import { Request, Response } from "express";
import ThemeModel from "../Model/ThemeModel.ts";

const GetThemes = async (req: Request, res: Response) => {
  try {
    const themes = await ThemeModel.find();

    res.status(200).json(themes);
  } catch (error) {
    console.log("Error getting themes", error);
    res.status(500).json({ message: "Error getting themes" });
  }
};

export default { GetThemes };
