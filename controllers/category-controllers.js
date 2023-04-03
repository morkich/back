const Category = require("../models/category");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getSelectedFieldsByRequest = (request) => {
    return request.query.fields
        ? request.query.fields.replaceAll(",", " ")
        : "";
};

const getCategories = async (request, response) => {
    try {
        const selectedFields = getSelectedFieldsByRequest(request);
        const categories = await Category.find()
            .sort({ title: 1 })
            .select(selectedFields);
        return response.status(200).json(categories);
    } catch (error) {
        handleError(response, error);
    }
};

const getCategory = async (request, response) => {
    const selectedFields = getSelectedFieldsByRequest(request);
    try {
        const category = await Category.findById(request.params.id).select(
            selectedFields
        );
        response.status(200).json(category);
    } catch (error) {
        handleError(response, error);
    }
};

const deleteCategory = (request, response) => {
    Category.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(200).json(result);
        })
        .catch((error) => handleError(response, error));
};

const insertCategory = (request, response) => {
    const category = new Category(request.body);
    category
        .save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => handleError(response, error));
};

const updateCategory = (request, response) => {
    Category.findByIdAndUpdate(request.params.id, request.body)
        .then((result) => {
            response.status(200).json(result);
        })
        .catch((error) => handleError(response, error));
};

module.exports = {
    getCategories,
    getCategory,
    deleteCategory,
    insertCategory,
    updateCategory,
};
