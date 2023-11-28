// import React, { useContext, useEffect } from 'react';
// import styles from './Home.module.css';
import Products from '../Products/Products.jsx';
// import Navbar from '../Navbar/Navbar.jsx';
// import { CounterContext } from '../Context/CounterContext.js';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx'
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';
import {Helmet} from "react-helmet";
// import axios from 'axios';
export default function Home() {
//   let {changeCounter} = useContext(CounterContext)
//  let userName = "ahmed"


  return <>
     <Helmet>
    <meta name="description" content="" />
               <title>Freash Cart</title>
            </Helmet>

<MainSlider/>
<CategorySlider/>
<FeaturedProducts/>
{/* <button onClick={()=>changeCounter()} className='btn btn-danger'> onChange </button> */}

{/* <Products userName={userName}>
  <cart/>
  <Navbar/>
  <Footer/>
</Products> */}

     {/* <h1>Home</h1> */}
    {/* <h1>Home</h1>
    <button className='btn bg-main text-white'>Hi</button> */}
  </>
}
