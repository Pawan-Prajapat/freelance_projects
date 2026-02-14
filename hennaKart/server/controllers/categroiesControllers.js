import { CategroiesData } from "../models/categroiesModel.js";

export const storeCategroiesData = async (req, res) => {
    try {
        const { which , value } = req.body;
        const existingCategry = await CategroiesData.findOne({ value });
        if (existingCategry) {
            if(existingCategry.which  === which){
                return res.status(400).json({ message: "Categry already exists" });
            }
        }

        await CategroiesData.create({
            which,
            value     
        })
        res.status(200).json({ message: req.body });
    } catch (error) {
        res.status(400).json(error)
    }
}



export const deleteCategroiesData = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedCategry = await CategroiesData.findOneAndDelete({ _id });
        if (!deletedCategry) {
            return res.status(404).json({ message: "Categry not found" });
        }
        res.status(200).json({ message: "Categry deleted successfully", data: deletedCategry });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Categry", error });
    }
}

export const getAllCategroiesData = async (req, res) => {
    try {
        const CategryData = await CategroiesData.find({});
        if (CategryData.length === 0) {
            return res.status(200).json({ message: "No Categry data found", data: [] });
        }
        res.status(200).json({ message: "Categry data retrieved successfully", data: CategryData });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Categry data", error });
    }
}