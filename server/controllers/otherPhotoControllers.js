import { DescriptionPhotoData } from "../models/categroiesModel.js";

export const add_description_image = async (req, res) => {
    try {
        // Accessing the uploaded file information

        const file = req.files['image'][0]; // Access the 'image' field
        
        if (!file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }
        
        // Constructing the file path
        const photoPath = `/images/${file.filename}`; // Correctly access filename property

        // Creating a new description image entry in the database
        await DescriptionPhotoData.create({
            photo: photoPath, // Save the path in the database
        });

        res.status(200).json({ message: "Description image successfully uploaded", url: photoPath });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: error.message });
    }
};
