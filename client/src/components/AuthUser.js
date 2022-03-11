import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthUser = ({children}) => {
    const token=localStorage.getItem("token")
  return <div>{token?children:<Navigate to="/signin"/>}</div>;
};

export default AuthUser;
