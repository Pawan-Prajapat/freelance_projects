import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/pyamentModel.js";
import { Buyer } from "../models/buyerModel.js"
export const checkout = async (req, res) => {
  const { amount, productNamesArray } = req.body;
  const options = {
    amount: Number(amount * 100),  // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  await Payment.create({
    razorpay_order_id: order.id,
    amount,
    names: productNamesArray
  })

  res.status(200).json({
    success: true,
    order,
  });
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

    await Payment.findOneAndUpdate({razorpay_order_id}, {
      $set:{
        razorpay_payment_id,razorpay_signature
      }
    })

    res.redirect(`http://localhost:5173/`)
  }
  else {
    res.status(400).json({
      success: false,
    });

  }
};

export const checkPaymentStatus = async (req, res) => {
  try {
    const userDataWithPayments = await Buyer.aggregate([
      {
        $lookup: {
          from: "payments",
          foreignField: "razorpay_order_id",
          localField: "order_id", 
          as: "payment_data"
        }
      }
    ]).exec();
    res.status(200).json(userDataWithPayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getPaymentDetails = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
  }
}

