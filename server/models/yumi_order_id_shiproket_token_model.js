import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true 
    },
    sequence_value : {
        type : Number,
        required : true 
    }
})

const shiprocket_tokenSchema = new mongoose.Schema({
    _id:{
        type : String,
        required : true
    },
    token : {
        type : String,
        required : true 
    }
} , {timestamps : true})

export const OrderCounter = mongoose.model("counter_order" , counterSchema);
export const ShiprocketToken = mongoose.model("shiprocket_token" , shiprocket_tokenSchema);