const Product = require("../models/Product");
const slugify = require("slugify");
const User = require("../models/User");

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

exports.totalCount = async (req, res) => {
  let total = await Product.findOne({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.list = async (req, res) => {
  const { sort, order, page } = req.body;
  const currentPage = page || 1;
  const perPage = 4;
  let products = await Product.find({})
    .skip((currentPage - 1) * perPage)
    .populate("Category")
    .populate("Subcategory")
    .sort([[sort, order]])
    .limit(perPage)
    .exec();
  res.json(products);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  const { star } = req.body;

  console.log(product, user, star);

  let existingRatingObj = product.ratings.find((el) => el.postedBy == user._id);

  if (existingRatingObj === undefined) {
    let ratingAdd = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: {
          ratings: {
            star,
            postedBy: user._id,
          },
        },
      },
      { new: true }
    ).exec();
    console.log(ratingAdd);
    res.json(ratingAdd);
  } else {
    const ratingUpdate = await Product.updateOne(
      {
        ratings: {
          $elemMatch: existingRatingObj,
        },
      },
      {
        $set: { "ratings.$.star": star },
      },
      {
        new: true,
      }
    ).exec();
    console.log(ratingUpdate);
    res.json(ratingUpdate);
  }
};

// pobierz produkty powiązane z produktem, który wyświetlam

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleStars = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: {
            $avg: "$ratings.star",
          },
        },
      },
    },
    {
      $match: { floorAverage: stars },
    },
  ])
    .limit(10)
    .exec((err, agg) => {
      if (err) console.log("Aggregates error");
      Product.find({ _id: agg })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("Product aggregate error");
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subcategory: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};
const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};
const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    sub,
    shipping,
    color,
    brand,
  } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    await handlePrice(req, res, price);
  }
  if (category) {
    console.log("category", category);
    await handleCategory(req, res, category);
  }
  if (stars) {
    console.log("stars", stars);
    await handleStars(req, res, stars);
  }
  if (sub) {
    console.log("sub", sub);
    await handleSub(req, res, sub);
  }
  if (shipping) {
    await handleShipping(req, res, sub);
  }
  if (color) {
    await handleColor(req, res, color);
  }
  if (brand) {
    await handleBrand(req, res, brand);
  }
};
