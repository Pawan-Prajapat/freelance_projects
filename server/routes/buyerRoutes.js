import express from "express";
import {sendBuyerData  ,storeBuyerData} from "../controllers/BuyerControllers.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {adminMiddleware} from "../middlewares/adminMiddleware.js"

const router = express.Router();
router.route("/storeBuyerData").post(authMiddleware, adminMiddleware , storeBuyerData);

export default router;