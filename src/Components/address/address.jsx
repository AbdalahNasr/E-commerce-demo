import React, { useContext } from 'react';
import style from './address.module.css';



import {useFormik} from 'formik'
import { CartContext } from '../Context/CartContext.js';
import { UserContext } from '../Context/UserContext.js';


export default function Address() {

  let {onlinePayment ,cartId} = useContext(CartContext)

async function handleAddressSubmit(values){
 let response = await onlinePayment(cartId, 'http://localhost:30000',values)
 console.log(response?.data.session.url);
 window.location.href = response?.data.session.url
  console.log(values );
}
  let formik = useFormik({
    initialValues: {
  details:'',
  phone:'',
  city:''
  
    },
    onSubmit:handleAddressSubmit
  
  
  })
  
  return <>
 <div className="container">
<form onSubmit={formik.handleSubmit} >

  <label htmlFor="details">Details : </label>
  <input value={formik.values.details} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="text" className="form-control mb-2" name='details' id='details' />
  
  <label htmlFor="phone">phone : </label>
  <input value={formik.values.phone} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="tel" className="form-control mb-2" name='phone' id='phone' />
  
  <label htmlFor="city">city : </label>
  <input value={formik.values.city} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="text" className="form-control mb-2" name='city' id='city' />

<button type='submit' className="btn text-info border-info w-100 mt-4"> pay now</button>

</form>

 </div>
 
   </>
}
