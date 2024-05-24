import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  alias: string;
  email: string;
  password: string;
  rolePermissions: "creator" | "reader";
}
const UserSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["creator", "reader"],
    default: "reader",
  },
});

export default mongoose.model("User", UserSchema);
