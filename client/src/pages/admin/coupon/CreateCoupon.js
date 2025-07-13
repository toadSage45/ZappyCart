import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCoupon = () => {
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const currentYear = new Date().getFullYear();
    const [expiryMonth, setExpiryMonth] = useState(new Date().getMonth());
    const [expiryYear, setExpiryYear] = useState(currentYear);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

    const { token } = useSelector((state) => state.user);

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () => {
        getCoupons(token)
            .then((res) => setCoupons(res.data))
            .catch(() => toast.error("Failed to load coupons"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Last day of selected month
        const expiryDate = new Date(expiryYear, expiryMonth + 1, 0);

        createCoupon({ name, expiry: expiryDate, discount }, token)
            .then((res) => {
                setLoading(false);
                toast.success(`🎉 Coupon "${res.data.name}" created`);

                // Reset
                setName("");
                setDiscount("");
                setExpiryMonth(new Date().getMonth());
                setExpiryYear(currentYear);

                loadAllCoupons();
            })
            .catch(() => {
                setLoading(false);
                toast.error("Failed to create coupon");
            });
    };

    const handleRemove = (couponId) => {
        if (window.confirm("Delete this coupon?")) {
            setLoading(true);
            removeCoupon(couponId, token)
                .then((res) => {
                    toast.success(`🗑️ Coupon "${res.data.coupon.name}" deleted`);
                    loadAllCoupons();
                })
                .catch(() => toast.error("Delete failed"))
                .finally(() => setLoading(false));
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h3 className="mb-4 fw-semibold text-primary">🎟️ Manage Coupons</h3>

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label className="form-label fw-medium">Coupon Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value.toUpperCase())}
                                            placeholder="e.g. SUMMER50"
                                            disabled={loading}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-medium">Discount (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                            placeholder="e.g. 20"
                                            min={1}
                                            max={100}
                                            disabled={loading}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <label className="form-label fw-medium">Expiry Month</label>
                                        <select
                                            className="form-select"
                                            value={expiryMonth}
                                            onChange={(e) => setExpiryMonth(parseInt(e.target.value))}
                                            disabled={loading}
                                            required
                                        >
                                            {months.map((m, i) => (
                                                <option key={i} value={i}>{m}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-2">
                                        <label className="form-label fw-medium">Expiry Year</label>
                                        <select
                                            className="form-select"
                                            value={expiryYear}
                                            onChange={(e) => setExpiryYear(parseInt(e.target.value))}
                                            disabled={loading}
                                            required
                                        >
                                            {years.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-outline-primary mt-4"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Create Coupon"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="mb-3">📋 All Coupons</h5>

                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Expiry</th>
                                            <th>Discount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map((c) => (
                                            <tr key={c._id}>
                                                <td>{c.name}</td>
                                                <td>
                                                    {new Date(c.expiry).toLocaleDateString("en-IN", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td>{c.discount}%</td>
                                                <td>
                                                    <DeleteOutlined
                                                        onClick={() => handleRemove(c._id)}
                                                        className="text-danger"
                                                        style={{ cursor: "pointer", fontSize: "18px" }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        {coupons.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="text-center text-muted">
                                                    No coupons created yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateCoupon;
