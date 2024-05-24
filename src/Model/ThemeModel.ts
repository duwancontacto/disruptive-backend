import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  categories_id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
});

export default mongoose.model("Theme", ThemeSchema);
