import express from 'express';
import multer from 'multer';
import { storeProductData, updateProductData, deleteProductData, getAllProductData, getSingleProductData, getVariant, getVariantDetail, searchProductController } from "../controllers/productControllers.js";
import { add_description_image, get_all_description_images } from "../controllers/otherPhotoControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage })
router.route("/product").post(
    authMiddleware,
    adminMiddleware,
    upload.none(),
    storeProductData
);

router.route("/upload_images").post(
    upload.array('images', 10), // Use 'array' to upload multiple files, limit to 10 images
    add_description_image
);

router.route("/all_images").get(
    get_all_description_images
)

router.route("/product").patch(
    authMiddleware,
    adminMiddleware,
    upload.none(), updateProductData
);
router.route("/deleteProductData").delete(
    authMiddleware,
    adminMiddleware,
    upload.none(),
    deleteProductData
);
router.route("/getAllProductData").get(getAllProductData);
router.route("/getSingleProductData").post(getSingleProductData);
router.route("/getVariant/:productId").get(getVariant);
router.route("/getVariantData/:variantId").get(getVariantDetail);
router.route("/searchProductController/:keyword").get(searchProductController);

export default router;
