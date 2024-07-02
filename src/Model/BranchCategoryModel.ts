import mongoose from "mongoose";

const BranchCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("BranchCategory", BranchCategorySchema);
