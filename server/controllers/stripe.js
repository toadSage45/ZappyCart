import User from "../models/user.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Coupon from "../models/coupon.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);
export const createPaymentIntent = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email }).exec();
      if (!user) return res.status(404).send({ error: "User not found" });
  
      const cart = await Cart.findOne({ orderedBy: user._id }).exec();
      if (!cart) return res.status(400).send({ error: "Cart not found" });
  
      const { cartTotal, totalAfterDiscount } = cart;
  
      const amountToCharge =
        totalAfterDiscount && Number(totalAfterDiscount) > 0
          ? Number(totalAfterDiscount)
          : Number(cartTotal);
      
      console.log(amountToCharge);

      const finalAmount = Math.round(amountToCharge * 100);
  
      console.log("Creating payment intent with:", finalAmount, typeof finalAmount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: "INR",
        automatic_payment_methods: { enabled: true }, // optional, helps with newer setups
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount,
      });
    } catch (err) {
      console.error("Payment Intent Error:", err);
      res.status(500).send({ error: "Payment initiation failed" });
    }
  };
  