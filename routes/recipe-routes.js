const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { insertRecipe, getRecipe, addView, likedRecipe, favoriteRecipe } = require("../controllers/recipe-controllers");

const router = express.Router();

router.get("/recipes/:id", authMiddleware(), getRecipe);
router.get("/recipes/view/:id", addView);
router.post("/recipes", roleMiddleware(["administrator"]), insertRecipe);
router.post("/recipes/liked", roleMiddleware(["user"]), likedRecipe);
router.post("/recipes/favorite", roleMiddleware(["user"]), favoriteRecipe);

module.exports = router;
