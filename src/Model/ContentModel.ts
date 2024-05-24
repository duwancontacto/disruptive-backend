import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  content_data: {
    type: String,
    required: true,
  },
  theme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model("Content", ContentSchema);
