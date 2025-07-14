import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { setCart } from "../features/cart/cartSlice";
import { userCart } from "../functions/user";
import { toast } from "react-toastify";
import { changeCod } from "../features/cod/codSlice";

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

  const saveOrderToDb = async () => {
    dispatch(changeCod({cod : false}));
    try {
      const res = await userCart(cart, user.token);
      if (res.data.ok) {
        navigate("/user/checkout");
      } else {
        toast.error("Failed to save cart. Please try again.");
      }
    } catch (err) {
      console.log("cart save err", err);
      toast.error("Error saving cart. Please try again.");
    }
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch(changeCod({cod : true}));

    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/user/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const handleRemove = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((p) => p._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(setCart(cart));
  };

  const showCartItems = () => (
    <div className="table-responsive">
      <table className="table table-hover align-middle text-center border">
        <thead className="table-light">
          <tr className="align-middle text-uppercase fw-semibold">
            <th scope="col">🖼️ Image</th>
            <th scope="col">📦 Title</th>
            <th scope="col">💰 Price</th>
            <th scope="col">🎨 Color</th>
            <th scope="col">🔢 Quantity</th>
            <th scope="col">🚚 Shipping</th>
            <th scope="col">❌ Remove</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {cart.length > 0 ? (
            cart.map((p) => (
              <ProductCardInCheckout
                key={p._id}
                p={p}
                handleRemove={handleRemove}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-muted py-4">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4 className="mb-4">
            {cart.length === 0
              ? "🛒 No Products in Cart"
              : `🛒 ${cart.length} Product${cart.length > 1 ? "s" : ""
              } in Cart`}
          </h4>

          {!cart.length ? (
            <div className="text-center p-5">
              <h4 className="text-muted mb-4">🛒 Your cart is empty</h4>
              <Link
                to="/shop"
                className="btn btn-outline-primary btn-lg rounded-pill shadow-sm"
              >
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
                      {item.count} × ₹{item.price}
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
                <>
                  <button
                    onClick={
                      saveOrderToDb}
                    className="btn btn-primary w-100"
                    disabled={!cart.length}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={saveCashOrderToDb}
                    className="btn btn-success w-100 mt-2"
                    disabled={!cart.length}
                  >
                    Cash on Delivery
                  </button>
                </>

              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={handleLoginRedirect}
                >
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
