const Recipe = require("../models/recipe");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getRecipe = async (request, response) => {
    try {
        const recipe = await Recipe.findById(request.params.id);
        response.status(200).json(recipe);
    } catch (error) {
        handleError(response, error);
    }
};

const insertRecipe = (request, response) => {
    try {
        const recipe = new Recipe(request.body);
        recipe.save();
        return response.status(200).json({ message: "Рецепт создан!" });
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    getRecipe,
    insertRecipe,
};
