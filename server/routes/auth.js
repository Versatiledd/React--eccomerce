const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { createOrUpdateUser, getCurrentUser } = require("../controllers/auth");

router.post(
  `${process.env.API_URL}/create-or-update-user`,
  authCheck,
  createOrUpdateUser
);
router.post(`${process.env.API_URL}/current-user`, authCheck, getCurrentUser);
router.post(
  `${process.env.API_URL}/current-admin`,
  authCheck,
  adminCheck,
  getCurrentUser
);

module.exports = router;
