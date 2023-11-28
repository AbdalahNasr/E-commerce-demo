import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../Context/wishListContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Link  } from 'react-router-dom';

export default function WishList() {
  // let { getLoggedUserWishList, removeWishListItem, updateProductQuantity } = useContext(wishlistContext);

  // const [wishList, setWishList] = useState(null)

  // async function updateCount(id, count) {
  //   let { data } = await updateProductQuantity(id, count);
  //   setWishList(data)
  // }
  // async function removeItem(id) {
  //   let { data } = await removeWishListItem(id)
  //   setWishList(data)
  // }

  // async function getCart() {
  //   let { data } = await getLoggedUserWishList()
  //   setWishList(data);
  //   console.log(data)
  // }
  // useEffect(() => {
  //   getCart();
  // }, [])
  // return <>
  //   {wishList ? <div className="w-75 mx-auto my-2 p-3 bg-main-light">
  //     <h3>Shopping Cart</h3>
  //     <h4 className="h6 text-main fw-bolder">Cart Items: {wishList.numOfCartItems} </h4>
  //     <h4 className="h6 text-main fw-bolder mb-4">Total Cart Price: {wishList.data.totalCartPrice} EGP </h4>
  //     {wishList.data.products.map((product => <div key={product.product.id} className="row border-bottom py-2 px-2 ">
  //       <div className="col-md-1">
  //         <img className='w-100' src={product.product.imageCover} alt="" srcset="" />
  //       </div>
  //       <div className="col-md-11">
  //         <div className="d-flex justify-content-between align-items-center">
  //           <div className="">
  //             <h3 className="h6">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
  //             <h6 className='text-main'>Price: {product.price}EGP</h6>
  //           </div>
  //           <div className="">
  //             <button onClick={()=>updateCount(product.product.id,product.count + 1 )} className= 'btn brdr-main p-1'>+</button>
  //             <span className='mx-2 '>{product.count}</span>
  //             <button onClick={()=>updateCount(product.product.id,product.count - 1)} className='btn brdr-main p-1'>-</button>
  //           </div>
  //         </div>
  //         <button onClick={() => removeItem(product.product.id)} className='btn  p-0'> <i className="text-danger font-sm fas fa-trash-can"></i>Remove</button>
       
       
       
       
  //       </div>
  //     </div>))}

  //     <Link to={'/address'} className="btn mt-2  m-2 bg-main w-25 text-white"> online payment</Link>
  //     <button className="btn  mt-2 m-2  bg-main w-25 text-white"> cash on delivery</button>

  //   </div>
  //     : <section id='loading' className='d-flex justify-content-center align-items-center' >

  //       <BallTriangle
  //         height={100}
  //         width={100}
  //         radius={5}
  //         color="#4fa94d"
  //         ariaLabel="ball-triangle-loading"
  //         wrapperClass={{}}
  //         wrapperStyle=""
  //         visible={true}
  //       />

  //     </section>}
  // </>

  let { getLoggedUserWishList, removeCartItem, updateProductQuantity } = useContext(wishlistContext);

  const [cartDetails, setCartDetails] = useState(null)

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data)
  }
  async function removeItem(id) {
    let { data } = await removeCartItem(id)
    setCartDetails(data)
  }

  async function getCart() {
    let { data } = await getLoggedUserWishList()
    setCartDetails(data);
    console.log(data)
  }
  useEffect(() => {
    getCart();
  }, [])
  return <>
    {cartDetails ? <div className="w-75 mx-auto my-2 p-3 bg-main-light">
      <h3>Shopping Cart</h3>
      <h4 className="h6 text-main fw-bolder">Cart Items: {cartDetails.numOfCartItems} </h4>
      <h4 className="h6 text-main fw-bolder mb-4">Total Cart Price: {cartDetails.data.totalCartPrice} EGP </h4>
      {cartDetails.data.products.map((product => <div key={product.product.id} className="row border-bottom py-2 px-2 ">
        <div className="col-md-1">
          <img className='w-100' src={product.product.imageCover} alt="" srcset="" />
        </div>
        <div className="col-md-11">
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <h3 className="h6">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
              <h6 className='text-main'>Price: {product.price}EGP</h6>
            </div>
            <div className="">
              <button onClick={()=>updateCount(product.product.id,product.count + 1 )} className= 'btn brdr-main p-1'>+</button>
              <span className='mx-2 '>{product.count}</span>
              <button onClick={()=>updateCount(product.product.id,product.count - 1)} className='btn brdr-main p-1'>-</button>
            </div>
          </div>
          <button onClick={() => removeItem(product.product.id)} className='btn  p-0'> <i className="text-danger font-sm fas fa-trash-can"></i>Remove</button>
       
       
       
       
        </div>
      </div>))}

      <Link to={'/address'} className="btn mt-2  m-2 bg-main w-25 text-white"> online payment</Link>
      <button className="btn  mt-2 m-2  bg-main w-25 text-white"> cash on delivery</button>

    </div>
      : <section id='loading' className='d-flex justify-content-center align-items-center' >

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

      </section>}
  </>

}


