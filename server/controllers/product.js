import slugify from "slugify";
import Product from "../models/product.js";

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
