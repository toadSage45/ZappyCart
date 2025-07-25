import slugify from "slugify";
import Category from "../models/category.js"
import Sub from "../models/sub.js"
import Product from "../models/product.js";


export const create = async (req, res) => {
    try {
        const { name } = req.body
        const category = await new Category({ name, slug: slugify(name).toLowerCase() }).save();

        res.status(200).json(category);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Create Category Failed');
    }
}


export const list = async (req, res) => {
    const allCategories = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(allCategories);
}
export const read = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug }).exec();

    res.json(
        category
    );
}

export const readProductsFromCategory = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug }).exec();

    const products = await Product.find({ category }).populate("category").populate("subs").exec();

    res.json(
        { category, products }
    );
}


export const update = async (req, res) => {
    try {
        const { changedName } = req.body;
        const updated = await Category.findOneAndUpdate({ slug: req.params.slug }, { name: changedName, slug: slugify(changedName) }, { new: true });

        res.status(200).json(updated);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Update Category Failed');
    }
}
export const remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug }).exec();
        res.status(200).json(deleted);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Delete Category Failed');
    }
}
export const getSubs = async (req, res) => {
    try {
        const subs = await Sub.find({ parent: req.params._id }).exec()
        res.status(200).json(subs);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Get Sub Categories Failed');
    }
}