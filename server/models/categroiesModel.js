import mongoose from "mongoose";
const categroiesSchema = ({
    which : {
        type:String,
        required : true,
    },
    value : {
        type:String , 
        required : true,
    }
});

const descriptionPhotoSchema = new mongoose.Schema ({
    photo : {
        type:String,
        required : true
    }
},{
    timestamps : true
});
export const CategroiesData =  mongoose.model("categroie" , categroiesSchema);
export const DescriptionPhotoData =  mongoose.model("descriptionPhoto" , descriptionPhotoSchema);