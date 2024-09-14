import express from "express";
import { storeBuyerData, customerData, orderDataAll } from "../controllers/BuyerControllers.js"
import { create_shiprocket_order } from "../controllers/shiporcket_token_Function_or_Controllers.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
const router = express.Router();
router.route("/storeBuyerData").post(storeBuyerData);
router.route("/customerData/:order_number").get(authMiddleware, adminMiddleware,customerData);
router.route("/fullfilment").post(authMiddleware, adminMiddleware,create_shiprocket_order);
router.route("/orderData").get(authMiddleware, adminMiddleware, orderDataAll);

export default router;