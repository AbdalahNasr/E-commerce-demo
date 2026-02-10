import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../Context/wishListContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function WishList() {
  let { getLoggedUserWishList, removeWishListItem } = useContext(wishlistContext);

  const [wishListItems, setWishListItems] = useState(null)

  async function removeItem(id) {
    let response = await removeWishListItem(id)
    if (response?.data?.status === 'success') {
      toast.success('Product removed from wishlist');
      getWishList(); // refresh list
    } else {
      toast.error('Failed to remove product');
    }
  }

  async function getWishList() {
    let response = await getLoggedUserWishList()
    if (response?.data) {
      setWishListItems(response.data);
      console.log(response.data)
    }
  }

  useEffect(() => {
    getWishList();
  }, [])

  return <>
    {wishListItems ? <div className="w-75 mx-auto my-2 p-3 bg-main-light">
      <h3>My Wish List</h3>
      <h4 className="h6 text-main fw-bolder">Items: {wishListItems.count || 0}</h4>
      {wishListItems.data?.map((product) => <div key={product.id || product._id} className="row border-bottom py-2 px-2">
        <div className="col-md-2">
          <img className='w-100' src={product.imageCover} alt={product.title} />
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h6">{product.title?.split(' ').slice(0, 3).join(' ')}</h3>
              <h6 className='text-main'>Price: {product.price} EGP</h6>
            </div>
          </div>
          <button onClick={() => removeItem(product.id || product._id)} className='btn p-0'>
            <i className="text-danger font-sm fas fa-trash-can"></i> Remove
          </button>
        </div>
      </div>)}
    </div>
      : <section id='loading' className='d-flex justify-content-center align-items-center' >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </section>}
  </>
}
