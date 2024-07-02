import { Request, Response } from "express";
import OrderModel from "../Model/OrderModel.ts";
import CustomerModel from "../Model/CustomerModel.ts";
import BranchModel from "../Model/BranchModel.ts";

const CreateOrder = async (req: Request, res: Response) => {
  try {
    const { customer, note, box_type_id, branch_id, payment_method } = req.body;

    let findCustomer = await CustomerModel.findOne({
      email: customer.email,
    });

    if (!findCustomer) {
      findCustomer = await CustomerModel.create(customer);
    } else {
      findCustomer = await CustomerModel.findOneAndUpdate(
        findCustomer._id,
        customer
      );
    }

    const branchs = await BranchModel.findById(branch_id).populate(
      "boxes.box_type_id"
    );

    const box = branchs?.boxes.find((box) => box.box_type_id.id == box_type_id);

    if (!box) {
      return res.status(400).json({ message: "Caja no encontrada" });
    }

    if (!box.available) {
      return res.status(400).json({ message: "Caja no disponible" });
    }

    if (box.stock <= 0) {
      return res.status(400).json({ message: "Caja sin stock" });
    }

    const total_price = box.price;

    const order = await OrderModel.create({
      customer_id: findCustomer?._id,
      box_type_id,
      branch_id,
      total_price,
      note,
      payment_method,
      status: "pending",
    });

    // Update stock

    box.stock = box.stock - 1;
    await branchs?.save();

    const orderCount = await OrderModel.countDocuments({});

    res.status(200).json({
      message: "Order created",
      order,
      customer: findCustomer,
      orderCount,
    });
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

const CreateCustomer = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    let findCustomer = await CustomerModel.findOne({
      email: email,
    });

    if (findCustomer) {
      return res.status(200).json({ message: "Customer created" });
    }

    await CustomerModel.create({ email, name });

    res.status(200).json({ message: "Customer created" });
  } catch (error) {
    console.log("Error creating customer", error);
    res.status(500).json({ message: "Error creating customer" });
  }
};

export default { CreateOrder, CreateCustomer };
