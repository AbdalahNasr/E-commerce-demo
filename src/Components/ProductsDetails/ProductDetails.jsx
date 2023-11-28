import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import {Helmet} from "react-helmet";
export default function ProductDetails() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    let Params =useParams();
     function getProductDetails(id) {
        console.log(id );
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) ;
        
    }
    let {isLoading,isError,data }  =useQuery('productDetails',()=>getProductDetails(Params.id));
    console.log(isError);
    console.log(data?.data.data);




//     console.log(params.id );
//     const [ productdetails ,setProductDetails] = useState(null)
//  async function getProductDetails(id) {
//    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//    setProductDetails(data) 
//    console.log(data);
// }

// useEffect(()=>{
// getProductDetails(params.id);

// } ,[])


  return <>
  {data?.data.data? <div className='row py-2 align-items-center '>
   <Helmet>
    <meta name="description" content="" />
               <title>{data?.data.data.title}</title>
            </Helmet>
    <div className="col-md-4">
    <Slider {...settings}>
    {data?.data.data.images.map((img)=> <img alt={data?.data.data.title} src={img}  className="w-100" /> )}
    </Slider>
    </div>
        {/* <img src={data?.data.data.imageCover} alt="data?.data.data.imageCover" className="w-100" /> */}
        <div className="col-md-8"> 
        <h2 className="h5">{data?.data.data.title}</h2>
        <p>{data?.data.data.description}</p>
        <h6  className='text-main'>{data?.data.data.category?.name}</h6>
        <h6  className='text-main'>{data?.data.data.price}EGP</h6>
        <div className="d-flex justify-content-between">
            <span>ratingQuantity : {data?.data.data.ratingsQuantity} </span>
            <span> <i className="fas fa-star rating-color">{data?.data.data.ratingsAverage}</i></span>
       
        </div>
        <button className="btn bg-main text-white w-100 mt-2">Add to cart</button>
         </div>
  </div>:'' } 

  </>
} 



