import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import {Formik,useFormik} from 'formik';
import axios from 'axios'
import { Rings } from  'react-loader-spinner'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.js';
export default function Login() {
  let {setUserToken , setUserData} = useContext(UserContext);
let navigate = useNavigate();
const [error , seterror] = useState(null)
const [ isLoading,setisLoading] = useState(false);
async function loginSubmit(values) {
  console.log(values);
  setisLoading(true);
 let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
 .catch(
  (err)=> {
    setisLoading(false);
    seterror(err.response.data.message )
  }
  // (err)=>console.log(err.response.data.message)
  );
console.log(data); 
if (data.message === 'success') {
  console.log(data.token);
  setisLoading(false);
  localStorage.setItem('userToken',data.token)
setUserToken(data.token)
setUserData(data.user)
  navigate('/')
 

}

}


let  validateSchema = Yup.object({
email:Yup.string().email('email is invalid').required('email is required'),
password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password  must start with upperCase').required(),
})

let formik = useFormik({
initialValues:{
  email:'',
  password:'',

},validateSchema,
onSubmit:loginSubmit
})
  return <>
<div className="w-75 mx-auto py-4">
  
  { error !== null ?<div className="alert alert-danger">{error}</div>:''}
  <h2>Login Now</h2>

  <form onSubmit={formik.handleSubmit}>

<label htmlFor="email">Email:</label>
<input className="form-control mb-2" value={formik.values.email}onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' type="email" id='email' />
{formik.errors.email && formik.touched.email ? <div className=' alert alert-danger p-2 mt-2'>{formik.errors.email}</div>:''}


<label htmlFor="password">password:</label>
<input className="form-control mb-2" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' type="password" id='password' />
{formik.errors.password && formik.touched.password ?  <div className=' alert alert-danger p-2 mt-2'>{formik.errors.password}</div>:''}

{isLoading?<button  className="btn bg-main text-white mt-2" type='button'>
<Rings
  height="30"
  width="80"
  color="#4fa94d"
  radius="6"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="rings-loading"
/>
</button> : <>
<div className="d-flex align-items-center">
<button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-white mt-2 mx-2" type='submit'>Login</button>
 
 <Link className='btn text-main' to={'/Register'}> Register Now </Link>
 <Link className='btn text-main' to={'/forget-Password'}> Forget Password</Link>

</div>
</>
}
  </form>
</div>
  </>
}



