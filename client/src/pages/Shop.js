import React, { useState, useEffect } from "react";
import {
    getProductsByCount,
    fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import { searchQuery } from "../features/search/searchSlice";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState("");
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [shipping, setShipping] = useState("");

    const dispatch = useDispatch();
    const { text } = useSelector((state) => state.search);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };

    // ======================== Initial load ========================
    useEffect(() => {
        loadAllProducts();
        // fetch all categories
        getCategories().then((res) => setCategories(res.data));
        // fetch all subcategories
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const loadAllProducts = async () => {
        try {
            const res = await getProductsByCount(12);
            setProducts(res.data);
        } catch (err) {
            console.error("Error loading products:", err);
        } finally {
            setLoading(false);
        }
    };

    // ======================== Text Filter ========================
    useEffect(() => {
        const delayed = setTimeout(() => {
            if (text) {
                fetchProducts({ query: text });
                setCategoryIds([]);
                setPrice([0, 0]);
                setStar("")
                setPrice([0, 0]);
                setShipping("");

            } else {
                loadAllProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // ======================== Price Filter ========================
    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch(searchQuery({ text: "" }));
        setCategoryIds([]);
        setStar("")
        setShipping("");
        setPrice(value)
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // ======================== Category Filter ========================
    const showCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    const handleCheck = (e) => {
        dispatch(searchQuery({ text: "" }));
        setPrice([0, 0]);
        setStar("")
        setPrice([0, 0]);
        setShipping("");
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState });
    };

    // ======================== Star Filter ========================
    const handleStarClick = (num) => {
        // console.log(num)
        dispatch(searchQuery({ text: "" }));
        setCategoryIds([]);
        setPrice([0, 0]);
        setPrice([0, 0]);
        setShipping("");;
        fetchProducts({ stars: num });
    };

    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            {[5, 4, 3, 2, 1].map((s) => (
                <Star key={s} starClick={handleStarClick} numberOfStars={s} />
            ))}
        </div>
    );

    // ======================== Sub-category Filter ========================
    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                className="badge m-1  text-dark text-decoration-none"
                style={{ cursor: "pointer" }}
            >
                {s.name}
            </div>
        ));

    const handleSub = (sub) => {
        // console.log("SUB", sub);
        dispatch(searchQuery({ text: "" }));
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setSub(sub);
        fetchProducts({ sub });
    };

    // ======================== Shipping Filter ========================
    const showShipping = () => (
        <>
            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingchange}
                value="Yes"
                checked={shipping === "Yes"}
            >
                Yes
            </Checkbox>

            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingchange}
                value="No"
                checked={shipping === "No"}
            >
                No
            </Checkbox>
        </>
    );
    const handleShippingchange = (e) => {
        setSub("");
        dispatch(searchQuery({ text: "" }));
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value });
    };


    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar Filter */}
                <div className="col-md-3">
                    <h4>Search/Filter</h4>
                    <hr />

                    <Menu defaultOpenKeys={["1"]} mode="inline">

                        {/* Price */}
                        <SubMenu
                            key="1"
                            title={<span className="h6">₹ Price</span>}
                        >
                            <div>
                                <Slider
                                    className="mx-3"
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max={100000}
                                    tooltip={{ formatter: (value) => `₹${value}` }}
                                />
                            </div>
                        </SubMenu>

                        {/* Category */}
                        <SubMenu
                            key="2"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Categories
                                </span>
                            }
                        >
                            <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
                        </SubMenu>

                        {/* Rating */}
                        <SubMenu
                            key="3"
                            title={
                                <span className="h6">
                                    <StarOutlined /> Rating
                                </span>
                            }
                        >
                            <div style={{ marginTop: "-10px" }}>{showStars()}</div>
                        </SubMenu>

                        {/* sub category */}
                        <SubMenu
                            key="4"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Sub Categories
                                </span>
                            }
                        >
                            <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                                {showSubs()}
                            </div>
                        </SubMenu>

                        {/* shipping */}
                        <SubMenu
                            key="7"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Shipping
                                </span>
                            }
                        >
                            <div style={{ maringTop: "-10px" }} className="pr-5">
                                {showShipping()}
                            </div>
                        </SubMenu>

                    </Menu>
                </div>

                {/* Product Grid */}
                <div className="col-md-9 pt-2">
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
