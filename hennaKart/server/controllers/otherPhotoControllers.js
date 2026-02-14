import { DescriptionPhotoData } from "../models/categroiesModel.js";

export const add_description_image = async (req, res) => {
    try {
        const files = req.files; // Access all uploaded files
        
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No image files uploaded' });
        }

        const photoPaths = files.map(file => `/images/${file.filename}`); // Create paths for each file

        // Insert each image into the database
        await Promise.all(photoPaths.map(photo => 
            DescriptionPhotoData.create({
                photo, // Save the path in the database
            })
        ));

        res.status(200).json({ message: "Description images successfully uploaded"});
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ error: error.message });
    }
};

export const get_all_description_images = async (req, res) => {
    try {
        const images = await DescriptionPhotoData.find().sort({createdAt : -1}); // Fetch all image data

        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found' });
        }

        res.status(200).json({ images });
    } catch (error) {
        console.error("Error retrieving images:", error);
        res.status(500).json({ error: error.message });
    }
};
