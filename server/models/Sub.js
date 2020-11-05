const moongose = require("mongoose");
const { Schema, ObjectId } = moongose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model("Subcategory", subCategorySchema);
