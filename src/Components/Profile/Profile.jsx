import React, { useContext, useEffect } from 'react';
import style from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import { UserContext } from '../Context/UserContext.js';



export default function Profile() {

let {userData} = useContext(UserContext)
useEffect(()=>{
  let encodedToken =  localStorage.getItem('userToken')
  let decodedToken = jwtDecode(encodedToken)

},[])


  return <>
    <h1>Hello : {userData?.name}</h1>
    <h1>Hello : {userData?.email}</h1>
  </>
}
