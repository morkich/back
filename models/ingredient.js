const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ingredientSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    alias: {
        type: String,
        require: true,
        unique: true,
    },
    // category: [{ type: String, ref: "Category" }],
    kkal: Number,
    fats: Number,
    proteins: Number,
    carbohydrate: Number,
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;
