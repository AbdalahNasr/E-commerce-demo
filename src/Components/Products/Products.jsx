import styles from './Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { increase,decrease ,increaseByAmount} from '../../Redux/counterSlice.js';
import axios from 'axios';
import React, { useContext,useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import {BallTriangle} from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext.js';
import toast from 'react-hot-toast';
import ParentComponent from '../ParentComponent/ParentComponent.jsx'
// import WishList from '../WishList/WishList.jsx';
import { wishlistContext } from '../Context/wishListContext.js';


export default function Products() {
//  let {counter}= useSelector((state)=>state.counter)

//  let dispatch= useDispatch();

//   return <>
//     <h1>counter:{counter}</h1>
//     <button onClick={()=>dispatch(increase())}  className="btn btn-info ">increase</button>
//     <button onClick={()=>dispatch(decrease())}  className="btn btn-info mx-3">decrease</button>
//     <button onClick={()=>dispatch(increaseByAmount(30))}  className="btn btn-info ">increaseByAmount</button>


  // </>
  

  let {addToWishList } = useContext(wishlistContext)
  async function addProductToWishList(id) {

      let response = await addToWishList (id)
      if (response.data.status === 'success') {
           toast.success('product successfully added to your wishList',{
              duration:2000,
              position:'bottom-right',
           })
      }else{
toast.error('failed to add product to your wishList')
      }
      console.log(response);
  }
  let {addToCart} = useContext(CartContext)
  async function addProductToCart(id) {

      let response = await addToCart(id)
      if (response.data.status === 'success') {
           toast.success('product successfully added to your cart',{
              duration:2000,
              position:'bottom-right',
           })
      }else{
toast.error('failed to add product to your Cart')
      }
      console.log(response);
  }


  function getFeaturedProducts() {
       return axios.get((`https://ecommerce.routemisr.com/api/v1/products`))
  }
let {isLoading ,isError , data , isFetching,refetch } = useQuery('featuredProduct', getFeaturedProducts ,{
  cacheTime:9000,
  // refetchOnMount:true 
  // staleTime:6000
// refetchInterval:4000,
// enabled:false
})
// console.log(data?.data.data);


  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)

  // async function getFeaturedProducts() {
  //     setIsLoading(true)
  //     let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     console.log(data.data);
  //     setProducts(data.tata)
  //     setIsLoading(false)

  // }
  // useEffect(() => {
  //     getFeaturedProducts();
  //     console.log(getFeaturedProducts());
  // }, []);


  return <> 
  {isLoading ? <div className="w-100 py-5 d-flex justify-content-center">
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
</div>:<div className="container py-2">
  {/* <button onClick={()=> refetch()} className="btn bg-main text-white w-100 "> getProducts </button> */}
          <div className="row">
              <ParentComponent/>
              {data?.data.data.map((product) => 

              <div key={product.id} className="col-md-2">
                  <div className='product cursor-pointer py-3 px-2'>
                  <Link to={`/productdetails/${product.id}`}>
                      <img className='w-100 ' src={product.imageCover}alt={product.title} />
                      <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                      {/* come back later join err  */}
                      <h3 className='h6' >{product.title.split(' ').slice(0,3).join(' ')}</h3>
                      <div className='d-flex justify-content-between mt-3'>
                          <span> {product.price} EGP</span>
                          <span><i className="fas fa-star rating-color "></i>{product.ratingAverage}</span>
                      </div>
                  </Link>

                      <button onClick={()=> addProductToWishList(product.id)} className="  w-40 btn-sm mt-2"><i className="fas fa-heart "></i> </button>
                      <button onClick={()=> addProductToCart(product.id)} className="btn bg-main text-white w-100 btn-sm mt-2">add to cart</button>
                  </div>

              </div>)}
          </div>
      </div>
}
      {/* <div className="container py-2">
          <h2>Featured Products </h2>
          <div className="row">
              {products.map((product) => 
              <div key={product.id} className="col-md-2">
                  <div className='product'>
                      <img className='w-100 ' src={product.imageCover}alt={product.title} />
                      <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                      
                      <h3 className='h6' >{product.title.split("").slice(0,2).join('')}</h3>
                      <div className='d-flex justify-content-between mt-3'>
                          <span> {product.price} EGP</span>
                          <span><i className="fas fa-star rating-color "></i>{product.ratingAverage}</span>
                      </div>
                      <button className="btn bg-main text-white w-100 btn-sm mt-2">add to cart</button>
                  </div>

              </div>)}
          </div>
      </div> */}

  </>

}
