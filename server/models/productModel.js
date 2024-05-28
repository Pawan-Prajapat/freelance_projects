import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subCategroies: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categroies: {
    type: String,
    required: true,
  },
  qyt: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});



export const ProductData = mongoose.model("Product", productSchema);
