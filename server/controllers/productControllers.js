import { ProductData } from "../models/productModel.js";

export const storeProductData = async (req, res) => {
    try {
        const { name, price, subCategroies,  categroies, qyt, description } = req.body;
        // console.log(req.body , " pawan controllers");
        const image = req.file.path.replace('public', "");

        const id = name.replace(/\s/g, '') + subCategroies + categroies;
        // Check if an product with the same ID already exists
        const existingProduct = await ProductData.findOne({ id });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with the same ID already exists" });
        }

        await ProductData.create({
            id,
            name,
            price,
            subCategroies,
            image,
            categroies,
            qyt,
            description,
        })
        res.status(200).json({ message: req.body });
    } catch (error) {
        res.status(400).json(error)
    }
}


export const updateProductData = async (req, res) => {
    try {
        const { _id, name, price, subCategroies, image, categroies, qyt, description } = req.body;
        const id = name.replace(/\s/g, '') + subCategroies + categroies;
        const updatedProduct = await ProductData.findOneAndUpdate(
            { _id },
            {
                id,
                name,
                price,
                subCategroies,
                image,
                categroies,
                qyt,
                description,
            },
            { new: true }
        );
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
}

export const deleteProductData = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedProduct = await ProductData.findOneAndDelete({ id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
}

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
        const {_id} = req.body
        const productData = await ProductData.findById(_id);
        if (productData.length === 0) {
            return res.status(200).json({ message: "No product data found", data: [] });
        }
        res.status(200).json({ message: "Product data retrieved successfully", data: productData });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
}