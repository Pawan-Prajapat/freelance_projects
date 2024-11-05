import { Customer, Order } from "../models/buyerModel.js";
import { OrderCounter, shiprocket_create_details } from "../models/yumi_order_id_shiproket_token_model.js";
import { config } from 'dotenv';
import { Product, Variant } from "../models/productModel.js"
import moment from 'moment';

config({ path: "./config/config.env" });

export const getOrderId = async () => {
  const counter = await OrderCounter.findByIdAndUpdate(
    "order_id",
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
}

export const updateOrderQty = async (add, variantsArray) => {
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
  // store data payment varification me bhi hai ise optimize krna hai 
  try {
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
      payment_status: 'pending',
      status: 'pending',
      discount_amount: dis_amount,
      discount_cupon
    };


    // if (!payment_type) {  // COD
    const order = new Order(orderData);
    await order.save();
    await updateOrderQty(false, orderData.order_items);
    return res.status(201).json({success: true , order });
    //   message: 'Order created successfully with COD',
    //   razorpay_order_id: "no",
    //   
    //

    // res.redirect(process.env.FRONT_SITE + "/congratulation" + `/${order.order_number}`);
    // }
    //  else {  // Razorpay

    //   const [razorpay_order_id, amount] = await checkout(total_amount - dis_amount);
    //   orderData.razorpay_order_id = razorpay_order_id;
    //   const order = new Order(orderData);
    //   await order.save();
    //   await updateOrderQty(false, orderData.order_items);
    //   return res.status(201).json({
    //     success: true,
    //     message: 'Order created successfully with Razorpay',
    //     razorpay_order_id,
    //     amount,
    //     order
    //   });
    // }

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

        // for show the previous shiping products
        // const ship_order = await shiprocket_create_details.find({channel_order_id : order.order_number.toString()}).select('status');
        return {
          ...order._doc,
          name: `${customer?.firstName} ${customer?.lastName}`,
          // status : ship_order.length>0 ? 'Done' : 'Pending'  
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

    if (!current_order) {
      return res.status(404).json({ message: 'Order not found' });
    }


    // Step 2: Modify the JSON data
    const modified_order = {
      _id: current_order._id,
      order_number: current_order.order_number,
      customer_id: current_order.customer_id,
      order_items: [],
      total_amount: current_order.total_amount,
      discount_amount: current_order.discount_amount,
      discount_cupon: current_order.discount_cupon,
      payment_status: current_order.payment_status,
      payment_type: current_order.payment_type,
      razorpay_payment_id: current_order.razorpay_payment_id,
      razorpay_order_id: current_order.razorpay_order_id,
      status: current_order.status,
      createdAt: current_order.createdAt,
      updatedAt: current_order.updatedAt,
    };

    for (let i = 0; i < current_order.order_items.length; i++) {
      const product_id = current_order.order_items[i].product_id; // This is a string in your case
      const variant_id = current_order.order_items[i].variant_id;
      const qty = current_order.order_items[i].qty;

      // Find the product by title if product_id is a string, else find by ObjectId
      const product = await Product.findById({ _id: product_id });
      const variant = await Variant.findById(variant_id);

      modified_order.order_items.push({
        product_name: product ? product.title : 'Unknown Product', // Fallback if product is not found
        variant_price: variant ? variant.price : 0, // Fallback if variant is not found
        variant_weight: variant ? variant.weight : 0, // Fallback if variant is not found
        qty: qty
      });
    };

    // Find the customer associated with the current order
    const customer = await Customer.findById(modified_order.customer_id);
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
        if (!product) {
          console.warn(`product with id ${item.product_id} not found`);
        }
        if (!variant) {
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

    res.status(200).json({ modified_order, customer, prevOrders: orderDetails });
  } catch (error) {
    console.error("Error in customerData:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};