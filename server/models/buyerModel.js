import mongoose from "mongoose";

const customerSchema =  new mongoose.Schema({
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
    }
},{
    timestamps:true
});


const orderSchema = new mongoose.Schema({
    order_number : {
        type : Number,
        required : true 
    },
    customer_id : {
        type : String , 
        required : true 
    },
    order_items : [{
        product_id : {type : String , required : true},
        variant_id : {type : String , required : true},
        qty : {type : Number , required : true}
    }],
    total_amount : {
        type : Number,
        required : true 
    },
    discount_amount : {
        type : Number 
    },
    discount_cupon  : {
        type : String 
    },
    payment_status : {
        type : String , 
        required : true 
    },
    payment_type : {
        type : String ,
        required : true  
    },
    razorpay_payment_id : {
        type : String,
        default : ""
    },
    razorpay_order_id : {
        type : String,
        default : ""
    },
    status : {
        type : String 
    }
},{
    timestamps : true 
});

export const Customer = mongoose.model("Customer",customerSchema);
export const Order = mongoose.model("Order",orderSchema);