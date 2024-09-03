import express from 'express';
import multer from 'multer';
import { add_banner, add_discount, get_banner, get_discount, get_topSlide, delete_banner, update_topSlide } from "../controllers/bannerAndSliderDiscountControllers.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, "banner - " + file.originalname);
    }
});

const upload = multer({ storage })

const router = express.Router();
router.route("/add_banner").post(
    upload.fields([
        { name: 'image', maxCount: 1 }
    ]),
    add_banner
);
router.route("/add_discount").post(add_discount);
router.route("/get_banner").get(get_banner);
router.route("/get_discount").get(get_discount);
router.route("/marquee").get(get_topSlide);
router.route("/delete_banner").delete(delete_banner);
router.route("/update_topSlide").patch(update_topSlide);
export default router;