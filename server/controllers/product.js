import slugify from "slugify";
import Product from "../models/product.js"



export const create = async (req , res ) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct  = await new Product(req.body).save()
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error)
        //res.status(400).send('Create Product Failed');
        res.status(400).json({
            err: error.message,
        })
    }
}

export const read = async (req , res) => {
    const allProducts = await Product.find({}).sort({createdAt : -1}).exec();
    res.json(allProducts);
}