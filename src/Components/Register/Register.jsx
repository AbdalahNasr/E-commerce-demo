import React, { useState } from 'react';
import styles from './Register.module.css';
import {Formik,useFormik} from 'formik';
import axios from 'axios'
import { Puff } from  'react-loader-spinner'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
export default function Register() {
let navigate = useNavigate();
const [error , seterror] = useState(null)
const [ isLoading,setisLoading] = useState(false);
async function registerSubmit(values) {
  console.log(values);
  setisLoading(true);
 let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
 .catch(
  (err)=> {
    setisLoading(false);
    seterror(err.response.data.message )
  }
  // (err)=>console.log(err.response.data.message)
  );
console.log(data); 
if (data.message === 'success') {
  setisLoading(false);
  navigate('/login')
 

}

}


let phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
let  validateSchema = Yup.object({
  name:Yup.string().min(3,'name min length is 3 characters').max(10,'name max length is 10').required('name is required'), 
// age:Yup.number().min(16).max(80),
email:Yup.string().email('email is invalid').required('email is required'),
phone:Yup.string().matches(phoneRegExp, 'phone is invalid').required(),
password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password  must start with upperCase').required(),
rePassword:Yup.string().oneOf([Yup.ref('password'),'re password must match the password you created above']).required()
})

let formik = useFormik({
initialValues:{
  name:'',
  phone:'',
  email:'',
  password:'',
  rePassword:''

},validateSchema,
onSubmit:registerSubmit
})
  return <>
<div className="w-75 mx-auto py-4">
  
  { error !== null ?<div className="alert alert-danger">{error}</div>:''}
  <h2>Register Now</h2>

  <form onSubmit={formik.handleSubmit}>
<label htmlFor="name">Name:</label>
<input className="form-control mb-2" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name='name' type="text" id='name' />
{formik.errors.name && formik.touched.name ? <div className=' alert alert-danger p-2 mt-2'>{formik.errors.name}</div>:''}

<label htmlFor="email">Email:</label>
<input className="form-control mb-2" value={formik.values.email}onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' type="email" id='email' />
{formik.errors.email && formik.touched.email ? <div className=' alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:''}


<label htmlFor="phone">phone:</label>
<input className="form-control mb-2" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' type="tel" id='phone' />
{formik.errors.phone && formik.touched.phone ? <div className=' alert alert-danger p-2 mt-2'>{formik.errors.phone}</div>:''}
{/* {Formik.errors.phone&& formik.touched.phone.} */}
<label htmlFor="password">password:</label>
<input className="form-control mb-2" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' type="password" id='password' />
{formik.errors.password && formik.touched.password ?  <div className=' alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:''}

<label htmlFor="rePassword">rePassword:</label>
<input className="form-control mb-2" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name='rePassword' type="password" id='rePassword' />
{formik.errors.rePassword && formik.touched.rePassword ? <div className=' alert alert-danger p-2 mt-2'>{formik.errors.rePassword} </div>:''}
{isLoading?<button  className="btn bg-main text-white mt-2" type='button'>
<Puff
  height="20"
  width="80"
  radius={1}
  color="#ffff"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></button>:<button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-white mt-2" type='submit'>Register</button>
}
  </form>
</div>
  </>
}



