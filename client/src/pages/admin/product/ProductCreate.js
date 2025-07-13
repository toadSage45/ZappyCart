import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';

const initialState = {
    title: "",
    description: "",
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    color: '',
    brand: ''
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.user);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories()
            .then((res) => {
                setValues(prev => ({
                    ...prev,
                    categories: res.data,
                }));
            })
            .catch(() => {
                toast.error("Failed to load categories");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createProduct(values, token)
            .then((res) => {
                toast.success(`🎉 "${res.data.title}" created successfully!`);
                setValues(initialState);
                setSubOptions([]);
                setShowSub(false);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.status === 400) toast.error(err.response.data);
                else toast.error("Product creation failed");
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setValues({ ...values, category: selected, subs: [] });

        getCategorySubs(selected)
            .then((res) => {
                setSubOptions(res.data);
                setShowSub(true);
            })
            .catch(() => {
                toast.error("Failed to load subcategories");
            });
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h3 className="mb-4 fw-semibold text-primary d-flex align-items-center gap-2">
                        {loading && <LoadingOutlined className="text-danger" spin />}
                        🛍️ Create New Product
                    </h3>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="fw-semibold mb-3 text-secondary">📝 Product Details</h5>

                            {/* File Upload (Image Preview + Select) */}
                            <div className="mb-4">
                                <h6 className="text-muted mb-2">🖼️ Upload Images</h6>
                                <FileUpload
                                    values={values}
                                    setValues={setValues}
                                    setLoading={setLoading}
                                />
                            </div>

                            {/* Product Create Form */}
                            <ProductCreateForm
                                values={values}
                                setValues={setValues}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handleCategoryChange={handleCategoryChange}
                                subOptions={subOptions}
                                showSub={showSub}
                                PlusCircleOutlined={<PlusCircleOutlined />}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
