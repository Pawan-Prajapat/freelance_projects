import jwt from "jsonwebtoken";
import {User} from "../models/UserModel.js"
export const authMiddleware = async (req,res,next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message : "Unauthorized HTTP , Token not provided"});
    }

    
    
    // Asuming token is in the format "Bearer <jwtToken> , Removing the "Bearear" prefix"
    
    const jwtToken = token.replace('Bearer',"").trim();
    try {
        const isVerified = jwt.verify(jwtToken , process.env.JWT_SECRET_KEY);
        const UserData = await User.findOne({email:isVerified.email}).select({
            password:0,
        });

        req.user = UserData;
        req.token = token;
        req.userId = UserData._id;
        next();
    } catch (error) {
        return res.status(401).json({message : "Unauthorized. Invalid token."});
    }

}