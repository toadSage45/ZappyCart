import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {
    DeleteFilled,
    EditOutlined,
    PlusCircleFilled,
} from "@ant-design/icons";
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [subs, setSubs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [keyword, setKeword] = useState("");

    const { token } = useSelector((state) => state.user);

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch(() => toast.error("Failed to load categories"));
    };

    const loadSubs = () => {
        getSubs()
            .then((res) => setSubs(res.data))
            .catch(() => toast.error("Failed to load subcategories"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category) {
            return toast.warning("Please select a parent category first");
        }
        setLoading(true);
        createSub({ name, parent: category }, token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`🎉 "${res.data.name}" created`);
                loadSubs();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (sub) => {
        if (window.confirm(`Are you sure to remove "${sub.name}"?`)) {
            setLoading(true);
            removeSub(sub.slug, token)
                .then((res) => {
                    setLoading(false);
                    toast.success(`🗑️ "${res.data.name}" deleted`);
                    loadSubs();
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response?.status === 400) toast.error(err.response.data);
                });
        }
    };

    const searched = (keyword) => (s) =>
        s.name.toLowerCase().includes(keyword.toLowerCase());

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h3 className="mb-4 text-primary fw-semibold">📂 Manage Sub Categories</h3>

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <h5 className="fw-semibold mb-3">➕ Create New Sub Category</h5>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Parent Category</label>
                                    <select
                                        name="category"
                                        className="form-control"
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Select Parent Category --</option>
                                        {categories.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter subcategory name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        className="btn btn-primary d-flex align-items-center gap-1 px-4"
                                        type="submit"
                                        disabled={loading || !name || !category}
                                    >
                                        <PlusCircleFilled style={{ fontSize: "16px" }} />
                                        {loading ? "Adding..." : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <LocalSearch keyword={keyword} setKeword={setKeword} />
                        <div className="card-body">
                            <h5 className="fw-semibold mb-3">📋 Sub Categories List</h5>

                            <ul className="list-group">
                                {subs.filter(searched(keyword)).map((s) => (
                                    <li
                                        key={s._id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="fw-medium">{s.name}</span>
                                        <span className="d-flex gap-2">
                                            <Link to={`/admin/sub/${s.slug}`} className="text-warning">
                                                <EditOutlined style={{ fontSize: "18px" }} />
                                            </Link>
                                            <span
                                                onClick={() => handleRemove(s)}
                                                style={{ cursor: "pointer" }}
                                                className="text-danger"
                                            >
                                                <DeleteFilled style={{ fontSize: "18px" }} />
                                            </span>
                                        </span>
                                    </li>
                                ))}
                                {subs.filter(searched(keyword)).length === 0 && (
                                    <li className="list-group-item text-muted text-center">
                                        No matching subcategories found.
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

export default SubCreate;
