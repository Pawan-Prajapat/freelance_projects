import express from 'express';
import { siteMap } from "../controllers/productControllers.js";

const router = express.Router();

router.route('/sitemap').get(
    siteMap
);

export default router;