import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            required: "Name is required",
            minlength: [6, "Too short"],
            maxlength: [12, "Too long"],
        },
        expiry: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
