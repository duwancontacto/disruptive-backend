import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Types/CustomRequest.ts";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    try {
      const token = authHeader;
      const user = jwt.verify(
        token,
        process.env.JSON_WEB_TOKEN_SECRET as string
      );
      (req as CustomRequest).user = user;
    } catch (error) {
      return res
        .status(403)
        .json({ error: true, data: "Error in the authentication" });
    }
  } else {
    return res
      .status(403)
      .json({ error: true, data: "Error in the authentication" });
  }
  return next();
};
