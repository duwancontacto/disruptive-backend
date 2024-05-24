import { Request, Response } from "express";
import ContentModel from "../Model/ContentModel.ts";
import { CustomRequest } from "../Types/CustomRequest.ts";
import { getUserById } from "../Repositories/UserRepository.ts";
import { UploadFile } from "../utils/UploadFile.ts";
import axios from "axios";
import fs from "fs";
import ThemeModel from "../Model/ThemeModel.ts";
import CategoryModel from "../Model/CategoryModel.ts";
const GetContents = async (req: Request, res: Response) => {
  try {
    const { search, theme_id, category_id } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { creator: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (theme_id) {
      query = { theme_id };
    }

    if (category_id) {
      query = { category_id };
    }

    const contents = await ContentModel.find(query);

    contents.forEach((content) => {
      content.content_data = "";
    });

    res.status(200).json(contents);
  } catch (error) {
    console.log("Error getting contents", error);
    res.status(500).json({ message: "Error getting contents" });
  }
};

const UploadContent = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.user;
    const { theme_id } = req.body;

    const user = await getUserById(id);

    if (!user)
      return res
        .status(400)
        .json({ error: true, message: "User not found with this credentials" });

    if (user.role === "reader")
      return res.status(403).json({
        error: true,
        message: "You don't have permission to upload content",
      });

    req.body.creator = user?.alias;

    const theme = await ThemeModel.find({ _id: theme_id });

    if (!theme) {
      return res.status(400).json({ message: "Theme not found" });
    }

    if (req?.files?.file === undefined)
      return res.status(400).json({ message: "No file uploaded" });

    const themeCategories = theme[0].categories_id.map(
      (category: any) => category._id
    );

    const categories = await CategoryModel.find({
      _id: { $in: themeCategories },
    });

    const fileExtension = Array.isArray(req.files.file)
      ? req.files.file[0].name.split(".").pop()
      : req.files.file.name.split(".").pop();

    const fileCategory = categories.find((category) =>
      category.extensions.includes(fileExtension || "")
    );

    if (!fileCategory) {
      return res.status(400).json({ message: "File extension not allowed" });
    }

    const result = await UploadFile(req.files.file);

    req.body.content_data = result.url;
    req.body.extension = result.format;
    req.body.category_id = fileCategory._id;

    const newContent = new ContentModel(req.body);
    await newContent.save();

    res.status(201).json(newContent);
  } catch (error) {
    console.log("Error uploading content", error);
    res.status(500).json({ message: "Error uploading content" });
  }
};

export const DownloadFile = async (req: CustomRequest, res: Response) => {
  try {
    const { contentId } = req.params;

    console.log("req.params", req.params);

    const content = await ContentModel.findOne({ _id: contentId });
    const cloudinaryUrl = content?.content_data;

    const response = await axios({
      method: "GET",
      url: cloudinaryUrl,
      responseType: "stream",
    });

    // Establece los encabezados de la respuesta para que el navegador abra el diálogo de descarga
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=file.${content?.extension}`
    );
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Transmite el archivo de Cloudinary directamente al cliente
    response.data.pipe(res);
  } catch (error) {
    console.log("Error uploading content", error);
    res.status(500).json({ message: "Error downloading content" });
  }
};

export default { GetContents, UploadContent, DownloadFile };
