const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    recipeName: {
        type: String,
        require: true,
        unique: true,
    },
    image: String,
    beforeText: String,
    afterText: String,
    steps: [
        {
            stepImage: String,
            stepText: String,
            stepIngredients: [
                {
                    ingredientId: { type: Schema.Types.ObjectId, ref: "Ingredient" },
                    mass: Number,
                },
            ],
            stepTools: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
            stepCookingTime: Number,
        },
    ],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
