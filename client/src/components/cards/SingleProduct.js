import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import no2 from "../../images/no2.png";
import ProductListItems from "./ProductListItems";
import { Rating } from "react-simple-star-rating";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;
const { Meta } = Card;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, slug, _id } = product;
  const [rating, setRating] = useState(0);

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
            <div key="cart">
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </div>,
            <Link key="wishlist" to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,

            <RatingModal>
              <Rating
                onClick={(newRating) => onStarClick(newRating, _id)}
                initialValue={star}
                size={25}
                allowHover
                transition
                fillColor="red"
              />

            </RatingModal>,

          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
