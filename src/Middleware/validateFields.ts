import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }

  return next();
};
