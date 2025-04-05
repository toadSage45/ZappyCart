import React, { useState } from 'react'
import { auth, googleAuthProvider, sendSignInLinkToEmail } from '../../firebase.js'
import { Button, ConfigProvider, Space } from 'antd';
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../../features/user/userSlice.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault()
    //console.table(email, password);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      //console.log(result);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch(loggedInUser({
        email: user.email,
        token: idTokenResult.token,
      }));
      navigate("/");
      toast.success("Logged in Successfully");

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }

  };
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="email"
            className='form-control'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Your email'
            autoFocus />
        </div>
        <br />
        <div className="form-group">
          <input type="password"
            className='form-control'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Your Password'
          />
        </div>

        <br />
        <button
          type="submit"
          className="btn btn-primary btn-lg w-30 shadow-lg rounded-pill px-4 py-2"
          onClick={handleSubmit}
          disabled={!email || password.length < 6}
        >Login</button>
      </form>
    )
  }
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className="col-md-6 offset-md-3">
          <h4>
            Login
          </h4>
          <br />
          {loginForm()}
        </div>
      </div>

    </div>
  )
}

export default Login