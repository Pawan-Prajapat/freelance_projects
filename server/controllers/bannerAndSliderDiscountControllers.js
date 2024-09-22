import { Banner, Topslide, Discount } from "../models/bannerAndSliderDiscountModel.js";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

export const add_banner = async (req, res) => {
    try {
        // Accessing the uploaded file information

        const file = req.files['image'][0]; // Access the 'image' field
        const { redirectLink } = req.body;

        if (!file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        // Constructing the file path
        const photoPath = `/images/${file.filename}`; // Correctly access filename property

        // Creating a new description image entry in the database
        await Banner.create({
            banner: photoPath, // Save the path in the database
            link: redirectLink
        });

        res.status(200).json({ message: "Banner successfully uploaded" });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: error.message });
    }
};
export const add_discount = async (req, res) => {
    try {
        const { discoutText, discoutAmount } = req.body;
        await Discount.create({
            discoutText,
            discoutAmount
        });

        res.status(200).json({ message: "Discount successfully Added" });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: error.message });
    }
};



export const get_banner = async (req, res) => {
    try {
        const allBanner = await Banner.find({});
        if (!allBanner)
            return res.status(201).json({ message: "No banner added ", banner: [] });

        res.status(200).json({ banner: allBanner });

    } catch (error) {
        console.error("Error get the banner  ", error);
        res.status(500).json({ error: "banner get nhi ho rhe hai" });
    }
}

export const get_discount = async (req, res) => {
    try {
        const allDiscount = await Discount.find({});
        if (!allDiscount)
            return res.status(201).json({ message: "No Discount added " });
        res.status(200).json({ discount: allDiscount });

    } catch (error) {
        console.error("Error get the discount  ", error);
        res.status(500).json({ error: "dicount get nhi ho rhe hai" });
    }
}
export const get_topSlide = async (req, res) => {
    try {
        const topSlide = await Topslide.find({ _id: "top_slide" });
        if (!topSlide)
            return res.status(201).json({ message: "No top slide added " });
        res.status(200).json({ topSlide: topSlide[0].slideText });

    } catch (error) {
        console.error("Error get the top slide  ", error);
        res.status(500).json({ error: "top slide get nhi ho rhe hai" });
    }
}


// Helper to resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const delete_banner = async (req, res) => {
    try {
        const { _id } = req.body;
        const deleteBanner = await Banner.findByIdAndDelete({ _id });
        const imagePath = path.join(__dirname , '..' , 'public' , deleteBanner.banner);
        await fs.promises.unlink(imagePath);
        res.status(200).json({ message: "delete the banner successfully" });

    } catch (error) {
        console.error("Error get the banner  ", error);
        res.status(500).json({ error: "banner get nhi ho rhe hai" });
    }
}


export const update_topSlide = async (req, res) => {
    try {
        const { slideText } = req.body;
        await Topslide.findByIdAndUpdate(
            "top_slide",
            { slideText }
        );
        res.status(200).json({ message: "update the top slide" });

    } catch (error) {
        console.error("Error get the top slide  ", error);
        res.status(500).json({ error: "top slide get nhi ho rhe hai" });
    }
}

