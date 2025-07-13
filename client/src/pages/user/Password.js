import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import {
    KeyOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { updatePassword } from 'firebase/auth';

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updatePassword(auth.currentUser, password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("🔐 Password updated successfully!");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>

                <div className="col-md-10">
                    <h3 className="mb-4 fw-semibold text-primary">
                        🔐 Update Password
                    </h3>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        New Password
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control pe-5"
                                            placeholder="Enter your new password"
                                            disabled={loading}
                                            value={password}
                                            required
                                            minLength={6}
                                        />
                                        <span
                                            className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                                        >
                                            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={password.length < 6 || loading}
                                    className="btn btn-danger btn-lg shadow rounded-pill px-4 py-2"
                                >
                                    <KeyOutlined /> &nbsp;
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Password;
