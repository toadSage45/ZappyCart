import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  getUserAddress,
  applyCoupon,
} from "../functions/user";
import { setCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAfterDiscount, settotalAfterDiscount] = useState("");

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

useEffect(() => {
  getUserCart(token).then((res) => {
    setProducts(res.data.products);
    setTotal(res.data.cartTotal);
  });

  getUserAddress(token).then((res) => {
    const addr = res.data.address || "";
    setAddress(addr);
    if (typeof(addr) == "string" && addr.trim().length > 0) {
      setAddressSaved(true);
    }
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
      settotalAfterDiscount(0);
      setCoupon("");
      toast.success("🧹 Cart is now empty. Continue shopping.");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    if (address.length === 0) {
      toast.error("Address is required!");
    } else {
      saveUserAddress(token, address).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address saved");
        }
      });
    }
  };

  const applyCouponDiscount = () => {
    //console.log("send coupon to backend", coupon);
    applyCoupon(token, coupon).then((res) => {
      //console.log("RES ON COUPON APPLIED", res.data);
      // error
      if (res.data.err) {
        // setDiscountError(res.data.err);
        toast.error("Invalid coupon");
      }
      else {
        toast.success("Coupon applied");
        settotalAfterDiscount(res.data);
      }
      
    });
  };

  return (
    <div className="row px-3 px-md-5 py-4 bg-light">
      {/* LEFT SIDE */}
      <div className="col-md-6 mb-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h4 className="mb-3 text-primary fw-semibold">
              📍 Delivery Address
            </h4>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="btn btn-outline-primary w-100 mb-4"
              onClick={saveAddressToDb}
            >
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
              <button className="btn btn-success" onClick={applyCouponDiscount}>
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
            <p>
              <strong>Items in Cart:</strong> {products.length}
            </p>

            <ul className="list-group list-group-flush mb-3">
              {products.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span className="fw-medium">
                    {p.product.title}{" "}
                    <small className="text-muted">({p.product.color})</small>
                  </span>
                  <span>
                    {p.count} × ₹{p.product.price}
                  </span>
                </li>
              ))}
            </ul>

            <hr />
            <h5 className="text-end">
              💰 <strong>Total: ₹{total}</strong>
            </h5>
            {totalAfterDiscount > 0 && (
              <div className="alert alert-success mt-3 d-flex justify-content-between align-items-center">
                <strong>Total After Discount:</strong>
                <span className="fs-5 fw-semibold">₹{totalAfterDiscount}</span>
              </div>
            )}

            <div className="row mt-4">
              <div className="col-6">
                <button
                  className="btn btn-primary w-100 rounded-pill"
                  disabled={!products.length || !addressSaved}
                  onClick={() => navigate("/user/payment")}
                >
                  ✅ Place Order
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-outline-danger w-100 rounded-pill"
                  onClick={emptyCart}
                  disabled={!products.length && !addressSaved}
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
