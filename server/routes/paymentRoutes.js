import express from "express";
import {  paymentVerification } from "../controllers/paymentControllers.js";
const router = express.Router();

router.route("/paymentVerification").post( paymentVerification);
export default router;