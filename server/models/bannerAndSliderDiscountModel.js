import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  banner: {
    type: String,
    required: true 
  },
  link: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// schema for top slide 
const topSliderSchema = new Schema({
    _id : {
        type : String,
        default : 'top_slide'
    },
  slideText: {
    type: String,
    required: true
  }
}, {
  timestamps: false
});


// schema for discount
const discountSchema = new Schema({
    discountText:{
      type : String,
      required : true
    },
    discountAmount:{
      type : Number,
      required : true
    },
    discountType:{
      type : String,
      required : true
    },
    discountStatus : {
      type : Boolean,
      default : true
    }
  }, {
    timestamps: false
  });
  
export const  Banner = mongoose.model('Banner', bannerSchema);
export const  Topslide = mongoose.model('Topslide', topSliderSchema);
export const  Discount = mongoose.model('Discount', discountSchema);
