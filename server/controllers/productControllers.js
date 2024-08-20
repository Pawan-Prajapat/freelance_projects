import { Product, Variant, Media } from "../models/productModel.js";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

export const storeProductData = async (req, res) => {
    try {
        const { title, description, category, subCategory, variants } = req.body;
        const mediaFiles = req.files;
        if (title) {
            const newProduct = await Product.create({
                title,
                description,
                subCategory,
                category
            });
            if (variants) {
                const variantDocs = variants.map((variant) => ({
                    ...variant,
                    productId: newProduct._id,
                }));
                const check = await Variant.insertMany(variantDocs);
            }
            if (mediaFiles) {
                const mediaDocs = mediaFiles.map((file) => ({
                    image: `/images/${file.filename}`,
                    productId: newProduct._id
                }));
                const check = await Media.insertMany(mediaDocs);
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
        const { _id, title, description, category, subCategory, variants } = req.body;
        // Construct the update object dynamically to only include fields that are provided
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (category) updateFields.category = category;
        if (subCategory) updateFields.subCategory = subCategory;

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
            const variantPromises = variants.map(async (variant) => {
                if (variant._id) {
                    const pawan = await Variant.find({ _id: variant._id });
                    // Update existing variant
                    return Variant.findByIdAndUpdate(
                        variant._id,
                        {
                            $set: {
                                sku: variant.sku,
                                price: variant.price,
                                qty: variant.qty,
                                weight: variant.weight
                            }
                        },
                        { new: true, runValidators: true }
                    );
                }
            });

            const updatedVariants = await Promise.all(variantPromises);
        }

        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).json({ message: "Error updating product", error });
    }
};



// Helper to resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteProductData = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedProduct = await Product.findOneAndDelete({ _id: id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const getImages = await Media.find({ productId: id });
        await Media.deleteMany({ productId: id });

        for (const media of getImages) {
            const imagePath = path.join(__dirname, '..', media.image);

            try {
                await fs.promises.unlink(imagePath);
                console.log("Image deleted successfully");
            } catch (error) {
                console.error(`Error deleting image: ${error}`);
            }
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
        const productMedia = await Media.find({ productId: _id });

        // Combine the data into a single object
        const product = {
            _id: productData._id,
            title: productData.title,
            description: productData.description,
            category: productData.category,
            subCategory: productData.subCategory,
            createdAt: productData.createdAt,
            updatedAt: productData.updatedAt,
            variants: productVariant,
            media: productMedia
        };

        res.status(200).json({ message: "Product data retrieved successfully", data: product });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product data", error });
    }
};

export const getAllProductHeadImage = async (req, res) => {
    try {
        const imageWithHead = await Media.find({ image: { $regex: /head/i } });
        if (imageWithHead.length === 0) {
            return res.status(200).json({ message: "No images found with 'head' in their path", data: [] });
        }
        res.status(200).json({ message: "Images with 'head' in their path retrieved successfully", data: imageWithHead });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving  images ", error });
    }
}

export const getImagesWithoutHeadInPath = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find images for the given productId that do not have "head" in their path (case-insensitive)
        const imagesWithoutHead = await Media.find({
            productId,
            image: { $not: { $regex: /head/i } }
        }).select('image -_id'); // Select only the image field and exclude the _id field

        // Extract the image paths into an array
        const imageArray = imagesWithoutHead.map(imageDoc => imageDoc.image);

        // Return the array of image paths directly
        return res.status(200).json(imageArray);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving images", error });
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

export const getVariantDetail = async (req,res) => {
    try {
        const { variantId } = req.params;

        const VariantDetail = await Variant.find({ _id: variantId });

        res.status(200).json({ message: "Variant data retrieved successfully", variantData: VariantDetail });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Variant data", error });
    }
}