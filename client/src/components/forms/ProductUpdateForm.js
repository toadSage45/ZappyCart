import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    handleCategoryChange,
    setArrayOfSubIds,
    values,
    categories,
    subOptions,
    selectedCategory,
    arrayOfSubIds,
    PlusCircleOutlined
}) => {
    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        color,
        brand,
    } = values;

    return (
        <form onSubmit={handleSubmit} className="px-2">
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label fw-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={handleChange}
                        placeholder="Product title"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={price}
                        onChange={handleChange}
                        placeholder="Product price"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={handleChange}
                        placeholder="Product description"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={handleChange}
                        placeholder="Total stock"
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">Shipping</label>
                    <select
                        name="shipping"
                        className="form-control"
                        onChange={handleChange}
                        value={shipping}
                    >
                        <option value="">Please Select</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label fw-semibold">Color</label>
                    <input
                        type="text"
                        name="color"
                        className="form-control"
                        value={color}
                        onChange={handleChange}
                        placeholder="e.g. Red"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        className="form-control"
                        value={brand}
                        onChange={handleChange}
                        placeholder="e.g. Nike"
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Parent Category</label>
                    <select
                        name="category"
                        className="form-control"
                        onChange={handleCategoryChange}
                        value={selectedCategory ? selectedCategory : category._id}
                    >
                        <option>{category ? category.name : "Please Select"}</option>
                        {categories.length > 0 &&
                            categories.map((c) =>
                                c._id !== category._id ? (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ) : null
                            )}
                    </select>
                </div>

                <div className="col-12">
                    <label className="form-label fw-semibold">Sub Categories</label>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select sub categories"
                        value={arrayOfSubIds}
                        onChange={(value) => setArrayOfSubIds(value)}
                    >
                        {subOptions.length > 0 &&
                            subOptions.map((s) => (
                                <Option key={s._id} value={s._id}>
                                    {s.name}
                                </Option>
                            ))}
                    </Select>
                </div>
            </div>

            <div className="mt-4 d-flex justify-content-start">
                <button
                    type="submit"
                    className="btn btn-lg text-white shadow rounded-pill px-4 py-2"
                    style={{
                        background: "linear-gradient(to right, #007bff, #6610f2)",
                        border: "none",
                        transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = "linear-gradient(to right, #6610f2, #007bff)";
                        e.target.style.transform = "scale(1.02)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = "linear-gradient(to right, #007bff, #6610f2)";
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    <span className="me-2">{PlusCircleOutlined}</span>Update Product
                </button>
            </div>
        </form>
    );
};

export default ProductUpdateForm;
