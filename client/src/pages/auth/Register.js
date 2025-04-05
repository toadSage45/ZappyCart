import React, { useEffect, useState } from 'react'
import {auth , googleAuthProvider,sendSignInLinkToEmail} from '../../firebase.js'

import {toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const user = useSelector((state) => state.user)

  useEffect(() => {
  
          if(user && user.token){
              navigate("/");
          }
  
          },[user.token])
  


  const handleSubmit = async (e) => {
       e.preventDefault()
       const config = {
        url : process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp : true
       }

  await sendSignInLinkToEmail(auth , email , config)
  toast.success(`Email is sent to ${email}. Click the link to complete the registration`);

  //save user email in local storage

  window.localStorage.setItem('emailForRegistration' , email)
  
  //clear state
  setEmail('');
  }
  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" 
        className='form-control' 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        placeholder='Your email'
        autoFocus />

        <br/>
        <button type="submit" className="btn btn-primary btn-lg w-30 shadow-lg rounded-pill px-4 py-2">Register</button>
        </form>
    )
  }
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className="col-md-6 offset-md-3">
          <h4>
            Register
          </h4>
          <br/>
          {registerForm()}
        </div>
      </div>

    </div>
  )
}

export default Register