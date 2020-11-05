const moongose = require("mongoose");
const { ObjectId, Schema } = moongose;

const productSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 16,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
      index: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategory: [
      {
        type: ObjectId,
        ref: "Subcategory",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Tak", "Nie"],
    },
    color: {
      type: String,
      enum: ["Czarny", "Biały", "Srebrny", "Złoty"],
    },
    brand: {
      type: String,
      enum: ["Komputery", "Telefony", "Meble"],
    },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = moongose.model("Product", productSchema);
