const Product = require("../models/Product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body.images);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Nie można stworzyć produktu");
  }
};

exports.getProducts = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("Category")
    .populate("Subcategory")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json("Deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Nie można usunąć produktu");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const singleProduct = await Product.findOne({
      slug: req.params.slug,
    })
      .populate("Category")
      .populate("Subcategory")
      .exec();
    res.json(singleProduct);
  } catch (error) {
    return res.status(400).json("Nie można pobrać danych dotyczących produktu");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const updateProduct = await Product.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      req.body,
      { new: true }
    ).exec();
    res.json(updateProduct);
  } catch (error) {
    return res.status(400).json("Nie można zaktualizować produktu");
  }
};
