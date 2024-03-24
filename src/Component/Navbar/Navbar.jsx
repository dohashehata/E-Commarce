
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContextt'
import { WishContext } from '../../Context/WishListContext'


export default function Navbar() {
let{numItem} = useContext(CartContext)
let{countOfFavourItems} = useContext(WishContext)
 let {userToken,setToken} = useContext(UserContext)
let naveg = useNavigate()
 function LogOut() {
  localStorage.removeItem("userToken")
  setToken(null)
  naveg("/")
 }
  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
    <div className="container">

      <Link className="navbar-brand" to="home">
        <div className='d-flex align-items-center justify-content-center'>
        <i className="fa-solid fa-cart-shopping nav-icon "></i>
      <span className="h3 bold ">fresh cart</span></div>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
       aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userToken != null? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="product">Product</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="categories">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="brand">Brand</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="cart">Cart</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/wishList">Wish list</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/allorders">All Orders</NavLink>
          </li>
        
        </ul>:""}
       
        {userToken != null? <> 
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
          <li className="nav-item position-relative">
       <Link className='nav-link' to='/wishList'>
       <i className="fa-solid fa-heart h3 text-danger"></i>
       <div className="badge position-absolute text-white top-0 end-0 bg-main">{countOfFavourItems}</div>
   
       </Link>
          
          </li>
          <li className="nav-item position-relative">
       <Link className='nav-link' to='/cart'>
       <i className="fa-solid fa-cart-shopping fs-3 "></i>
       <div className="badge position-absolute text-white top-0 end-0 bg-main">{numItem}</div>
       </Link>
          
          </li>
          
          <li className="nav-item">

            <span className="nav-link cursor-pointer " onClick={LogOut}>logOut</span>
          </li>
         
          </ul>
          </>
          :<>



        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
       
          <li className="nav-item">
            <NavLink className="nav-link active"  aria-current="page" to="/">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="register">Register</NavLink>
          </li>
          </ul>

          </>}
       
        
     
      </div>
    </div>
  </nav>
  )
}
