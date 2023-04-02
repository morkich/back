const express = require("express");
const {
    getCategories,
    getCategory,
    deleteCategory,
    insertCategory,
    updateCategory,
} = require("../controllers/category-controllers");

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.delete("/categories/:id", deleteCategory);
router.post("/categories", insertCategory);
router.patch("/categories/:id", updateCategory);

module.exports = router;
