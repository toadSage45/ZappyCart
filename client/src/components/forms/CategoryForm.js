import React from 'react';
import { Spin } from 'antd';

const CategoryForm = ({ handleSubmit, name, setName, loading, text, icon }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label fw-semibold">Category Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name..."
                    autoFocus
                    required
                    disabled={loading}
                />
            </div>

            <div className="text-start">
                <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm rounded-pill px-4 py-2"
                    disabled={loading || !name}
                >
                    {loading ? <Spin size="small" /> : icon}
                    <span>{loading ? "Submitting..." : text}</span>
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
