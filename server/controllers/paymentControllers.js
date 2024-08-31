import { instance } from "../server.js";
import crypto from "crypto";
import { config } from 'dotenv';
import { Order } from "../models/buyerModel.js";

config({ path: "./config/config.env" });

export const checkout = async (amount) => {
  const options = {
    amount: Number(amount * 100),  // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  return [order.id,options.amount];
};


export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', instance.key_secret)
    .update(body.toString())
    .digest('hex');
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    // databse comes here 

    await Order.findOneAndUpdate({ razorpay_order_id }, {
      $set: {
        payment_status: 'paid',
        razorpay_payment_id
      }
    })
    res.redirect(process.env.FRONT_SITE + "/congratulation");
  }
  else {
    res.status(400).json({
      success: false,
    });

  }
};
