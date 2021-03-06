const Category = require("../models/Category");
const Subcategory = require("../models/Sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (error) {
    res.status(400).send("Nazwa kategorii nie może się powtarzać.");
  }
};
exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let result = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(result);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Category update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Category delete failed");
  }
};

exports.getSubs = async (req, res) => {
  console.log(req.body);
  console.log(req.params._id);
  const subs = await Subcategory.find({ parent: req.params._id }).exec();
  res.json(subs);
};
