const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const { insertRecipe, getRecipe, addView } = require("../controllers/recipe-controllers");

const router = express.Router();

router.get("/recipes/:id", getRecipe);
router.get("/recipes/view/:id", addView);
router.post("/recipes", roleMiddleware(["administrator"]), insertRecipe);

module.exports = router;
