import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav.js'
import {
    KeyOutlined,
    EyeInvisibleOutlined,
    EyeOutlined
} from "@ant-design/icons";
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
import { updatePassword } from 'firebase/auth';  



const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        //console.log(password);
        await updatePassword(auth.currentUser, password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password updated Successfully");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            })
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your Password</label>
                    <div class="position-relative">
                    <input type= {showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control'
                        placeholder='Enter new password'
                        disabled={loading}
                        value={password}
                    />
                    <span
                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer", fontSize: "1.2rem" }}
                    >
                        {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                    </div>

                    <button
                        type="submit"
                        disabled={password.length < 6 || loading}
                        className="btn btn-danger btn-lg w-20 shadow-lg rounded-pill px-4 py-2 my-4"
                    ><KeyOutlined />
                        &nbsp;
                        {loading ? <span>Updating password</span> : <span>Submit</span>}
                    </button>
                </div>



            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"> <UserNav /> </div>

                <div className="col">
                    <h4>Update Password</h4>
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
};

export default Password