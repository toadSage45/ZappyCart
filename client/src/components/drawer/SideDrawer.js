import React from "react";
import { Drawer, InputNumber, Tooltip } from "antd";
import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import no2 from "../../images/no2.png";
import { setVisibility } from "../../features/drawer/drawerSlice";
import { setCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const visibility = useSelector((state) => state.drawer.visibility);
    const cart = useSelector((state) => state.cart.cart);

    const updateCartQuantity = (productId, newCount, maxQty) => {
        if (!newCount && newCount < 1) {
            newCount = 1;
        }
        else if (newCount > maxQty) {
            toast.error(`Max available quantity: ${maxQty}`);
            return;
        }

        const updatedCart = cart.map((item) =>
            item._id === productId ? { ...item, count: newCount } : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(setCart(updatedCart));
    };

    const handleRemove = (productId) => {
        const updatedCart = cart.filter((item) => item._id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(setCart(updatedCart));
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.count, 0);
    };

    return (
        <Drawer
            title={<span className="fw-bold fs-5">🛒 Cart ({cart.length})</span>}
            placement="right"
            onClose={() => dispatch(setVisibility({ visibility: false }))}
            open={visibility}
            width={360}
        >
            <div className="d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                <div className="overflow-auto pe-2" style={{ maxHeight: "70vh" }}>
                    {cart.length === 0 ? (
                        <p className="text-center text-muted mt-5">Your cart is empty.</p>
                    ) : (
                        cart.map((p, i) => (
                            <div
                                key={i}
                                className="mb-3 border rounded shadow-sm overflow-hidden position-relative"
                            >
                                <div className="position-relative">
                                    <ModalImage
                                        small={p.images?.length ? p.images[0].url : no2}
                                        large={p.images?.length ? p.images[0].url : no2}
                                        alt={p.title}
                                        hideDownload={true}
                                        hideZoom={true}
                                        className="w-100"
                                        style={{
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "4px",
                                        }}
                                    />
                                    <Tooltip title="Remove">

                                    </Tooltip>

                                </div>
                                <div className="p-2">
                                    <h6 className="mb-1 text-truncate" title={p.title}>
                                        {p.title}
                                    </h6>
                                    <p className="mb-1">
                                        <strong>Price:</strong> ₹{p.price}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Color:</strong> {p.color}
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <strong className="me-2">Qty:</strong>
                                        <span>
                                            <InputNumber
                                                min={1}
                                                max={p.quantity}
                                                value={p.count}
                                                onChange={(value) => updateCartQuantity(p._id, value, p.quantity)}
                                                size="small"
                                                style={{ width: "60px" }}
                                            />
                                            <DeleteOutlined

                                                onClick={() => handleRemove(p._id)}
                                                className="text-danger position-absolute"
                                                style={{
                                                    bottom: "8px",
                                                    right: "8px",
                                                    fontSize: "18px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </span>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <>
                        <div className="border-top pt-3 pb-2 px-2">
                            <div className="d-flex justify-content-between fw-bold fs-6">
                                <span>Total:</span>
                                <span>₹{getTotal()}</span>
                            </div>
                        </div>
                        <div>
                            <Link to="/cart">
                                <button
                                    onClick={() => dispatch(setVisibility(false))}
                                    className="btn btn-primary w-100 rounded-pill shadow"
                                >
                                    🛍️ Go to Cart
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </Drawer>
    );
};

export default SideDrawer;
