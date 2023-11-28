import axios from 'axios';
import style from './ForgetPassword.module.css';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {


  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');

  // const handleInputChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email });
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage('An error occurred. Please try again.');
  //   }
  // };  
  // return (
  //   <div>
  //     <h2>Forgot Password</h2>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="email"
  //         placeholder="Enter your email"
  //         value={email}
  //         onChange={handleInputChange}
  //       />
  //       <button type="submit">Reset Password</button>
  //     </form>
  //     <p>{message}</p>
  //   </div>
  // );
  
  async function sendCode(values) {
    //   try {
    //   const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`);
    //   setMessage(data.data.message);
    // } catch (error) {
    //   setMessage('An error occurred. Please try again.');
    // }
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values);
console.log(data);
  console.log(values);
  if (data.statusMsg=='success') {
    document.querySelector('.forgetPassword').classList.add('d-none')
    document.querySelector('.verifyCode').classList.remove('d-none')
  }
}

let  validationSchema = Yup.object({
  email:Yup.string().email('email is invalid').required('email is required'),
  })
  
let formik=useFormik({ 
initialValues:{
  email:''
},
validationSchema:validationSchema
,
onSubmit:sendCode
})
let  validationSchemaAgain = Yup.object({
  resetCode:Yup.string().required('verify code is required'),
  })

  let navigate = useNavigate()
  async function sendVerifyCode(values) {
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values);
console.log(data);
  console.log(values);
  if (data.status=='Success') {
    navigate('/reset-Password')
  }
}

let verifyFormik=useFormik({ 
initialValues:{
  resetCode:''
},
validationSchema:validationSchemaAgain

,
onSubmit:sendVerifyCode
})

  return(
    <>
    <div className="forgetPassword w-75 my-5 m-auto">
      <form onSubmit={formik.handleSubmit}  className='w-75 mx-auto my-5 ' action="">
        <label >Email:</label>
        <input onBlur={formik.handleBlur} type="email" id="email" value={formik.values.email} onChange={formik.handleChange} className='form-control' />
        {formik.touched.email && formik.errors.email ? <p className=' text-danger my-3' >{formik.errors.email}</p>:'' }
        <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn bg-main text-white my-3 '>Send Code</button>
      </form>
    </div>
    <div className="verifyCode d-none ">
      <form onSubmit={verifyFormik.handleSubmit}  className='w-75 mx-auto my-5 ' action="">
        <label >ResetCode:</label>
        <input onBlur={verifyFormik.handleBlur} type="text" id="resetCode" value={verifyFormik.values.resetCode} onChange={verifyFormik.handleChange} className='form-control' />
        {verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? <p className=' text-danger my-3' >{verifyFormik.errors.resetCode}</p>:'' }
        <button disabled={!(verifyFormik.isValid&&verifyFormik.dirty)} type='submit' className='btn bg-main text-white my-3 '>Send Code</button>
      </form>
    </div>
    </>
  )

}  


