const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPESECRETKEY);

exports.createAdressFromStripe = async (req, res) => {
  const address = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      address: req.body.address,
    }
  ).exec();
  res.send({ ok: "ok" });
};

exports.createPayment = async (req, res) => {
  const paymentIntent = await stripe.charges.create({
    amount: 1000 * 100,
    source: "tok_visa",
    currency: "pln",
  });
  res.send({ message: "Okay" });
};
