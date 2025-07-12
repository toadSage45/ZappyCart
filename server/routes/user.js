import express from "express";
// middlewares
import { authCheck } from '../middlewares/auth.js';
// controllers
import { userCart, getUserCart, emptyCart, saveAddress } from"../controllers/user.js";

const router = express.Router();


router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);

export default router;
