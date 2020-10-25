const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  const { name, email, picture } = req.user;
  console.log(name, email, picture);

  const user = await User.findOneAndUpdate(
    {
      email,
    },
    { name, picture },
    { new: true }
  );

  if (user) {
    console.log("user upgraded");
    res.json(user);
  } else {
    console.log("user created");
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.getCurrentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
