import express from "express";
// middlewares
import { authCheck } from '../middlewares/auth.js';
// controllers
import { userCart, getUserCart, emptyCart, saveAddress, getAddress, getDiscount,createOrder } from"../controllers/user.js";

const router = express.Router();


router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);
router.get("/user/address", authCheck, getAddress); // get address

//coupon
router.post("/user/cart/coupon" , authCheck, getDiscount);

//order
router.post("/user/order", authCheck, createOrder);

export default router;
