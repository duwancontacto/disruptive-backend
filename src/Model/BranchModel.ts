import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BranchCategory",
    default: null,
  },
  details: [
    {
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  robotic: {
    type: Boolean,
    required: false,
    default: false,
  },
  primary_image: {
    type: String,
  },

  boxes: {
    type: [
      {
        box_type_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BoxType",
          required: true,
        },
        available: {
          type: Boolean,
        },
        stock: {
          type: Number,
          required: true,
        },

        descriptions: {
          type: [String],
          required: true,
        },
        old_price: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    required: true,
  },
});

export default mongoose.model("Branch", BranchSchema);
