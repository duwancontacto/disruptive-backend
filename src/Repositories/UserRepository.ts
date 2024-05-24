import { get } from "http";
import UserModel from "../Model/UserModel.ts";

const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const getUserByAlias = async (alias: string) => {
  const user = await UserModel.findOne({ alias });
  return user;
};
const createUser = async (data: any) => {
  const user = await UserModel.create(data);
  return user;
};

export { getUserById, getUserByEmail, getUserByAlias, createUser };
