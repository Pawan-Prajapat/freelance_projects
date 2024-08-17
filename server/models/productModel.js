import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true 
  },
  subCategory: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

productSchema.index({ category: 1, title: 1 });

// schema for variant 
const variantSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  qty: { 
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  sku:{
    type:String,
    required:true
  }
}, {
  timestamps: false
});

// schema for media
const mediaSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  image:{
    type : String,
    required : true
  }
}, {
  timestamps: false
});

export const  Product = mongoose.model('Product', productSchema);
export const  Variant = mongoose.model('Variant', variantSchema);
export const  Media = mongoose.model('Media', mediaSchema);
