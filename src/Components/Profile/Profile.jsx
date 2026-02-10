import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext.js';

export default function Profile() {

  let { userData } = useContext(UserContext)

  return <>
    <h1>Hello : {userData?.name}</h1>
    <h1>Hello : {userData?.email}</h1>
  </>
}
