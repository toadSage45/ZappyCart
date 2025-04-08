import React from 'react';
import { useSelector } from 'react-redux';
import {Route , Link} from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';


const UserRoute = ({children}) => {

    const user = useSelector((state) => state.user) ;
    
    return user && user.token ? children
      : 
    <LoadingToRedirect />
}

export default UserRoute