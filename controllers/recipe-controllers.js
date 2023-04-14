const Recipe = require("../models/recipe");
const User = require("../models/user");

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

const addView = async (request, response) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(request.params.id, { $inc: { views: 1 } }, { new: true });
        response.status(200).json(recipe);
    } catch (error) {
        handleError(response, error);
    }
};

const favoriteRecipe = async (request, response) => {
    try {
        const userId = request.body.userId;
        const recipeId = request.body.recipeId;
        const isFavorite = request.body.isFavorite;
        const responseData = {};
        if (!isFavorite) {
            responseData.user = await User.findByIdAndUpdate(userId, { $addToSet: { favoriteRecipes: recipeId } }, { new: true });
        } else {
            responseData.user = await User.findByIdAndUpdate(userId, { $pull: { favoriteRecipes: recipeId } }, { new: true });
        }
        return response.status(200).json(responseData);
    } catch (error) {
        handleError(response, error);
    }
};

const likedRecipe = async (request, response) => {
    try {
        const userId = request.body.userId;
        const recipeId = request.body.recipeId;
        const isLike = request.body.isLike;
        const responseData = {};
        if (!isLike) {
            responseData.user = await User.findByIdAndUpdate(userId, { $addToSet: { likedRecipes: recipeId } }, { new: true });
            responseData.recipe = await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: 1 } }, { new: true });
        } else {
            responseData.user = await User.findByIdAndUpdate(userId, { $pull: { likedRecipes: recipeId } }, { new: true });
            responseData.recipe = await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: -1 } }, { new: true });
        }
        return response.status(200).json(responseData);
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    getRecipe,
    insertRecipe,
    addView,
    likedRecipe,
    favoriteRecipe,
};
