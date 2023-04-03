const express = require("express");
const { login, registration } = require("../controllers/auth-controllers");
const { check } = require("express-validator");
const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/registration", [check("username", "Имя не может быть пустым").notEmpty()], registration);

module.exports = router;
