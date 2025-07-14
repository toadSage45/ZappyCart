import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import no2 from "../../images/no2.png";
import ProductListItems from "./ProductListItems";
import { Rating } from "react-simple-star-rating";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from '../../features/cart/cartSlice';
import { setVisibility } from "../../features/drawer/drawerSlice";
import _ from "lodash";
import { addToWishlist } from "../../functions/user";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const { TabPane } = Tabs;
const { Meta } = Card;

const SingleProduct = ({ product, onStarClick, star }) => {

  const navigate = useNavigate();

  const { title, description, images, slug, _id } = product;
  const [rating, setRating] = useState(0);
  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const {token} = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const visibility = useSelector((state) => state.drawer.visibility);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id,token).then((res) => {
      // console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      navigate("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop interval={2000}>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card cover={<img src={no2} className="mb-3 card-image" />} />
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 9211420420 to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div className="text-center pt-1 pb-3">No rating yet</div>}

        <Card
          actions={[
            <Tooltip title={tooltip} key="add-to-cart">
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
              </a>
            </Tooltip>,

            <span key="add-to-wishlist">
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </a>
            </span>,

            <span key="rating">
              <RatingModal slug={slug}>
                <Rating
                  onClick={(newRating) => onStarClick(newRating, _id)}
                  initialValue={star}
                  size={25}
                  allowHover
                  transition
                  fillColor="red"
                  allowFraction
                />
              </RatingModal>
            </span>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>

      </div>
    </>
  );
};

export default SingleProduct;
