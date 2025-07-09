import slugify from "slugify";
import Sub from "../models/sub.js"
import Product from "../models/product.js";

export const create = async (req , res) => {
    try {
        const {name , parent} = req.body
        const category = await new Sub({name , parent , slug : slugify(name).toLowerCase()}).save();

        res.status(200).json(category);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Create Sub Failed');
    }
}


export const list = async (req , res) => {
    const allSubs = await Sub.find({}).sort({createdAt : -1}).exec();
    res.json(allSubs);
}
export const read = async (req , res) => {
    const sub = await Sub.findOne({slug : req.params.slug}).exec();
    res.json(sub);
}



export const update = async  (req , res) => {
    try {
        const {changedName , parent} = req.body;
        const updated = await  Sub.findOneAndUpdate({slug : req.params.slug} , {name : changedName , parent , slug : slugify(changedName)} , {new : true});

        res.status(200).json(updated);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Update Sub Failed');
    }
}
export const remove = async (req , res) => {
    try {
       const deleted = await Sub.findOneAndDelete({slug : req.params.slug}).exec(); 
        res.status(200).json(deleted);
    } catch (error) {
        //console.log(error)
        res.status(400).send('Create Sub Failed');
    }
}

export const readProductsFromSubCategory = async (req, res) => {
    const sub = await Sub.findOne({ slug: req.params.slug }).exec();

    const products = await Product.find({ subs : sub }).populate("category").populate("subs").exec();

    res.json(
        { sub, products }
    );
}