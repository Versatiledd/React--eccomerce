// const express = require("express");

// const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const { createOrUpdateUser, getCurrentUser } = require("../controllers/auth");

module.exports = (app) => {
  app.post(
    `${process.env.API_URL}/create-or-update-user`,
    authCheck,
    createOrUpdateUser
  );
  app.post(`${process.env.API_URL}/current-user`, authCheck, getCurrentUser);
  app.post(
    `${process.env.API_URL}/current-admin`,
    authCheck,
    adminCheck,
    getCurrentUser
  );
};
