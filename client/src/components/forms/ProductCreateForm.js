import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({
    values,
    setValues,
    handleChange,
    handleSubmit,
    handleCategoryChange,
    subOptions,
    showSub,
    PlusCircleOutlined,
    fileUploadComponent
}) => {
    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        color,
        brand,
        images
    } = values;

    return (
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <div className="form-group mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter product description"
                    required
                />
            </div>

            <div className="row">
                <div className="form-group mb-3 col-md-6">
                    <label className="form-label fw-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                    />
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label className="form-label fw-semibold">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="form-group mb-3 col-md-6">
                    <label className="form-label fw-semibold">Shipping</label>
                    <select
                        name="shipping"
                        className="form-control"
                        onChange={handleChange}
                        value={shipping}
                        required
                    >
                        <option value="">Select</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label className="form-label fw-semibold">Color</label>
                    <input
                        type="text"
                        name="color"
                        className="form-control"
                        value={color}
                        onChange={handleChange}
                        placeholder="e.g. Red, Black"
                    />
                </div>
            </div>

            <div className="form-group mb-3">
                <label className="form-label fw-semibold">Brand</label>
                <input
                    type="text"
                    name="brand"
                    className="form-control"
                    value={brand}
                    onChange={handleChange}
                    placeholder="e.g. Apple, Samsung"
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label fw-semibold">Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.length > 0 &&
                        categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            {showSub && (
                <div className="form-group mb-3">
                    <label className="form-label fw-semibold">Sub Categories</label>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select sub categories"
                        value={subs}
                        onChange={(value) => setValues({ ...values, subs: value })}
                    >
                        {subOptions.length > 0 &&
                            subOptions.map((s) => (
                                <Option key={s._id} value={s._id}>
                                    {s.name}
                                </Option>
                            ))}
                    </Select>
                </div>
            )}

            {/* Image Upload */}
            <div className="form-group mb-4">
                <label className="form-label fw-semibold d-block">Images</label>
                {fileUploadComponent}
                <div className="mt-3 d-flex flex-wrap gap-2">
                    {images &&
                        images.map((img) => (
                            <img
                                key={img.public_id}
                                src={img.url}
                                alt="preview"
                                className="img-thumbnail"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        ))}
                </div>
            </div>

            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-success px-4 py-2 fw-semibold rounded-pill shadow"
                >
                    {PlusCircleOutlined} &nbsp; Save Product
                </button>
            </div>
        </form>
    );
};

export default ProductCreateForm;
