import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Route , Link} from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';


const AdminRoute = ({children}) => {

    const user = useSelector((state) => state.user) ;

    const [ok , setOk] = useState(false);

    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then( (res) => {
                console.log("Current Admin Response" , res)
                setOk(true);
            })
            .catch( (err) => {
                console.log("Admin route err" , err)
                setOk(false);
            }

            )
        }
    } , [user])
    
    return ok ? children
      : 
    <LoadingToRedirect />
}

export default AdminRoute