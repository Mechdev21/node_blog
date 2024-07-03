const CategoryModel = require('../models/category.model');

class CategoryService {
    async createCategory (categoryInfo) {
        const newCat = new CategoryModel (categoryInfo);
        const saved = await newCat.save();
        return saved;
    }

    async findAllCategory () {
        const allCategory = await CategoryModel.find();
        return allCategory;
    }

    async findOneCategory (id) {
        const oneCategory = await CategoryModel.findOne({ _id: id });
        return oneCategory;
    }

    async updateOneCategory (id, categoryInfo) {
        const updateOne = await CategoryModel.findOneAndUpdate({ _id: id}, categoryInfo, { new: true });
        return updateOne;
    }

    async deleteOneCategory (id) {
        const deleted = await CategoryModel.findOneAndDelete({ _id: id });
        return deleted;
    }
};

const categoryService = new CategoryService;

module.exports = categoryService;