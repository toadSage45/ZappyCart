import Coupon from "../models/coupon.js";

// Create a new coupon
export const create = async (req, res) => {
    try {
        const { name, expiry, discount } = req.body.coupon;

        if (!name || !expiry || !discount) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existing = await Coupon.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: "Coupon already exists" });
        }

        const coupon = await new Coupon({ name, expiry, discount }).save();
        res.status(201).json(coupon);
    } catch (err) {
        console.error("Coupon create error:", err);
        res.status(500).json({ error: "Server error while creating coupon" });
    }
};

// Remove a coupon by ID
export const remove = async (req, res) => {
    try {
        const deleted = await Coupon.findByIdAndDelete(req.params.couponId).exec();

        if (!deleted) {
            return res.status(404).json({ error: "Coupon not found" });
        }

        res.json({ message: "Coupon deleted successfully", coupon: deleted });
    } catch (err) {
        console.error("Coupon delete error:", err);
        res.status(500).json({ error: "Server error while deleting coupon" });
    }
};

// List all coupons
export const list = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();
        res.json(coupons);
    } catch (err) {
        console.error("Coupon list error:", err);
        res.status(500).json({ error: "Server error while fetching coupons" });
    }
};
