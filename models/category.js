const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    icon: {
        type: String,
        require: true,
    },
    alias: {
        type: String,
        require: true,
        unique: true,
    },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
