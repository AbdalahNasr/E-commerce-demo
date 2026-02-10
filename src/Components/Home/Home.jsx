import React from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx'
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';
import { Helmet } from "react-helmet";

export default function Home() {
  return <>
    <Helmet>
      <meta name="description" content="" />
      <title>Fresh Cart</title>
    </Helmet>
    <MainSlider />
    <CategorySlider />
    <FeaturedProducts />
  </>
}
