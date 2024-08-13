import {Buyer} from "../models/buyerModel.js"
import {OrderCounter} from "../models/yumi_order_id_shiproket_token_model.js";

const getOrderId = async () =>{
    const counter = await OrderCounter.findByIdAndUpdate(
        "order_id",
        {$inc : {sequence_value : 1}},
        {new : true , upsert : true}
    );
    return counter.sequence_value;
}


export const storeBuyerData = async (req,res)=>{
    try{
        const {email, country, firstName , lastName , city , state, pincode , phone,address , razorpay_order_id} = req.body;
        const order_id = await getOrderId();
        await Buyer.create({
            email,
            country, 
            firstName,
            lastName,
            city,
            state, 
            pincode,
            phone,
            address,
            order_id,
            razorpay_order_id
        })
        res.status(200).json({message : "order created successfully"});
    }
    catch(error){
        res.status(400).json("internal sever error")
    }
}

export const sendBuyerData = async(req,res) => {
  try{
    const buyers = await Buyer.find({});
    res.status(200).json(buyers);
  }
  catch(error){
    res.status(400).json("Internal server error"); 
  }
}