import { Product, Variant } from "../models/productModel.js";
import mongoose from "mongoose";

export const storeProductData = async (req, res) => {
    try {
        const { title, description, category, subCategory, variants, media, cod, recommend } = req.body;
        const codType = (cod === 'Allow');
        recommend = recommend.map(id => mongoose.Types.ObjectId(id));
        if (title) {
            const newProduct = await Product.create({
                title,
                description,
                subCategory,
                category,
                cod: codType,
                images: media,
                recommend
            });
            if (variants) {
                const variantDocs = variants.map((variant) => ({
                    ...variant,
                    productId: newProduct._id,
                }));
                const check = await Variant.insertMany(variantDocs);
            }

        }
        res.status(200).send({ message: "product add successfully " });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the product and variants' });
    }
};


// update ka abhi karte hai 
export const updateProductData = async (req, res) => {
    try {
        const { _id, title, description, category, subCategory, variants, media, cod, recommend } = req.body;
        const codType = (cod === 'Allow');
        // Construct the update object dynamically to only include fields that are provided
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (category) updateFields.category = category;
        if (subCategory) updateFields.subCategory = subCategory;
        if (media) updateFields.images = media;
        if (cod) updateFields.cod = codType;
        if (recommend) updateFields.recommend = recommend;

        // Update the product and return the updated document
        const updatedProduct = await Product.findOneAndUpdate(
            { _id },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Handle variant updates
        if (variants && Array.isArray(variants)) {
            const updatePromises = [];
            const insertPromises = [];

            variants.forEach((variant) => {
                // Check if _id is a valid ObjectId
                const isValidObjectId = mongoose.Types.ObjectId.isValid(variant._id) && variant._id !== 'undefined';

                if (isValidObjectId) {
                    // Update existing variant
                    updatePromises.push(
                        Variant.findByIdAndUpdate(
                            variant._id,
                            {
                                $set: {
                                    sku: variant.sku,
                                    price: variant.price,
                                    qty: variant.qty,
                                    weight: variant.weight,
                                    price_off: variant.price_off
                                }
                            },
                            { new: true, runValidators: true }
                        )
                    );
                } else {
                    // Add new variant
                    if (variant._id === 'undefined') {
                        delete variant._id;
                    }
                    insertPromises.push(
                        Variant.create({
                            ...variant,
                            productId: updatedProduct._id, // Link new variants to the updated product
                        })
                    );
                }
            });

            // Wait for all updates and inserts to complete
            await Promise.all(updatePromises);
            await Promise.all(insertPromises);
        }

        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).json({ message: "Error updating product", error });
    }
}




export const deleteProductData = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedProduct = await Product.findOneAndDelete({ _id: id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Variant.deleteMany({ productId: id });

        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
export const getAllProductData = async (req, res) => {
    try {
        // Fetch all products
        const productData = await Product.find({});
        if (productData.length === 0) {
            return res.status(200).json({ message: "No product data found", data: [] });
        }

        // Iterate through each product to calculate the total quantity and find the variant with the lowest weight
        const updatedProductData = await Promise.all(productData.map(async (product) => {
            // Find all variants for the current product
            const variants = await Variant.find({ productId: product._id });

            // Calculate the total quantity from all variants
            const totalQty = variants.reduce((sum, variant) => sum + variant.qty, 0);

            let minWeightVariant;
            if (variants.length > 0) {
                // Find the variant with the lowest weight
                minWeightVariant = variants.reduce((minVariant, currentVariant) => {
                    return currentVariant.weight < minVariant.weight ? currentVariant : minVariant;
                });
            }

            // Return the product data with the total quantity and the ID of the variant with the lowest weight
            return {
                ...product.toObject(), // Convert Mongoose document to a plain object
                totalStock: totalQty,
                Variant_Id: minWeightVariant ? minWeightVariant._id : null, // Only the _id of the variant with the lowest weight
                Variant_Price: minWeightVariant ? minWeightVariant.price : null,
                Variant_price_off: minWeightVariant ? minWeightVariant.price_off : 0,
                Variant_total_price: minWeightVariant ? minWeightVariant.final_price : Variant_Price,
            };
        }));


        // Return the updated product data with quantity and variant ID information
        res.status(200).json({ message: "Product data retrieved successfully", data: updatedProductData });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
};

export const getSingleProductData = async (req, res) => {
    try {
        const { _id } = req.body;
        const productData = await Product.findById(_id);

        if (!productData) {
            return res.status(200).json({ message: "No product data found", data: {} });
        }

        const productVariant = await Variant.find({ productId: _id });

        // Combine the data into a single object
        const product = {
            _id: productData._id,
            title: productData.title,
            description: productData.description,
            category: productData.category,
            subCategory: productData.subCategory,
            cod: productData.cod,
            createdAt: productData.createdAt,
            updatedAt: productData.updatedAt,
            variants: productVariant,
            media: productData.images,
            recommend: productData.recommend
        };

        res.status(200).json({ message: "Product data retrieved successfully", data: product });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
};



export const getVariant = async (req, res) => {
    try {
        const { productId } = req.params;

        const productVariant = await Variant.find({ productId: productId });

        res.status(200).json({ message: "Product variant data retrieved successfully", variants: productVariant });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product variant data", error });
    }
};

export const getVariantDetail = async (req, res) => {
    try {
        const { variantId } = req.params;

        const VariantDetail = await Variant.find({ _id: variantId });

        res.status(200).json({ message: "Variant data retrieved successfully", variantData: VariantDetail });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Variant data", error });
    }
}



export const searchProductController = async (req, res) => {
    try {
        // Fetch all products

        const { keyword } = req.params;
        const productData = await Product.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } }
            ]
        });
        if (productData.length === 0) {
            return res.status(200).json({ message: "No product data found", data: [] });
        }

        // Iterate through each product to calculate the total quantity and find the variant with the lowest weight
        const updatedProductData = await Promise.all(productData.map(async (product) => {
            // Find all variants for the current product
            const variants = await Variant.find({ productId: product._id });

            // Calculate the total quantity from all variants
            const totalQty = variants.reduce((sum, variant) => sum + variant.qty, 0);

            let minWeightVariant;
            if (variants.length > 0) {
                // Find the variant with the lowest weight
                minWeightVariant = variants.reduce((minVariant, currentVariant) => {
                    return currentVariant.weight < minVariant.weight ? currentVariant : minVariant;
                });
            }

            // Return the product data with the total quantity and the ID of the variant with the lowest weight
            return {
                ...product.toObject(), // Convert Mongoose document to a plain object
                totalStock: totalQty,
                Variant_Id: minWeightVariant ? minWeightVariant._id : null, // Only the _id of the variant with the lowest weight
                Variant_Price: minWeightVariant ? minWeightVariant.price : null,
            };
        }));


        // Return the updated product data with quantity and variant ID information
        res.status(200).json({ message: "Product data retrieved successfully", data: updatedProductData });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
};
