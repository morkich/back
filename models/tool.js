const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const toolSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
});

const Tool = mongoose.model("Tool", toolSchema);
module.exports = Tool;
