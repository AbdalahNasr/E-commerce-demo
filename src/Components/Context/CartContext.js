import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

function getHeaders() {
  return {
    token: localStorage.getItem('userToken')
  };
}

function addToCart(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    { productId: id },
    { headers: getHeaders() }
  ).then((Response) => Response)
    .catch((error) => error)
}

function getLoggedUserCart() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    { headers: getHeaders() }
  ).then((Response) => Response)
    .catch((error) => error)
}

function removeCartItem(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: getHeaders() })
    .then((Response) => Response)
    .catch((error) => error)
}

function updateProductQuantity(productId, count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count }, { headers: getHeaders() })
    .then((Response) => Response)
    .catch((error) => error)
}

function onlinePayment(cartId, url, values) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    { shippingAddress: values }, { headers: getHeaders() })
    .then((Response) => Response)
    .catch((error) => error)
}

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null)
  const [numOfCartItems, setNumOfCartItems] = useState(0)

  async function getCart() {
    let data = await getLoggedUserCart()

    // err when user logout
    if (data?.data && data.data._id) {
      setCartId(data.data._id)
      setNumOfCartItems(data.data.numOfCartItems || 0)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getCart()
    }
  }, [])

  return <CartContext.Provider value={{ cartId, numOfCartItems, addToCart, onlinePayment, getLoggedUserCart, removeCartItem, updateProductQuantity }}>
    {props.children}
  </CartContext.Provider>
}
