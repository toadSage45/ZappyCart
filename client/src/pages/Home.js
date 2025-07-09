import React from "react";
import Jumbotron from "../components/cards/jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="p-5 mb-4 bg-body-secondary rounded-3 text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4  mb-4 bg-body-secondary rounded-3">
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 mb-4 bg-body-secondary rounded-3">
        Best Sellers
      </h4>
      <BestSellers />
      
      <h4 className="text-center p-3 mt-5 mb-5 display-4 mb-4 bg-body-secondary rounded-3">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 mb-4 bg-body-secondary rounded-3">
        Sub Categories
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
