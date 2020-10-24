const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("Welcome to user panel");
});

module.exports = router;
