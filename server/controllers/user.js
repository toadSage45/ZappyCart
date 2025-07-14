import User from "../models/user.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Coupon from "../models/coupon.js";

export const userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // Remove existing cart for this user, if any
  const existingCart = await Cart.findOne({ orderedBy: user._id }).exec();
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

export const getAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .select("address")
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ address: user.address || "" });
  } catch (err) {
    console.error("Error fetching address:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getDiscount = async (req, res) => {
  try {
    const { coupon } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    if (!cart) {
      return res.status(400).json({ err: "Cart not found" });
    }
    const { cartTotal } = cart;

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount: cartTotal },
      { new: true }
    );

    const valid = await Coupon.findOne({ name: coupon });
    if (!valid) {
      return res.json({ err: "Invalid coupon" });
    }

    const totalAfterDiscount = (
      cartTotal -
      (cartTotal * valid.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );

    res.json(totalAfterDiscount);
  } catch (err) {
    console.error("Coupon apply error:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export const createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  // const { paymentIntent } = req.body.stripeResponse;
  const cart = await Cart.findOne({ orderedBy: user._id }).exec();

  const paymentIntent = {
    id: "fake_payment_id_123",
    amount: cart.cartTotal * 100,
    currency: "INR",
    status: "succeeded",
    created: Date.now(),
    payment_method_types: ["card"],
  };

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};
