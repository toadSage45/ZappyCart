import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { setCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    useEffect(() => {
        getUserCart(token).then((res) => {
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
    }, [token]);

    const emptyCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        dispatch(setCart([]));
        emptyUserCart(token).then(() => {
            setProducts([]);
            setTotal(0);
            toast.success("🧹 Cart is now empty. Continue shopping.");
        });
    };

    const saveAddressToDb = () => {
        // console.log(address);
        if (address.length === 0) {
            toast.error("Address is required!");
        }
        else {
            saveUserAddress(token, address).then((res) => {
                if (res.data.ok) {
                    setAddressSaved(true);
                    toast.success("Address saved");
                }
            });
        }
    };

    const applyCoupon = () => {
        console.log("Applying coupon:", coupon);
        toast.success("🏷️ Coupon applied");
    };

    return (
        <div className="row px-3 px-md-5 py-4 bg-light">
            {/* LEFT SIDE */}
            <div className="col-md-6 mb-4">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="mb-3 text-primary fw-semibold">📍 Delivery Address</h4>
                        <textarea
                            className="form-control mb-3"
                            rows="4"
                            placeholder="Enter your full delivery address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <button className="btn btn-outline-primary w-100 mb-4" onClick={saveAddressToDb}>
                            💾 Save Address
                        </button>

                        <h4 className="mb-3 text-success fw-semibold">🏷️ Got a Coupon?</h4>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter coupon code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button className="btn btn-success" onClick={applyCoupon}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-6">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="mb-3 fw-semibold">🧾 Order Summary</h4>
                        <hr />
                        <p><strong>Items in Cart:</strong> {products.length}</p>

                        <ul className="list-group list-group-flush mb-3">
                            {products.map((p, i) => (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="fw-medium">
                                        {p.product.title} <small className="text-muted">({p.product.color})</small>
                                    </span>
                                    <span>
                                        {p.count} × ₹{p.product.price} = <strong>₹{p.product.price * p.count}</strong>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <hr />
                        <h5 className="text-end">💰 <strong>Total: ₹{total}</strong></h5>

                        <div className="row mt-4">
                            <div className="col-6">
                                <button
                                    className="btn btn-primary w-100 rounded-pill"
                                    disabled={!products.length || !addressSaved}
                                >
                                    ✅ Place Order
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-outline-danger w-100 rounded-pill"
                                    onClick={emptyCart}
                                    disabled={!products.length}
                                >
                                    🗑️ Empty Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
