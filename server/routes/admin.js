// const express = require("express");

// const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { updateOrderStatus } = require("../controllers/admin");

module.exports = (app) => {
  app.put(
    `${process.env.API_URL}/admin/order-status`,
    authCheck,
    adminCheck,
    updateOrderStatus
  );
};
