import React from "react";
import Jumbotron from "../components/cards/jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

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

      <br />
      <br />
    </>
  );
};

export default Home;
