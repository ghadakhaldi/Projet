import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux"
const AuthAdmin = ({children}) => {
    const currentUser=useSelector(state=>state.userReducer.currentUser)
  return <div>{currentUser&&currentUser.role=="admin"?children:<Navigate to="/dashboard"/>}</div>;
};

export default AuthAdmin;