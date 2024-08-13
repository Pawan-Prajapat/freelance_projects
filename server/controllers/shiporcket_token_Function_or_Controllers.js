import axios from "axios";
import { ShiprocketToken } from "../models/yumi_order_id_shiproket_token_model.js";
import { Buyer } from "../models/buyerModel.js";

export const setToken = async () => {
    try {

        const tokenExist = await ShiprocketToken.findOne({ _id: "ship_token" });

        const tokenAge = Math.floor((Date.now() - tokenExist.updatedAt) / 1000);
        let new_token  = tokenExist.token;
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



export const create_shiprocket_order = async (buyer_razorpay_order_id) => {
    try {
        // Retrieve the Shiprocket token and log it for verification
        const tokenData = await ShiprocketToken.findOne({ _id: 'ship_token' });
        const token = tokenData ? tokenData.token : null;

        if (!token) {
            throw new Error('Token not found or invalid');
        }

        console.log('Shiprocket Token:', token);  // Log the token to ensure it is correct

        // Retrieve the buyer data
        const buyerData = await Buyer.findOne({ razorpay_order_id: buyer_razorpay_order_id });

        if (!buyerData) {
            throw new Error('Buyer data not found');
        }

        // Format the order date
        const date = new Date(buyerData.updatedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

        // Create the order data object
        const orderData = {
            "order_id": "224-447",
            "order_date": "2019-07-24 11:11",
            "pickup_location": "BERA MAYLAT SOJAT CITY, Pali, Rajasthan, India, 306104",
            "channel_id": "",
            "comment": "Reseller: M/s Goku",
            "billing_customer_name": "Naruto",
            "billing_last_name": "Uzumaki",
            "billing_address": "House 221B, Leaf Village",
            "billing_address_2": "Near Hokage House",
            "billing_city": "New Delhi",
            "billing_pincode": "110002",
            "billing_state": "Delhi",
            "billing_country": "India",
            "billing_email": "naruto@uzumaki.com",
            "billing_phone": "9876543210",
            "shipping_is_billing": true,
            "order_items": [
                {
                    "name": "Kunai",
                    "sku": "chakra123",
                    "units": 10,
                    "selling_price": "900",
                    "discount": "",
                    "tax": "",
                    "hsn": 441122
                }
            ],
            "payment_method": "Prepaid",
            "shipping_charges": 0,
            "giftwrap_charges": 0,
            "transaction_charges": 0,
            "total_discount": 0,
            "sub_total": 9000,
            "length": 10,
            "breadth": 15,
            "height": 20,
            "weight": 2.5
        };

        // Log the order data for debugging
        console.log('Order Data:', orderData);

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

        return newOrder.data;
    } catch (error) {
        console.error({ error: error.message });
        throw new Error('Failed to create the Shiprocket order');
    }
};