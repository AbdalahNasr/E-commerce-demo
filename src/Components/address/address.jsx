import React, { useContext } from 'react';
import { useFormik } from 'formik'
import { CartContext } from '../Context/CartContext.js';

export default function Address() {

  let { onlinePayment, cartId } = useContext(CartContext)

  async function handleAddressSubmit(values) {
    let response = await onlinePayment(cartId, window.location.origin, values)
    if (response?.data?.session?.url) {
      window.location.href = response.data.session.url
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: handleAddressSubmit
  })

  return <>
    <div className="container">
      <form onSubmit={formik.handleSubmit} >
        <label htmlFor="details">Details : </label>
        <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control mb-2" name='details' id='details' />

        <label htmlFor="phone">phone : </label>
        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className="form-control mb-2" name='phone' id='phone' />

        <label htmlFor="city">city : </label>
        <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control mb-2" name='city' id='city' />

        <button type='submit' className="btn text-info border-info w-100 mt-4"> pay now</button>
      </form>
    </div>
  </>
}
