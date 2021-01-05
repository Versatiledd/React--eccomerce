const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { updateOrderStatus } = require("../controllers/admin");

router.put(`/admin/order-status`, authCheck, adminCheck, updateOrderStatus);

module.exports = router;
