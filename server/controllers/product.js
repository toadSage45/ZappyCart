import slugify from "slugify";
import Product from "../models/product.js";
import User from "../models/user.js"

export const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    //res.status(400).send('Create Product Failed');
    res.status(400).json({
      err: error.message,
    });
  }
};

export const listAll = async (req, res) => {
  const allProducts = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort({ createdAt: -1 })
    .exec();

  res.json(allProducts);
};

export const remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.status(200).json(deleted);
  } catch (error) {
    //console.log(error)
    res.status(400).send("Delete Product Failed");
  }
};

export const read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

export const update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    console.log("Product update error- ", error);
    //res.status(400).send('Update Product Failed');
    res.status(400).json({
      err: error.message,
    });
  }
};
//without pagination
// export const list = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
export const list = async (req, res) => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;  //can be modified from frontend

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.estimatedDocumentCount().exec();
    res.json(total);
  } catch (err) {
    console.error("Error fetching product count:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

export const listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id }, //$ne -> not including this product
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .exec();

  res.json(related);
};

//filter based on name of the product
const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({
      title: { $regex: new RegExp(`\\b${query}`, "i") }
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

//filter based on price
const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0], //Greater than or equal to
        $lte: price[1], //Less than or equal to
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//filter based on category
const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//filter based on rating
const handleStar = async (req, res, stars) => {
  try {
    const aggregates = await Product.aggregate([
      {
        $project: {
          _id: 1,
          floorAverage: { $floor: { $avg: "$ratings.star" } },
        },
      },
      { $match: { floorAverage: stars } },
      { $limit: 12 },
    ]);

    const productIds = aggregates.map((p) => p._id);

    const products = await Product.find({ _id: { $in: productIds } }) //$in->including this product id
      .populate("category", "_id name")
      .populate("subs", "_id name");
    res.json(products);
  } catch (err) {
    console.error("STAR FILTER ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//filter based on sub category
const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(products);
};

//filter based on shipping
const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();
  res.json(products);
};

//Search or filter
export const searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, shipping } = req.body;

  if (query) {
    // console.log(query);
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    // console.log(price);
    await handlePrice(req, res, price);
  }
  if (category) {
    // console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }
  if (stars) {
    // console.log("stars ---> ", stars);
    await handleStar(req, res, stars);
  }
  if (sub) {
    // console.log("sub ---> ", sub);
    await handleSub(req, res, sub);
  }
  if (shipping) {
    // console.log("shipping ---> ", shipping);
    await handleShipping(req, res, shipping);
  }
};