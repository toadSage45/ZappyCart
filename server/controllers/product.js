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
