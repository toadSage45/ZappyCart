import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {
    DeleteFilled,
    EditOutlined,
    PlusCircleFilled,
} from "@ant-design/icons";
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.user);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeword] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
            .catch((err) => {
                if (err.response?.status === 400) toast.error(err.response.data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`🎉 "${res.data.name}" created`);
                loadCategories();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (c) => {
        if (window.confirm(`Are you sure to remove "${c.name}"?`)) {
            setLoading(true);
            removeCategory(c.slug, token)
                .then((res) => {
                    setLoading(false);
                    loadCategories();
                    toast.success(`🗑️ "${res.data.name}" deleted`);
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response?.status === 400) toast.error(err.response.data);
                });
        }
    };

    const searched = (keyword) => (c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase());

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h3 className="mb-4 text-primary fw-semibold">📂 Manage Categories</h3>

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <h5 className="fw-semibold mb-3">➕ Create New Category</h5>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter category name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        className="btn btn-primary d-flex align-items-center gap-1 px-4"
                                        type="submit"
                                        disabled={loading || !name}
                                    >
                                        <PlusCircleFilled style={{ fontSize: "16px" }} />
                                        {loading ? "Adding..." : "Add"}
                                    </button>
                                </div>
                            </form>

                            
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        
                        <div className="card-body">
                            <LocalSearch
                                keyword={keyword}
                                setKeword={setKeword}
                            />
                            <h5 className="fw-semibold mb-3">📋 Categories List</h5>

                            <ul className="list-group">
                                {categories.filter(searched(keyword)).map((c) => (
                                    <li
                                        key={c._id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="fw-medium">{c.name}</span>
                                        <span className="d-flex gap-2">
                                            <Link to={`/admin/category/${c.slug}`} className="text-warning">
                                                <EditOutlined style={{ fontSize: "18px" }} />
                                            </Link>
                                            <span
                                                onClick={() => handleRemove(c)}
                                                style={{ cursor: "pointer" }}
                                                className="text-danger"
                                            >
                                                <DeleteFilled style={{ fontSize: "18px" }} />
                                            </span>
                                        </span>
                                    </li>
                                ))}
                                {categories.filter(searched(keyword)).length === 0 && (
                                    <li className="list-group-item text-muted text-center">
                                        No matching categories found.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
