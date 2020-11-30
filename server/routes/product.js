const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  totalCount,
  list,
  productStar,
  listRelated,
  searchFilters,
} = require("../controllers/product");

// routes

router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", totalCount);
router.get("/products/:count", getProducts);
router.get("/product/:slug", getProduct);
router.delete("/product/:slug", authCheck, adminCheck, removeProduct);
router.put("/product/:slug", authCheck, adminCheck, updateProduct);

// do paginacji
router.post("/products", list);

router.put("/product/star/:productId", authCheck, productStar);

// related
router.get("/product/related/:productId", listRelated);

// search

router.post("/search/filters", searchFilters);

module.exports = router;
