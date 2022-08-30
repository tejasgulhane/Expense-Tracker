import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
// import AuthContext from '../store/auth-context';
import Welcome from './Welcome'; 
import { useSelector } from 'react-redux';


const HomePage = () => {
    const [forgotpass ,setforgotpass ] = useState(false)
    const isLoggedIn =useSelector( state =>state.auth.isLoggedIn )


  return (
    <>

     <AuthForm /> 
       {/* { isLoggedIn && <Welcome /> } */}

    </>
  )
}

export default HomePage