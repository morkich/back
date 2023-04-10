const express = require("express");
const { getIngredients } = require("../controllers/ingredient-controllers");

const router = express.Router();

router.get("/ingredients", getIngredients);

module.exports = router;
