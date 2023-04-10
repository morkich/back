const express = require("express");
const { getTools } = require("../controllers/tool-controllers");

const router = express.Router();

router.get("/tools", getTools);

module.exports = router;
