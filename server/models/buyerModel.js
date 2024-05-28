import mongoose from "mongoose";

const buyerSchema =  new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    pincode:{
        type:Number,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    order_id:{
        type:String
    }
});

export const Buyer = mongoose.model("Buyer",buyerSchema);