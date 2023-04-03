const express = require("express");
const { insertRole } = require("../controllers/role-controllers");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// router.get("/role", getRoles);
// router.get("/role/:id", getRole);
// router.delete("/role/:id", deleteRole);
router.post("/role", roleMiddleware(["administrator"]), insertRole);
// router.patch("/role/:id", updateRole);

module.exports = router;
