import { Customer, Order } from "../models/buyerModel.js";
import { OrderCounter } from "../models/yumi_order_id_shiproket_token_model.js";
import { checkout } from "./paymentControllers.js";
import { Product, Variant } from "../models/productModel.js"
import moment from 'moment';

const getOrderId = async () => {
  const counter = await OrderCounter.findByIdAndUpdate(
    "order_id",
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
}

const updateOrderQty = async (add, variantsArray) => {
  try {
    for (const item of variantsArray) {
      const { variant_id, qty } = item;

      // Find the variant in the database (assuming you are using Mongoose or a similar ORM)
      const variant = await Variant.findById(variant_id);

      if (!variant) {
        throw new Error(`Variant with ID ${variant_id} not found`);
      }

      // Update the variant quantity based on the `add` flag
      if (add) {
        variant.qty += qty;  // Add the quantity
      } else {
        variant.qty -= qty;  // Subtract the quantity
        if (variant.qty < 0) {
          throw new Error(`Insufficient quantity for variant ID ${variant_id}`);
        }
      }

      // Save the updated variant back to the database
      await variant.save();
    }

    return { success: true, message: 'Quantities updated successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};


export const storeBuyerData = async (req, res) => {
  try {
    const { email, country, firstName, lastName, city, state, pincode, phone, address } = req.body.customerDetails;
    const { order_items, total_amount, payment_type } = req.body.orderDetails;
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
    const orderData = {
      order_number,
      customer_id: customer._id,
      order_items: orderItemsData,
      total_amount,
      payment_type,
      payment_status: 'pending',
      status: 'pending'
    };

    if (!payment_type) {  // COD
      const order = new Order(orderData);
      await order.save();
      await updateOrderQty(false, orderData.order_items);
      return res.status(201).json({
        success: true,
        message: 'Order created successfully with COD',
        razorpay_order_id: "no",
        order
      });
    } else {  // Razorpay
      const [razorpay_order_id, amount] = await checkout(total_amount);
      orderData.razorpay_order_id = razorpay_order_id;
      const order = new Order(orderData);
      await order.save();
      await updateOrderQty(false, orderData.order_items);
      return res.status(201).json({
        success: true,
        message: 'Order created successfully with Razorpay',
        razorpay_order_id,
        amount,
        order
      });
    }

  } catch (error) {
    console.error("Error in storeBuyerData:", error);  // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}

export const orderDataAll = async (req, res) => {
  try {
    const orders = await Order.find({});
    const ordersWithCustomerNames = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findById(order.customer_id).select('firstName lastName');
        return {
          ...order._doc,
          name: `${customer.firstName} ${customer.lastName}`
        }
      })
    )
    res.status(200).json(ordersWithCustomerNames);
  } catch (error) {
    console.error("Error in sendBuyerData:", error);  // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
}



export const customerData = async (req, res) => {
  try {
    const { order_number } = req.params;
    // Find the current order by order_number
    const current_order = await Order.findOne({ order_number });
    for (let i = 0; i < current_order.order_items.length; i++) {
      const product = await Product.findById(current_order.order_items[i].product_id).select('title');
      const variant = await Variant.findById(current_order.order_items[i].variant_id).select('price');
      current_order.order_items[i].product_id = product.title
      current_order.order_items[i].variant_id = variant.price
    };
    if (!current_order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Find the customer associated with the current order
    const customer = await Customer.findById(current_order.customer_id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    // Find all previous orders for the customer, excluding the current order, sorted by createdAt
    const prevOrders = await Order.find({
      customer_id: current_order.customer_id,
      order_number: { $ne: order_number }
    }).sort({ createdAt: -1 });


    // Map through the previous orders to get the product and variant details
    const orderDetails = await Promise.all(prevOrders.map(async (order) => {
      const items = await Promise.all(order.order_items.map(async (item) => {
        const product = await Product.findById(item.product_id).select('title');
        const variant = await Variant.findById(item.variant_id).select('sku price weight');
        if(!product){
          console.warn(`product with id ${item.product_id} not found`);
        }
        if(!variant){
          console.warn(`variant with id ${item.variant_id} not found`);
        }


        return {
          product_name: product.title,
          sku: variant.sku,
          price: variant.price,
          weight: variant.weight,
          qty: item.qty
        };
      }));
      return {
        items,
        createdAt: moment(order.createdAt).format('MMM D [at] h:mm A')
      };
    }));

    res.status(200).json({ current_order, customer, prevOrders: orderDetails });
  } catch (error) {
    console.error("Error in customerData:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};