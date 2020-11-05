const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
} = require("../controllers/product");

// routes

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", getProducts);
router.get("/product/:slug", getProduct);
router.delete("/product/:slug", authCheck, adminCheck, removeProduct);
router.put("/product/:slug", authCheck, adminCheck, updateProduct);

module.exports = router;
