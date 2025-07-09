import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { text } = useSelector((state) => state.search);

  useEffect(() => {
    loadInitialProducts();
  }, []);

  const loadInitialProducts = async () => {
    try {
      const res = await getProductsByCount(12);
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Text search
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (text) {
        handleSearch({ query: text });
      } else {
        loadInitialProducts();
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  const handleSearch = async (filterArgs) => {
    try {
      const res = await fetchProductsByFilter(filterArgs);
      setProducts(res.data);
      console.log("Filtered Products:", res.data);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Filter */}
        <div className="col-md-3">search/filter menu</div>

        {/* Product Grid */}
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length === 0 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mt-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
