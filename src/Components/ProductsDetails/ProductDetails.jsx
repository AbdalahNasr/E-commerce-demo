import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from '../Context/CartContext.js';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  let { addToCart } = useContext(CartContext);
  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response?.data?.status === 'success') {
      toast.success('Product added to cart!', {
        duration: 2000,
        position: 'bottom-right',
      });
    } else {
      toast.error('Failed to add product to cart');
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let Params = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data } = useQuery('productDetails', () => getProductDetails(Params.id));

  return <>
    {data?.data.data ? <div className='row py-2 align-items-center '>
      <Helmet>
        <meta name="description" content="" />
        <title>{data?.data.data.title}</title>
      </Helmet>
      <div className="col-md-4">
        <Slider {...settings}>
          {data?.data.data.images.map((img, index) => <img key={index} alt={data?.data.data.title} src={img} className="w-100" />)}
        </Slider>
      </div>
      <div className="col-md-8">
        <h2 className="h5">{data?.data.data.title}</h2>
        <p>{data?.data.data.description}</p>
        <h6 className='text-main'>{data?.data.data.category?.name}</h6>
        <h6 className='text-main'>{data?.data.data.price}EGP</h6>
        <div className="d-flex justify-content-between">
          <span>ratingQuantity : {data?.data.data.ratingsQuantity} </span>
          <span> <i className="fas fa-star rating-color">{data?.data.data.ratingsAverage}</i></span>
        </div>
        <button onClick={() => addProductToCart(data?.data.data.id)} className="btn bg-main text-white w-100 mt-2">Add to cart</button>
      </div>
    </div> : ''}
  </>
}
