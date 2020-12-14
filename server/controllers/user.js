const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");

exports.cartHistory = async (req, res) => {
  const { cart, tokenStripe } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  const cartExist = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExist) {
    cartExist.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;
    object.address = tokenStripe.card;

    products.push(object);
  }

  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    totalPrice = totalPrice + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    totalPrice,
    orderedBy: user._id,
  }).save();

  let bulkOption = products.map((item) => {
    console.log(item.product);
    return {
      updateOne: {
        filter: {
          _id: item.product,
        },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  let update = await Product.bulkWrite(bulkOption, {});

  res.json({ ok: "true" });
};

exports.getUserProducts = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  res.json(cart);
};

exports.getUserAddress = async (req, res) => {
  const user = await User.find({ email: req.body.email }).exec();
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
};
exports.wishList = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  console.log(list);

  res.json(list);
};
exports.removeWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
