const SubCategory = require("../models/Sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    console.log(parent, name);
    const subCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send("Nazwa subkategorii nie może się powtarzać.");
  }
};
exports.list = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let result = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(result);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Subcategory update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Subcategory delete failed");
  }
};
