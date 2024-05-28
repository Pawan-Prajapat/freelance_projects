import { User } from "../models/UserModel.js"
import bcrypt from "bcryptjs";
export const storeUserData = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(200).json("user already exist ");
        }

        const user = await User.create({
            username,
            email,
            phone,
            password
        })
        res.status(201).json({ message: "registeration sucessfull", token: await user.generateToken(), userId: user._id.toString() });
    } catch (error) {
        res.status(400).json("internal server error");
    }
}

export const loginUserData = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json("Invalid email or password");
        }
        const user = await bcrypt.compare(password, userExist.password);

        if (user) {
            res.status(200).json({ message: "Login Successful", token: await userExist.generateToken(), userId: userExist._id.toString() });
        }
        else {
            return res.status(401).json("Invalid email or password");
        }
    } catch (error) {
        res.status(400).json("internal server error ");
    }
}

export const user = async (req,res) =>{
    try {
        const userData = req.user;
        return res.status(200).json({msg : userData})
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}