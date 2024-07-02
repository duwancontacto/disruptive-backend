import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Customer", CustomerSchema);
