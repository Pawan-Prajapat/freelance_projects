import express from 'express';
import multer from 'multer';
import { storeProductData, updateProductData, deleteProductData, getAllProductData, getSingleProductData , getAllProductHeadImage ,getImagesWithoutHeadInPath , getVariant , getVariantDetail } from "../controllers/productControllers.js";
import { add_description_image } from "../controllers/otherPhotoControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const { title, category } = req.body;
        cb(null, title + '-' + category + '-' + file.originalname);
    }
});

const upload = multer({ storage })
router.route("/product").post(
    authMiddleware,
    adminMiddleware,
    upload.array('media', 10),
    storeProductData
);

router.route("/des_media").post(
    upload.fields([
        { name: 'image', maxCount: 1 }
    ]),
    add_description_image

)

router.route("/product").patch(
    upload.fields([
        { name: 'media', maxCount: 1 }
    ]), updateProductData);
router.route("/deleteProductData").delete(deleteProductData);
router.route("/getAllProductData").get(getAllProductData);
router.route("/getSingleProductData").post(getSingleProductData);
router.route("/getAllProductHeadImage").get(getAllProductHeadImage);
router.route("/getImagesWithoutHeadInPath/:productId").get(getImagesWithoutHeadInPath);
router.route("/getVariant/:productId").get(getVariant);
router.route("/getVariantData/:variantId").get(getVariantDetail);

export default router;
