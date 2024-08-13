import { ProductData } from "../models/productModel.js";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

export const storeProductData = async (req, res) => {
    try {
        const { name, price, subCategroies, categroies, qty, description } = req.body;
        const image = req.files.image[0].path.replace('public', "");
        const multipleImages = req.files.multipleImages.map(file => file.path.replace('public', ""));

        // sku add karna hai usi se identify hoga

        // Check if a product with the same ID already exists
        const existingProduct = await ProductData.findOne({ id });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with the same ID already exists" });
        }

        await ProductData.create({
            sku,
            name,
            price,
            subCategroies,
            image,
            multipleImages,
            categroies,
            qty,
            description,
        });
        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error storing product data:", error.message);
        res.status(500).json({ error: error.message });
    }
};




export const updateProductData = async (req, res) => {
    try {
        const { _id, name, price, subCategroies, categroies, qty, description } = req.body;
        const id = name.replace(/\s/g, '') + subCategroies + categroies;
        const updatedProduct = await ProductData.findOneAndUpdate(
            { _id },
            {
                id,
                name,
                price,
                subCategroies,
                categroies,
                qty,
                description,
            },
            { new: true }
        );
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
}
// Helper to resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteProductData = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedProduct = await ProductData.findOneAndDelete({ id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const allImages = [deletedProduct.image, ...deletedProduct.multipleImages];
        for (const image of allImages) {
            const imagePath = path.join(__dirname, '..', 'public', image);

            try {
                await fs.promises.unlink(imagePath);
                console.log("Image deleted successfully");
            } catch (error) {
                console.error(`Error deleting image: ${error}`);
            }
        }

        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
export const getAllProductData = async (req, res) => {
    try {
        const productData = await ProductData.find({});
        if (productData.length === 0) {
            return res.status(200).json({ message: "No product data found", data: [] });
        }
        res.status(200).json({ message: "Product data retrieved successfully", data: productData });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
}
export const getSingleProductData = async (req, res) => {
    try {
        const { _id } = req.body
        const productData = await ProductData.findById(_id);
        if (productData.length === 0) {
            return res.status(200).json({ message: "No product data found", data: [] });
        }
        res.status(200).json({ message: "Product data retrieved successfully", data: productData });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
}