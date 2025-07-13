import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {
    EditOutlined,
} from "@ant-design/icons";
import {
    getCategory,
    updateCategory,
} from '../../../functions/category';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [oldName, setOldName] = useState("");

    const { token } = useSelector((state) => state.user);
    const { slug } = useParams();

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () => {
        getCategory(slug)
            .then((res) => {
                setOldName(res.data.name);
                setName(res.data.name);
            })
            .catch((err) => {
                if (err.response?.status === 400) toast.error(err.response.data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateCategory(slug, { changedName: name }, token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`✅ "${oldName}" updated to "${res.data.name}"`);
                navigate("/admin/category");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h3 className="mb-4 text-primary fw-semibold">✏️ Update Category</h3>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="fw-semibold mb-3">Edit Category: <span className="text-secondary">{oldName}</span></h5>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter new name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-warning d-flex align-items-center gap-2 px-4 text-white"
                                        disabled={loading || !name}
                                    >
                                        <EditOutlined style={{ fontSize: "16px" }} />
                                        {loading ? "Updating..." : "Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
