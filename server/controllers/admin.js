import Order from "../models/order.js";
import User from "../models/user.js";


//get all the order
export const orders = async (req, res) => {
    let orders = await Order
        .find({})
        .sort("-createdAt")
        .populate("products.product")
        .exec();

    res.json(orders);
};

//update status
export const orderStatus = async (req, res) => {
    const { orderId, orderStatus } = req.body;

    let updated = await Order
        .findByIdAndUpdate(orderId, { orderStatus }, { new: true })
        .exec();

    res.json(updated);
};
