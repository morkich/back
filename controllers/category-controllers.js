const Category = require("../models/category");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getSelectedFieldsByRequest = (request) => {
    return request.query.fields ? request.query.fields.replaceAll(",", " ") : "";
};

const getCategories = async (request, response) => {
    try {
        let categories = [];
        switch (true) {
            case request.query.ids:
                const categoriesIds = request.query.ids.split(",");
                categories = await Category.find({ _id: { $in: categoriesIds } });
                break;
            case request.query.fields:
                const selectedFields = getSelectedFieldsByRequest(request);
                categories = await Category.find().sort({ title: 1 }).select(selectedFields);
                break;
            default:
                categories = await Category.find().sort({ title: 1 });
                break;
        }
        return response.status(200).json(categories);
    } catch (error) {
        handleError(response, error);
    }
};

const getCategory = async (request, response) => {
    const selectedFields = getSelectedFieldsByRequest(request);
    try {
        const category = await Category.findById(request.params.id).select(selectedFields);
        response.status(200).json(category);
    } catch (error) {
        handleError(response, error);
    }
};

const deleteCategory = async (request, response) => {
    try {
        const result = await Category.findByIdAndDelete(request.params.id);
        return response.status(200).json(result);
    } catch (error) {
        handleError(response, error);
    }
};

const insertCategory = async (request, response) => {
    try {
        const category = new Category(request.body);
        category.save();
        return response.status(201).json({ message: "Категория добавлена!" });
    } catch (error) {
        handleError(response, error);
    }
};

const updateCategory = async (request, response) => {
    try {
        const category = await Category.findByIdAndUpdate(request.params.id, request.body);
        return response.status(200).json(category);
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    getCategories,
    getCategory,
    deleteCategory,
    insertCategory,
    updateCategory,
};
