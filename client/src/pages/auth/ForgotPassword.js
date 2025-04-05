import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider, sendSignInLinkToEmail } from '../../firebase.js'
import { toast } from 'react-toastify'
import { sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUser } from '../../features/user/userSlice.js';
import { useNavigate, Link } from 'react-router-dom';



import {
    GoogleOutlined , 
    MailOutlined,
  } from "@ant-design/icons";
  


const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const user = useSelector((state) => state.user)
    //console.log(user);

    useEffect(() => {

        if(user && user.token){
            navigate("/");
        }

        },[user.token])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url : process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp : true,
           }
        await sendPasswordResetEmail(auth , email , config)
        .then(() => {
            setEmail('');
            setLoading(false);
            toast.success("Check your email for password reset link")
        }).catch( (error) => {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
            console.log("Error message" , error);
        });
    }

    return <div className='container col-md-6 offset-md-3 p-5 '>
        {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Forgot Password</h4>}

        
        <form onSubmit={handleSubmit}>

            <input type="email"
                className='form-control my-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                autoFocus
            />

            <button
                type="submit"
                className="btn btn-primary btn-lg w-100 shadow-lg rounded-pill px-4 py-2"
                disabled={!email}
            >{<MailOutlined />} &nbsp; Reset Password </button>

            

        </form>


    </div>
}

export default ForgotPassword;