import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qyt: {
        type: String,
        required: true
    }
});

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        default: null
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    }
});

export const Payment = mongoose.model("Payment", paymentSchema);
