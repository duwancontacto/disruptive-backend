import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  getUserByEmail,
  createUser,
  getUserByAlias,
  getUserById,
} from "../Repositories/UserRepository.ts";
import { CustomRequest } from "../Types/CustomRequest.ts";

const GetProfileUser = async (req: CustomRequest, res: Response) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not found with this credentials",
      });
    }

    user.password = "";

    res.status(200).json({
      message: "User found successfully!",
      user,
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({
      error: true,
      message: "Error when trying to get the user",
    });
  }
};

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "User not found with this credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: "User not found with this credentials",
      });
    }

    user.password = "";

    const token = jwt.sign(
      { id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "User logged in successfully!",
      token,
      user,
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({
      error: true,
      message: "Error when trying to login the user",
    });
  }
};

const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password, alias, role } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(400).json({
        error: true,
        message: "User already exists with this email",
      });
    }

    const userAlias = await getUserByAlias(alias);

    if (userAlias) {
      return res.status(400).json({
        error: true,
        message: "User already exists with this alias",
      });
    }

    const userPayload = {
      email,
      password,
      alias,
      role,
    };

    const salt = await bcrypt.genSalt(10);
    userPayload.password = await bcrypt.hash(password, salt);

    const newUser = await createUser(userPayload);
    newUser.password = "";

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JSON_WEB_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "User register successfully!",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({
      error: true,
      message: "Error when trying to register the user",
    });
  }
};

export default { GetProfileUser, RegisterUser, LoginUser };
