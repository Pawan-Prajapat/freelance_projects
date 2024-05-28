import {Buyer} from "../models/buyerModel.js"

export const storeBuyerData = async (req,res)=>{
    try{
        const {email, country, firstName , lastName , city , state, pincode , phone,address,order_id} = req.body;

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
            order_id
        })
        res.status(200).json({message : req.body});
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