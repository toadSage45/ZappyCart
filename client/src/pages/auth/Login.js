import React, { useEffect, useState } from 'react'
import { auth, googleAuthProvider, sendSignInLinkToEmail } from '../../firebase.js'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUser } from '../../features/user/userSlice.js';
import { useNavigate  , Link} from 'react-router-dom';


import {
  GoogleOutlined , 
  MailOutlined,
} from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)

useEffect(() => {

        if(user && user.token){
            navigate("/");
        }

        },[user.token])


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
  const googleLogin = async () => {
    signInWithPopup(auth , googleAuthProvider).then(
      async (result) => {
        const {user} = result
        const idTokenResult = await user.getIdTokenResult();

      dispatch(loggedInUser({
        email: user.email,
        token: idTokenResult.token,
      }));
      navigate("/");
      toast.success("Logged in Successfully");
      }
    ).catch( (error) => {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    } )
  }


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
          className="btn btn-primary btn-lg w-100 shadow-lg rounded-pill px-4 py-2"
          onClick={handleSubmit}
          disabled={!email || password.length < 6}
        >{<MailOutlined/>} &nbsp; Email Login</button>
      </form>
    )
  }
  return (
    <div className='container p-5 '>
      <div className='row'>
        <div className="col-md-6 offset-md-3">
          {!loading ?
           <h4>Login</h4> :
            <h4 className='text-danger'>Loading....</h4>}
          <br />
          {loginForm()}

          <button
          type="submit"
          className="btn btn-danger btn-lg w-100 shadow-lg rounded-pill px-4 py-2 my-4"
          onClick={googleLogin}
        ><GoogleOutlined/>
        &nbsp;
         Google Login
          </button>
        
        <Link to="/forgot/password" className='float-right text-danger'>
        Forgot Password
        </Link>
        </div>
      </div>

    </div>
  )
}

export default Login