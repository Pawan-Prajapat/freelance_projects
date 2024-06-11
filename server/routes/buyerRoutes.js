import express from "express";
import {storeBuyerData} from "../controllers/BuyerControllers.js"

const router = express.Router();
router.route("/storeBuyerData").post( storeBuyerData);

export default router;