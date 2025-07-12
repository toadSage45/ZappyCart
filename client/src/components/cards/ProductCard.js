import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import no2 from "../../images/no2.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from '../../features/cart/cartSlice';
import { setVisibility } from "../../features/drawer/drawerSlice";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const visibility = useSelector((state) => state.drawer.visibility);

  const dispatch = useDispatch();


  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") { //ensures this call is in browser 
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,  //copy all the properties of the product
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual); //compares the whole array(if all value equal then only considered same)
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch(setCart(unique));
      dispatch(setVisibility({
        visibility: true
      }))
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : no2}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title.split(" ").slice(0, 3).join(" ")} - ₹${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
