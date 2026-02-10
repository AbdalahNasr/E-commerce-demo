import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { CartContext } from '../Context/CartContext.js';
import { UserContext } from '../Context/UserContext.js';

export default function Navbar() {
  let { getLoggedUserCart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0)

  let { userToken, setUserToken } = useContext(UserContext);

  useEffect(() => {
    async function getCart() {
      let response = await getLoggedUserCart()
      if (response?.data) {
        setCartCount(response.data.numOfCartItems || 0);
      }
    }
    if (userToken) {
      getCart();
    }
  }, [userToken, getLoggedUserCart])

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken')
    setUserToken(null);
    setCartCount(0);
    navigate('/login')
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken !== null ? <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Home </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/WishList">WishList</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Profile">Profile</Link>
              </li>
            </> : ''}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
              {userToken !== null ?
                <Link to="/cart" className="nav-link position-relative mx-2">
                  <i className="fas fa-shopping-cart"></i>
                  {cartCount > 0 && <span className="badge bg-main position-absolute top-0 start-100 translate-middle rounded-pill">{cartCount}</span>}
                </Link>
                : null}
            </li>

            {userToken !== null ? <>
              <li className="nav-item">
                <span onClick={() => logOut()} className="nav-link cursor-pointer" >Logout</span>
              </li>
            </> : <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>}

          </ul>
        </div>
      </div>
    </nav>
  </>
}