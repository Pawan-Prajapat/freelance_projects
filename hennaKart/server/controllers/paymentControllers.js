import { instance } from "../server.js";
import crypto from "crypto";
import { config } from 'dotenv';
import { Customer, Order } from "../models/buyerModel.js";
import {updateOrderQty , getOrderId} from "./BuyerControllers.js";

config({ path: "./config/config.env" });

export const checkout = async (req , res) => {
  const {amount} = req.body;
  const options = {
    amount: Number(amount * 100),  // amount in the smallest currency unit
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  res.status(200).json({order_id : order.id, order_amount: options.amount});
};


export const paymentVerification = async (req, res) => {

  try {
    
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const { email, country, firstName, lastName, city, state, pincode, phone, address } = req.body.customerDetails;
    const { order_items, total_amount, payment_type, discount_amount, discount_cupon } = req.body.orderDetails;

    // Regex patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const textPattern = /^[A-Za-z\s]+$/;
    const pincodePattern = /^\d{6}$/;
    const phonePattern = /^\d{10}$/;

    if (!emailPattern.test(email))
      return res.status(400).json({ error: "Invalid Email" });
    if (!textPattern.test(firstName) && !textPattern.test(lastName))
      return res.status(400).json({ error: "Invalid Name" });
    if (!pincodePattern.test(pincode))
      return res.status(400).json({ error: "Invalid Pincode" });
    if (!phonePattern.test(phone))
      return res.status(400).json({ error: "Invalid Phone Number" });

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', instance.key_secret)
      .update(body.toString())
      .digest('hex');
      const isAuthentic = expectedSignature === razorpay_signature;
      if (isAuthentic) {
        // databse comes here 
      
      
      let customer = await Customer.findOne({ email });
      if (!customer) {
        customer = await Customer.create({
          email,
          country,
          firstName,
          lastName,
          city,
          state,
          pincode,
          phone,
          address
        });
      }
      const orderItemsData = order_items.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id,
        qty: item.qty
      }));

      const order_number = await getOrderId();
      const dis_amount = Number(discount_amount.toFixed(2));
      const orderData = {
        order_number,
        customer_id: customer._id,
        order_items: orderItemsData,
        total_amount,
        payment_type,
        payment_status: 'prepaid',
        status: 'pending',
        discount_amount: dis_amount,
        discount_cupon
      };

      const order = new Order(orderData);
      await order.save();
      await updateOrderQty(false, orderData.order_items);
      return res.status(201).json({success: true , order });
      // res.redirect(process.env.FRONT_SITE + "/congratulation" + `/${order.order_number}`);
    }
    else {
      res.status(400).json({
        success: false,
      });
    }
  }
  catch(err){
    res.status(500).json({message : "server error "});
  }
};
