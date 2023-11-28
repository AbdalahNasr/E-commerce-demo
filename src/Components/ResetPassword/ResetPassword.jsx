import React from 'react';
import style from './ResetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

 async function ResetPasswordNow(values) {
  // Err
  // let navigate = useNavigate()
  const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values);
  console.log(data);
  console.log(data.token);
// Err
  //  if(data.token) {
  //  navigate('/Login')
  //  }
  }

  let formik =useFormik({
    initialValues: {
      email:'',
      newPassword:'',
    },
    onSubmit:ResetPasswordNow
  })
  return(
<div className="resetPassword">
<form onSubmit={formik.handleSubmit}>
  <label htmlFor="">Email :</label>
  <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id="email" value={formik.values.email} />
  <label htmlFor="">Password :</label>
  <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id="newPassword" value={formik.values.newPassword} />
<button className='btn bg-main text-light my-3'>ResetPassword</button>

</form>

</div>

  )
  
}
