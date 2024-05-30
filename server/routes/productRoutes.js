import express from 'express';
import { storeProductData, updateProductData, deleteProductData, getAllProductData, getSingleProductData } from "../controllers/productControllers.js";
import multer from 'multer';
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage })

const router = express.Router();
router.route("/storeProductData").post(authMiddleware, adminMiddleware, upload.single('image'), storeProductData);
router.route("/updateProductData").post(updateProductData);
router.route("/deleteProductData").post(deleteProductData);
router.route("/getAllProductData").get(getAllProductData);
router.route("/getSingleProductData").post(getSingleProductData);
export default router;