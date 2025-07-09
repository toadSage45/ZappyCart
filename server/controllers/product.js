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
    res.json( total );
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

//search based on name of the product
const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({
      $or: [
        { $text: { $search: query } }, // full-word match
        { title: { $regex: query, $options: "i" } } // partial match (case-insensitive)
      ]
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      //.populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};




//Search or filter
export const searchFilters = async (req, res) => {
  const { query } = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }
};