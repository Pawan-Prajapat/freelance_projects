import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: [{
    type: String
  }],
  subCategory: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  cod: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String
  }],
  recommend: [{
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }]
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
  price_off: {
    type: Number,
    default: 0
  },
  final_price: {
    type: Number
  },
  qty: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    required: true
  }
}, {
  timestamps: false
});

variantSchema.pre('save', function (next) {
  if (!this.final_price) {
    this.final_price = (this.price - (this.price * this.price_off / 100)).toFixed(2);
  }
  next();
});

variantSchema.pre('findOneAndUpdate', function (next) {
  let update = this.getUpdate();

  // Handle updates with $set operator
  if (update.$set) {
    update = update.$set;
  }

  // Check if price or price_off is being updated
  if (update.price && update.price_off !== undefined) {
    update.final_price = (update.price - (update.price * update.price_off / 100)).toFixed(2);
  } else if (update.price) {
    update.final_price = (update.price - (update.price * ((update.price_off !== undefined) ? update.price_off : 0) / 100)).toFixed(2);
  }

  next();
});



export const Product = mongoose.model('Product', productSchema);
export const Variant = mongoose.model('Variant', variantSchema);
