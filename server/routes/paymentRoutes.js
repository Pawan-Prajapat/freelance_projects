import express from "express";
import {  paymentVerification , checkout } from "../controllers/paymentControllers.js";
const router = express.Router();

router.route("/paymentVerification").post( paymentVerification);
router.route("/checkout").post( checkout);
export default router;