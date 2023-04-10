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
            ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
            tools: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
        },
    ],
    cookingTime: Number,
    kkal: Number,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
