import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count  , setCount] = useState(5);

  useEffect(() => {
      
     const interval = setInterval(() => {
        setCount((currentCount) => --currentCount)
     } , 1000);

     //redirect once count is equal to zero;

     count == 0 && navigate("/");

     //cleanup
     return () => clearInterval(interval);

  } , [count]);

  return (
    <div className="container p-5 text-center">
        <p>
            Redirecting to Home Page in {count} seconds
        </p>
    </div>
  )
}

export default LoadingToRedirect