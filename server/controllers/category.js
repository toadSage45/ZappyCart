import slugify from "slugify";
import Category from "../models/category.js"


export const create = async (req , res) => {
    try {
        const {name} = req.body
        const category = await new Category({name , slug : slugify(name).toLowerCase()}).save();

        res.status(200).json(category);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Create Category Failed');
    }
}


export const list = async (req , res) => {
    const allCategories = await Category.find({}).sort({createdAt : -1}).exec();
    res.json(allCategories);
}
export const read = async (req , res) => {
    const category = await Category.findOne({slug : req.params.slug}).exec();
    res.json(category);
}
export const update = async  (req , res) => {
    try {
        const {changedName} = req.body;
        const updated = await  Category.findOneAndUpdate({slug : req.params.slug} , {name : changedName , slug : slugify(changedName)} , {new : true});

        res.status(200).json(updated);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Update Category Failed');
    }
}
export const remove = async (req , res) => {
    try {
       const deleted = await Category.findOneAndDelete({slug : req.params.slug}).exec(); 
        res.status(200).json(deleted);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Create Category Failed');
    }
}