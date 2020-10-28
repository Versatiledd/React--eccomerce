const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { createOrUpdateUser, getCurrentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, getCurrentUser);
router.post("/current-admin", authCheck, adminCheck, getCurrentUser);

module.exports = router;
