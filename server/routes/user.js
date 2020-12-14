const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const {
  cartHistory,
  getUserProducts,
  getUserAddress,
  addToWishlist,
  wishList,
  removeWishlist,
} = require("../controllers/user");

router.post("/user/cart", authCheck, cartHistory);
router.get("/user/products", authCheck, getUserProducts);
router.get("/user/address", authCheck, getUserAddress);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishList);
router.put("/user/wishlist/:productId", authCheck, removeWishlist);

module.exports = router;
