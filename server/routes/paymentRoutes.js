import express from "express";
import {  paymentVerification } from "../controllers/paymentControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.route("/paymentVerification").post( authMiddleware,  adminMiddleware, paymentVerification);
export default router;