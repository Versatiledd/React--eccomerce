const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  console.log(orderId, orderStatus);

  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOne({ orderedBy: user._id }).exec();

  const findProduct = cart.products.map((el, i) => {
    if (el._id == orderId) {
      el.orderStatus = orderStatus;
    }
    return el.orderStatus;
  });

  const update = await Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { $set: { "products.0.orderStatus": `${findProduct}` } },
    { new: true }
  );

  res.json(update);
};
