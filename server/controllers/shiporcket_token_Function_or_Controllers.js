import axios from "axios";
import { ShiprocketToken, shiprocket_create_details } from "../models/yumi_order_id_shiproket_token_model.js";
import { Customer, Order } from "../models/buyerModel.js";
import { Product, Variant } from "../models/productModel.js";

export const setToken = async () => {
    try {

        const tokenExist = await ShiprocketToken.findOne({ _id: "ship_token" });

        const tokenAge = Math.floor((Date.now() - tokenExist.updatedAt) / 1000);
        let new_token = tokenExist.token;
        if (tokenAge > 863999) {

            const response = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login",
                {
                    "email": process.env.SHIPROCKET_EMAIL,
                    "password": process.env.SHIPROCKET_PASSWORD
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const { token } = response.data;
            new_token = token;
            await ShiprocketToken.findByIdAndUpdate("ship_token", { $set: { token } });
        }
        return new_token;
    } catch (error) {
        console.error({ error: error.message });
        throw new Error('Failed to retrieve token');
    }
}



export const create_shiprocket_order = async (req, res) => {
    try {

        const { order_number, length, breadth, height, weight } = req.body;


        await setToken();
        // Retrieve the Shiprocket token and log it for verification
        const tokenData = await ShiprocketToken.findOne({ _id: 'ship_token' });
        const token = tokenData ? tokenData.token : null;

        if (!token) {
            throw new Error('Token not found or invalid');
        }


        // get the order data and the customer data

        const OrderData = await Order.findOne({ order_number: order_number });
        const CustomerData = await Customer.findById(OrderData.customer_id);

        // Format the order date
        const date = new Date(OrderData.updatedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

        const order_items = await Promise.all(OrderData.order_items.map(async (order) => {
            const product = await Product.findById(order.product_id).select('title');
            const variant = await Variant.findById(order.variant_id).select('sku price');

            // construct the order item 
            return {
                name: product.title,
                sku: variant.sku,
                units: order.qty,
                selling_price: variant.price
            };
        }));

        // Create the order data object
        const payment_method = OrderData.payment_type == "false" ? 'COD' : 'Prepaid';
        const orderData = {
            "order_id": `${order_number}`,
            "order_date": formattedDate,
            "pickup_location": "Primary",
            "billing_customer_name": CustomerData.firstName,
            "billing_last_name": CustomerData.lastName,
            "billing_address": CustomerData.address,
            "billing_city": CustomerData.city,
            "billing_pincode": CustomerData.pincode,
            "billing_state": CustomerData.state,
            "billing_country": CustomerData.country,
            "billing_email": CustomerData.email,
            "billing_phone": CustomerData.phone,
            "shipping_is_billing": true,
            "order_items": order_items,
            "payment_method": payment_method,
            "sub_total": OrderData.total_amount,
            "length": parseFloat(length),
            "breadth": parseFloat(breadth),
            "height": parseFloat(height),
            "weight": parseFloat(weight)
        };
        // Log the order data for debugging
        // Make the API call to Shiprocket
        const newOrder = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            orderData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const Order_confirm_shiprocket = new shiprocket_create_details(newOrder.data);
        await Order_confirm_shiprocket.save();


        await Order.findOneAndUpdate({order_number : newOrder.data.channel_order_id} , {$set : {status : 'Done'}});

        

        res.json({ message: "Order successfully added to Shiprocket"});
    } catch (error) {
        // Log the error and send a response with an appropriate status code
        console.error('Error creating Shiprocket order:', error);

        if (error.response) {
            // If the error is from Shiprocket API response
            res.status(error.response.status).json({
                error: error.response.data.message || 'Shiprocket API error',
                details: error.response.data
            });
        } else {
            // Other errors (e.g., network errors, server errors)
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
};


// check the order number is exsit or not

export const order_exist = async (req, res) => {
    const { order_number } = req.params;
    const OrderData = await Order.findOne({ order_number: order_number });
    const ShiproketData = await shiprocket_create_details.findOne({ channel_order_id: order_number })
    if (!OrderData && !ShiproketData) {
        res.status(404).json({ message: "order id not found", awb: "" })
    }
    else if (OrderData && !ShiproketData) {
        res.status(201).json({ message: "order id not found", awb: "" })
    }
    else if (ShiproketData.awb_code === "") {
        res.status(202).json({ message: "order id exit but awb not", awb: "" })
    }
    else {
        res.status(203).json({ message: "order id and awb exit", awb: ShiproketData.awb_code })
    }
}

export const shiprocket_order = async (req,res)=>{
    const Orders = await shiprocket_create_details.find().select('channel_order_id status');
    if(Orders.length === 0){
       return res.status(404).json({message : "product not found"});
    }
    res.status(200).json({data : Orders});
}