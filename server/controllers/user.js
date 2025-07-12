import User from "../models/user.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";

export const userCart = async (req, res) => {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    // Remove existing cart for this user, if any
    const existingCart = await Cart.findOne({ orderdBy: user._id }).exec();
    if (existingCart) {
        await existingCart.deleteOne();
        console.log("Removed old cart");
    }

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const { price } = await Product.findById(item._id).select("price").exec(); // more secure

        products.push({
            product: item._id,
            count: item.count,
            price,
        });
    }

    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
        cartTotal += products[i].price * products[i].count;
    }

    const newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id,
    }).save();

    console.log("New cart saved:", newCart);
    res.json({ ok: true });
};


export const getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id })
        .populate("products.product", "_id title price color")
        .exec();

    if (!cart) {
        return res.json({ products: [], cartTotal: 0, totalAfterDiscount: 0 });
    }

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
};

export const emptyCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    // console.log(user);
    const cart = await Cart.findOneAndDelete({ orderedBy: user._id }).exec();
    res.json(cart);
};


export const saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};