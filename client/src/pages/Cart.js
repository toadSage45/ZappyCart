import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { setCart } from '../features/cart/cartSlice';

const Cart = () => {
    // redux
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login", { state: { from: "/cart" } });
    };

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].count;
        }
        return total;
    };

    const saveOrderToDb = () => {
        //
    };

    const handleRemove = (productId) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter((p) => p._id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(setCart(cart));
    };

    const showCartItems = () => (
    <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
            <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
                <th scope="col">Remove</th>
            </tr>
        </thead>
        <tbody>
            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} handleRemove={handleRemove} />
            ))}
        </tbody>
    </table>
);


    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-4">
  {cart.length === 0 ? "🛒 No Products in Cart" : `🛒 ${cart.length} Product${cart.length > 1 ? "s" : ""} in Cart`}
</h4>


                    {!cart.length ? (
                        <div className="text-center p-5">
                            <h4 className="text-muted mb-4">🛒 Your cart is empty</h4>
                            <Link to="/shop" className="btn btn-outline-primary btn-lg rounded-pill shadow-sm">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        showCartItems()
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header text-black text-center">
                            <h5 className="mb-0 text-uppercase">🧾 Order Summary</h5>
                        </div>
                        <div className="card-body">
                            <p className="fw-bold">Products:</p>
                            {cart.length === 0 ? (
                                <p className="text-muted">No products in cart.</p>
                            ) : (
                                cart.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex justify-content-between border-bottom py-2"
                                    >
                                        <span>{item.title}</span>
                                        <span>
                                            {item.count} × ₹{item.price} = ₹
                                            {item.count * item.price}
                                        </span>
                                    </div>
                                ))
                            )}

                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Total:</span>
                                <span>₹{getTotal()}</span>
                            </div>
                            <hr />

                            {user && user.token ? (
                                <button
                                    onClick={saveOrderToDb}
                                    className="btn btn-success w-100"
                                    disabled={!cart.length}
                                >
                                    Proceed to Checkout
                                </button>
                            ) : (
                                <button className="btn btn-primary w-100" onClick={handleLoginRedirect}>
                                    Login to Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
