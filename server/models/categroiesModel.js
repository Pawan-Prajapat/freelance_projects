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

export const CategroiesData =  mongoose.model("categroie" , categroiesSchema);