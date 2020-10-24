const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    //   wishlist: [
    //     {
    //       type: ObjectId,
    //       red: "Product",
    //     },
    //   ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
