import express from 'express';
import multer from 'multer';
import { storeProductData, updateProductData, deleteProductData, getAllProductData, getSingleProductData } from "../controllers/productControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage });

const router = express.Router();
router.route("/storeProductData").post(
    authMiddleware,
    adminMiddleware,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'multipleImages', maxCount: 10 }
    ]),
    storeProductData
);

router.route("/updateProductData").post(updateProductData);
router.route("/deleteProductData").post(deleteProductData);
router.route("/getAllProductData").get(getAllProductData);
router.route("/getSingleProductData").post(getSingleProductData);

export default router;
