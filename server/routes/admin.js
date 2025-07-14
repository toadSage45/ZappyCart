import express from "express";
import { authCheck, adminCheck } from "../middlewares/auth.js";
import { orders, orderStatus } from "../controllers/admin.js";

const router = express.Router();

// Admin routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

export default router;
