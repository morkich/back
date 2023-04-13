const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    roles: [{ type: String, ref: "Role" }],
    avatar: String,
    firstName: String,
    secondName: String,
    nickName: String,
    likedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    favoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
