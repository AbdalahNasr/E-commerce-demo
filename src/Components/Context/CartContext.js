     import { createContext, useEffect, useState } from "react";
   import axios from "axios";

    export let CartContext = createContext();

    let userToken = localStorage.getItem('userToken')
let headers = {
    token:userToken
}

    function addToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId:id
        },{headers
        }).then((Response)=>Response)
        .catch((error)=>error)
    }
    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers}).then((Response)=>Response)
        .catch((error)=>error)


    } 

    function removeCartItem(productId) {
      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
      .then((Response)=>Response)
      .catch((error)=>error) 
    }

    function updateProductQuantity(productId,count) {
return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
{count},{headers})  
.then((Response)=>Response)
        .catch((error)=>error)     
    }

    function onlinePayment(cartId,url,values) {
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
{shippingAddress:values},{headers})  
.then((Response)=>Response)
        .catch((error)=>error)     
    }

   export default  function CartContextProvider(props) {
const [cartId,setCartId] = useState(null)

async function getCart() {
  let data = await  getLoggedUserCart()

  // err when user logout
  setCartId(data?.data._id)
  console.log(data?.data._id);
}
useEffect(()=>{
getCart()
},[])
return<CartContext.Provider value={{ cartId,addToCart,onlinePayment,getLoggedUserCart,removeCartItem,updateProductQuantity}}>
    {props.children}
</CartContext.Provider>
        
     }

