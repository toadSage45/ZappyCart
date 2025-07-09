import React, { useState, useEffect } from "react";
import { getCategory, getProductsFromCategory } from "../../functions/category";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";

const CategoryHome = () => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        getProductsFromCategory(slug).then((res) => {
           setCategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
        });
    }, [slug]);

    return (
      <div className="container">
            <div className="row pt-4">
                <div className="col">
                    {loading ? (
                        <h4 className="text-center p-3 mt-5 mb-5 display-4">Loading...</h4>
                    ) : (
                        <h4 className="text-center p-3 mt-5 mb-5 jumbotron">
                            {products.length} Products in "{category?.name}" category
                        </h4>
                    )}
                </div>
            </div>

            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CategoryHome;
