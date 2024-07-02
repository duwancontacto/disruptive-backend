import e from "express";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  box_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BoxType",
    required: true,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  payment_id: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  payment_method: {
    type: String,
    required: false,
    enum: ["transfer", "mercadopago"],
  },

  total_price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Order", OrderSchema);
