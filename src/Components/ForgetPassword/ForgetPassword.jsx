import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

  async function sendCode(values) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
      if (data.statusMsg === 'success') {
        document.querySelector('.forgetPassword').classList.add('d-none')
        document.querySelector('.verifyCode').classList.remove('d-none')
      }
    } catch (error) {
      console.error('Error sending reset code:', error?.response?.data?.message || error.message);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: sendCode
  })

  let validationSchemaAgain = Yup.object({
    resetCode: Yup.string().required('verify code is required'),
  })

  let navigate = useNavigate()
  async function sendVerifyCode(values) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
      if (data.status === 'Success') {
        navigate('/reset-Password')
      }
    } catch (error) {
      console.error('Error verifying code:', error?.response?.data?.message || error.message);
    }
  }

  let verifyFormik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: validationSchemaAgain,
    onSubmit: sendVerifyCode
  })

  return (
    <>
      <div className="forgetPassword w-75 my-5 m-auto">
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5 '>
          <label>Email:</label>
          <input onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className='form-control' />
          {formik.touched.email && formik.errors.email ? <p className=' text-danger my-3' >{formik.errors.email}</p> : ''}
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-3 '>Send Code</button>
        </form>
      </div>
      <div className="verifyCode d-none ">
        <form onSubmit={verifyFormik.handleSubmit} className='w-75 mx-auto my-5 '>
          <label>ResetCode:</label>
          <input onBlur={verifyFormik.handleBlur} type="text" id="resetCode" name="resetCode" value={verifyFormik.values.resetCode} onChange={verifyFormik.handleChange} className='form-control' />
          {verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? <p className=' text-danger my-3' >{verifyFormik.errors.resetCode}</p> : ''}
          <button disabled={!(verifyFormik.isValid && verifyFormik.dirty)} type='submit' className='btn bg-main text-white my-3 '>Send Code</button>
        </form>
      </div>
    </>
  )
}
