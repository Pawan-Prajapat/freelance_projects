import express from "express";
import { checkout , paymentVerification,checkPaymentStatus , getPaymentDetails } from "../controllers/paymentControllers.js";
const router = express.Router();
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {adminMiddleware} from "../middlewares/adminMiddleware.js"

router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification); 
router.route("/checkPaymentStatus").get(authMiddleware , adminMiddleware , checkPaymentStatus); 
router.route("/getPaymentDetails").get(authMiddleware , adminMiddleware ,getPaymentDetails);  

export default router;