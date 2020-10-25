const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const { createOrUpdateUser, getCurrentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, getCurrentUser);

module.exports = router;
