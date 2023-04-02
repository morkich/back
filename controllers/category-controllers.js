const Category = require("../models/category");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getCategories = (request, response) => {
    Category.find()
        .sort({ title: 1 })
        .then((categories) => {
            response.status(200).json(categories);
        })
        .catch((error) => handleError(response, error));
};

const getCategory = (request, response) => {
    Category.findById(request.params.id)
        .then((category) => {
            response.status(200).json(category);
        })
        .catch((error) => handleError(response, error));
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
