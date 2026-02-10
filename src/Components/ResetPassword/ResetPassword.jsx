import React, { useState } from 'react';
import style from './ResetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  async function ResetPasswordNow(values) {
    try {
      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
      console.log(data);
      if (data.token) {
        localStorage.setItem('userToken', data.token);
        navigate('/Login');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to reset password. Please try again.');
      console.error(err);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    onSubmit: ResetPasswordNow
  })

  return (
    <div className="resetPassword w-75 mx-auto my-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' id="email" value={formik.values.email} />
        <label htmlFor="newPassword">New Password :</label>
        <input type="password" name="newPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' id="newPassword" value={formik.values.newPassword} />
        <button type="submit" className='btn bg-main text-light my-3'>Reset Password</button>
      </form>
    </div>
  )
}
