import { createContext, useEffect, useState } from "react";
import axios from "axios";

 export let wishlistContext = createContext();

 let userToken = localStorage.getItem('userToken')
let headers = {
 token:userToken
}

 function addToWishList(id) {
     return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
     {productId:id
     },{headers
     }).then((Response)=>Response)
     .catch((error)=>error)
 }
 function getLoggedUserWishList() {
     return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
     {headers}).then((Response)=>Response)
     .catch((error)=>error)


 } 

 function removeWishListItem(productId) {
   return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
   .then((Response)=>Response)
   .catch((error)=>error) 
 }

 function updateProductQuantity(productId,count) {
return axios.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
{count},{headers})  
.then((Response)=>Response)
     .catch((error)=>error)     
 }

 function onlinePayment(wishlistId,url,values) {
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${wishlistId}?url=${url}`,
{shippingAddress:values},{headers})  
.then((Response)=>Response)
     .catch((error)=>error)     
 }

export default  function WishListContextProvider(props) {
const [wishlistId,setWishListId] = useState(null)

async function getWishList() {
let data = await  getLoggedUserWishList()

// err when user logout
setWishListId(data?.data._id)
console.log(data?.data._id);
}
useEffect(()=>{
getWishList()
},[])
return<wishlistContext.Provider value={{ wishlistId,addToWishList,onlinePayment,getLoggedUserWishList,removeWishListItem,updateProductQuantity}}>
 {props.children}
</wishlistContext.Provider>
     
  }

