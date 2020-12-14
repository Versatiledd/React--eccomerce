const express = require("express");

const router = express.Router();

const {
  createAdressFromStripe,
  createPayment,
} = require("../controllers/stripe");

const { authCheck } = require("../middlewares/auth");

router.post("/create-adress", authCheck, createAdressFromStripe);
router.post("/create-payment", authCheck, createPayment);

module.exports = router;
