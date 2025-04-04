import React, { useState , useEffect} from 'react'
import {auth , googleAuthProvider,sendSignInLinkToEmail} from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify'
import { signInWithEmailLink, updatePassword } from 'firebase/auth';


const RegisterComplete = () => {
 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const [password  , setPassword] = useState('');

  useEffect( () => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  } , [])

  const handleSubmit = async (e) => {
       e.preventDefault();

       if(!email || !password){
        toast.error("Email and Password is required");
        return;
       }

       if(password.length < 6){
        toast.error("Password must be 6 characters long");
        return;
       }


       try {
        
        const result = await signInWithEmailLink(auth , email , window.location.href )

        //console.log("Result" ,result);

        if(result.user.emailVerified){
            //remove user email from local storage
            window.localStorage.removeItem('emailForRegistration');
            //get user id token
            let user = auth.currentUser

            await updatePassword(user , password);

            const idTokenResult = await user.getIdTokenResult()

            //redux store
            console.log('user' , user ,"idTokenResult" , idTokenResult);

            //redirect
            //history.push('/')
            navigate("/");

        }


       } catch (error) {
         console.log(error);
         toast.error(error.message);
       }
      
  }
  const CompleteRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" 
        className='form-control' 
        value={email} 
        disabled
        
        />
        <input type="password" 
        className='form-control' 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        autoFocus
        placeholder="Password"
        
        />

        <br/>
        <button type ="submit" className='btn btn-raised'> Complete Registration  </button>
      </form>
    )
  }
  return (
    <div className='container p-5'>
      <div className='row'>
        <div class="col-md-6 offset-md-3">
          <h4>
            Register Complete
          </h4>
          {CompleteRegistrationForm()}
        </div>
      </div>

    </div>
  )
}

export default RegisterComplete