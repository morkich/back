const Ingredient = require("../models/ingredient");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getIngredients = async (request, response) => {
    try {
        let ingredients = [];
        if (request.query.ids) {
            const ingredientsIds = request.query.ids.split(",");
            ingredients = await Ingredient.find({ _id: { $in: ingredientsIds } });
        } else {
            ingredients = await Ingredient.find();
        }
        response.status(200).json(ingredients);
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    getIngredients,
};
