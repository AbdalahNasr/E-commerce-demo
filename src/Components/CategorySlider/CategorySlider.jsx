import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data } = useQuery('categorySlider', getCategory);

  return <>
    {data?.data.data ?
      <div className="py-3 ">
        <Slider {...settings}>
          {data?.data.data.map((category) => <img height={100} key={category._id} src={category.image} className='w-100' alt={category.name} />)}
        </Slider>
      </div> : ''}

    <h1>CategorySlider </h1>
  </>
}
