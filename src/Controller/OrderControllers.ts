import { Request, Response } from "express";
import OrderModel from "../Model/OrderModel.ts";
import CustomerModel from "../Model/CustomerModel.ts";
import BranchModel from "../Model/BranchModel.ts";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { sendAdminMail, sendPurchaseMail } from "../utils/Mail/SendMail.ts";
import BoxTypesModel from "../Model/BoxTypesModel.ts";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_SECRET_KEY || "",
});

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

    const customerResult = await CustomerModel.findOne({
      email: customer.email,
    });

    const findBox = await BoxTypesModel.findById(box_type_id);

    const payload = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      dni: customer.dni,
      price: total_price,
      branch: branchs?.name,
      boxSize: findBox?.name,
      method:
        payment_method === "mercadopago" ? "Mercado Pago" : "Transferencia",
      date: new Date().toLocaleDateString(),
      orderCount: orderCount,
    };

    let preferenceResult: any = {};
    if (payment_method === "mercadopago") {
      const preference = new Preference(client);

      preferenceResult = await preference.create({
        body: {
          external_reference: order._id.toString(),
          items: [
            {
              id: order._id.toString(),
              title: `Caja - ${findBox?.name || ""}`,
              quantity: 1,
              currency_id: "ARS",
              unit_price: total_price,
            },
          ],

          payer: {
            email: customer.email,
          },
          back_urls: {
            success: `${process.env.MERCADOPAGO_FRONTEND_URL}/orden-completada`,
          },

          notification_url: `${process.env.MERCADOPAGO_BACKEND_URL}/api/v1/orders/mercadopago_webhook`,
        },
      });

      await OrderModel.findByIdAndUpdate(order._id, {
        payment_id: preferenceResult.id,
      });
    } else {
      await sendPurchaseMail({
        email: customer.email,
        payload,
      });

      await sendAdminMail({
        payload,
      });
    }

    res.status(200).json({
      message: "Order created",
      order: order,
      preferenceResult: {
        box_id: box._id,
        id: preferenceResult?.id,
        init_point: preferenceResult?.init_point,
      },
      customer: customerResult,
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

const MercadoPagoWebhookSuccess = async (req: Request, res: Response) => {
  try {
    const { action, data } = req.body;

    if (action === "payment.created") {
      const paymentId = data.id;

      try {
        const payment = new Payment(client);
        const paymentData = await payment.get({ id: paymentId });

        const order = await OrderModel.findById(paymentData.external_reference);

        if (!order) {
          return res.status(400).send("Order not found");
        }

        await OrderModel.findByIdAndUpdate(order._id, {
          status: "completed",
        });

        const orderCount = await OrderModel.countDocuments({});

        const customer = await CustomerModel.findById(order.customer_id);

        if (!customer) {
          return res.status(400).send("Customer not found");
        }

        const findBox = await BoxTypesModel.findById(order.box_type_id);
        const branchs = await BranchModel.findById(order.branch_id);

        const payload = {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          dni: customer.dni,
          price: order.total_price,
          branch: branchs?.name,
          boxSize: findBox?.name,
          method:
            order.payment_method === "mercadopago"
              ? "Mercado Pago"
              : "Transferencia",
          date: new Date().toLocaleDateString(),
          orderCount: orderCount,
        };

        await sendPurchaseMail({
          email: customer.email,
          payload,
        });

        await sendAdminMail({
          payload,
        });

        res.status(200).send("Payment processed successfully");
      } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(400).send("Event not handled");
    }
  } catch (error) {
    console.log("Error creating customer", error);
    res.status(500).json({ message: "Error creating customer" });
  }
};

export default { CreateOrder, CreateCustomer, MercadoPagoWebhookSuccess };
