import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/brands.js';
import { BallTriangle } from 'react-loader-spinner';
import subCategories from '../SubCategories/SubCategories.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {getSpecificBrand} from '../../Redux/subCategories.js'

export default function Categories() {


  
  let { loading,isError,categories } = useSelector((state) => state.categories )
//  console.log({isError});
 let dispatch = useDispatch();
 
 useEffect(()=>{ 
dispatch(getCategories())
},[])



return <>
{loading? 
<div className="loading">
<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>

</div>

: 


<div className="row">
  {categories.map((brand)=> <div className="col-md-4 ">
<div className="subCategory cursor-pointer py-3 px-2 text-center border-40 rounded-50">
<Link to={`/SubCategories`}>
                        <img className='w-100  space' height={300} src={brand.image} alt='' />
  <div className='d-flex justify-content-center mb-2 bg-white text-main fw-bolder'>
  <h4 className="h3 my-2">{brand.name}</h4>
                        </div>


</Link>
</div>
  </div>

  )}

</div>
}
{/* <SubCategories/> */}
{/* <div>
      <h2>Subcategories</h2>
      <ul>
        {subcategories?.data.map((subcategory) => (
          <li key={subcategory.id}>{subcategory.name}</li>
        ))}
      </ul>
    </div> */}
  </>
}
