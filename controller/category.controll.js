const categoryInstance = require('../services/category.service');

const createNewCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const details = {
            name,
            description
        }
        const newCat = await categoryInstance.createCategory(details);
        res.status(201).json(newCat);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

const getAllCategory = async (req, res) => {
    try {
        const allCat = await categoryInstance.findAllCategory();
        res.status(200).json(allCat);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

const getOneCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const oneCat = await categoryInstance.findOneCategory(id);
        res.status(200).json(oneCat);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const details = {
            name,
            description
        }
        const updated = await categoryInstance.updateOneCategory(id, details);
        res.status(201).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await categoryInstance.deleteOneCategory(id);
        res.status(200).json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

module.exports = { createNewCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory };