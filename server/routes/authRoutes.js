import express from "express";
import {storeUserData ,loginUserData,user} from "../controllers/authControllers.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/register").post(storeUserData);
router.route("/login").post(loginUserData);
router.route("/user").get( authMiddleware , user);

export default router;