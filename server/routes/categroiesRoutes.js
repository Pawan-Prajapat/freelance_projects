import express from 'express';
import { storeCategroiesData,  deleteCategroiesData, getAllCategroiesData } from "../controllers/categroiesControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"


const router = express.Router();
router.route("/storeCategroiesData").post(authMiddleware, adminMiddleware, storeCategroiesData);
router.route("/deleteCategroiesData").post(deleteCategroiesData);
router.route("/getAllCategroiesData").get(getAllCategroiesData);
export default router;