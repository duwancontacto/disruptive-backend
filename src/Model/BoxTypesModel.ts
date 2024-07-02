import mongoose from "mongoose";

const BoxTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  robotic: {
    type: Boolean,
    required: false,
    default: false,
  },

  primary_image: {
    type: String,
  },
});

export default mongoose.model("BoxType", BoxTypeSchema);
