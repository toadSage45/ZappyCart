import express from "express";
const router = express.Router();

// controller
import { createPaymentIntent } from "../controllers/stripe.js";

// middleware
import { authCheck } from '../middlewares/auth.js';

// route
router.post("/create-payment-intent", authCheck, createPaymentIntent);

export default router;
