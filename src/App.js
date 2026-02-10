import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile.jsx'
import { Provider } from "react-redux";
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import CounterContextProvider from './Components/Context/CounterContext.js';
import { UserContext } from './Components/Context/UserContext.js';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductsDetails/ProductDetails.jsx';
import CartContextProvider from './Components/Context/CartContext.js';
import { Toaster } from 'react-hot-toast';
import { store } from './Redux/Store.js';
import Address from './Components/address/address.jsx';
import Orders from './Components/Orders/Orders.jsx';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import SubCategories from './Components/SubCategories/SubCategories.jsx';
import WishList from './Components/WishList/WishList.jsx';
import HeartButton from './Components/HeartButton/HeartButton.jsx';
import WishListContextProvider from './Components/Context/wishListContext.js';

let routes = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'SubCategories', element: <ProtectedRoute><SubCategories /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'WishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'HeartButton', element: <ProtectedRoute><HeartButton /></ProtectedRoute> },
      { path: 'Profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Login', element: <Login /> },
      { path: 'forget-Password', element: <ForgetPassword /> },
      { path: 'reset-Password', element: <ResetPassword /> },
      { path: 'Register', element: <Register /> },
    ]
  }
])

function App() {
  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [setUserToken]);

  return <CartContextProvider>
    <WishListContextProvider>
      <CounterContextProvider>
        <Provider store={store} >
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </Provider>
      </CounterContextProvider>
    </WishListContextProvider>
  </CartContextProvider>
}

export default App;
