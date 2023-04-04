const express = require("express");
const { login, registration, isAuth } = require("../controllers/auth-controllers");
const { check } = require("express-validator");
const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/registration", [check("username", "Имя не может быть пустым").notEmpty()], registration);
// router.post("/auth/check", isAuth);

module.exports = router;
