import express from 'express';
import { siteMap } from "../controllers/productControllers.js";

const router = express.Router();

router.route('/sitemap.xml').get(
    siteMap
);

router.get('/robots.txt', (req, res) => {
    const content = `User-agent: *
Disallow: /admin
Allow: /

Sitemap: https://api.hennakart.com/sitemap.xml
`;
    res.type('text/plain');
    res.send(content);
});

export default router;