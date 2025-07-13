import express from"express";
const router = express.Router();

// middlewares
import { adminCheck, authCheck } from '../middlewares/auth.js';

// controller
import { create, remove, list } from "../controllers/coupon.js";

// routes
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

export default router;
