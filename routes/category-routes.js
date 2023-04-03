const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { getCategories, getCategory, deleteCategory, insertCategory, updateCategory } = require("../controllers/category-controllers");

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.delete("/categories/:id", roleMiddleware(["administrator"]), deleteCategory);
router.post("/categories", roleMiddleware(["administrator"]), insertCategory);
router.patch("/categories/:id", roleMiddleware(["administrator"]), updateCategory);

module.exports = router;
