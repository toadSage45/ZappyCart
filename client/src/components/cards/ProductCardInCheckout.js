import React from "react";
import { useDispatch } from "react-redux";
import { CloseCircleOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Tooltip, InputNumber } from "antd";
import ModalImage from "react-modal-image";
import no2 from "../../images/no2.png";
import { toast } from "react-toastify";
import { setCart } from "../../features/cart/cartSlice";

const ProductCardInCheckout = ({ p, handleRemove }) => {
  const dispatch = useDispatch();

  const updateCart = (newCount) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].count = newCount;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(setCart(cart));
    }
  };

  const handleManualChange = (value) => {
    if (!value || value < 1) {
        updateCart(1);
    } else if (value > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
    } else {
      updateCart(value);
    }
  };

  return (
    <tr>
      <td style={{ width: "100px", height: "100px", padding: "10px" }}>
        <div
          style={{
            width: "100%",
            height: "100px",
            // overflow: "hidden",
            //borderRadius: "8px",
            //border: "1px solid #dee2e6",
          }}
        >
          {p.images && p.images.length ? (
            <ModalImage
              small={p.images[0].url}
              large={p.images[0].url}
              alt="product"
            />
          ) : (
            <ModalImage small={no2} large={no2} alt="default" />
          )}
        </div>
      </td>

      <td>{p.title}</td>
      <td>₹{p.price}</td>
      <td>{p.color}</td>

      <td className="text-center">
        <div className="d-flex align-items-center justify-content-center">
          
          <InputNumber
            min={1}
            // max={p.quantity}
            value={p.count}
            onChange={handleManualChange}
            style={{ width: "60px", textAlign: "center" }}
          />
          
        </div>
      </td>

      <td>{p.shipping === "Yes" ? "✅" : "❌"}</td>
      <td>
        <Tooltip title="Remove">
          <CloseCircleOutlined
            onClick={() => handleRemove(p._id)}
            className="text-danger"
            style={{ cursor: "pointer", fontSize: "18px" }}
          />
        </Tooltip>
      </td>
    </tr>
  );
};

export default ProductCardInCheckout;
