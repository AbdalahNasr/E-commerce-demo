import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let wishlistContext = createContext();

function getHeaders() {
  return {
    token: localStorage.getItem('userToken')
  };
}

function addToWishList(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId: id },
    { headers: getHeaders() }
  ).then((Response) => Response)
    .catch((error) => error)
}

function getLoggedUserWishList() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    { headers: getHeaders() }
  ).then((Response) => Response)
    .catch((error) => error)
}

function removeWishListItem(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: getHeaders() })
    .then((Response) => Response)
    .catch((error) => error)
}

function updateProductQuantity(productId, count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    { count }, { headers: getHeaders() })
    .then((Response) => Response)
    .catch((error) => error)
}

export default function WishListContextProvider(props) {
  const [wishlistId, setWishListId] = useState(null)

  async function getWishList() {
    let data = await getLoggedUserWishList()

    // err when user logout
    if (data?.data && data.data._id) {
      setWishListId(data.data._id)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getWishList()
    }
  }, [])

  return <wishlistContext.Provider value={{ wishlistId, addToWishList, getLoggedUserWishList, removeWishListItem, updateProductQuantity }}>
    {props.children}
  </wishlistContext.Provider>
}
