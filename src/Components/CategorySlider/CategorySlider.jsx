import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import { getCategories } from '../../Redux/categoriesSlice.js';



export default function CategorySlider() {




  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  
  // const settings = {
  //   className: "center",
  //   centerMode: true,
  //   infinite: true,
  //   // centerPadding: "60px",
  //   slidesToShow: 3,
  //   speed: 500,
  //   rows: 2,
  //   slidesPerRow:2
  // }
  //put this in img when you find astable shape
  //className='w-100' 
  //height={100}
  function getCategory() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { isLoading, isError, data } = useQuery('categorySlider', getCategory);
  // console.log(data?.data.data);
  return <>
    {data?.data.data ?
      <div className="py-3 ">
        <Slider {...settings}>
          {data?.data.data.map((category) => <img height={100} key={category._id} src={category.image} className='w-100' />)}
        </Slider>
      </div> : ''}

    <h1>CategorySlider </h1>
  </>

}
