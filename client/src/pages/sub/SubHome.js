import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsFromSubCategory } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams(); 

  useEffect(() => {
    setLoading(true);
    getProductsFromSubCategory(slug)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setSub(res.data?.sub || {});
        setProducts(Array.isArray(res.data?.products) ? res.data.products : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading sub:", err);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{sub?.name || ""}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
