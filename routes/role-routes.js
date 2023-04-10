const express = require("express");
const { insertRole } = require("../controllers/role-controllers");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/role", roleMiddleware(["administrator"]), insertRole);

module.exports = router;
