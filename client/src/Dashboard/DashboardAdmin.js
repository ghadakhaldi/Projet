import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';

const DashboardAdmin = () => {
    const currentUser=useSelector(state=>state.userReducer.currentUser)

  return <div> <NavBar/>
  <h1>Welcome Mr admin{currentUser.fullName}</h1></div>;
};

export default DashboardAdmin;
