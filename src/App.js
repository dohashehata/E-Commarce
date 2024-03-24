
import { Component, useContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter,createHashRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Products from "./Component/Products/Products";
import Categories from "./Component/Categories/Categories";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import Cart from "./Component/Cart/Cart";
import ForgetPassword from "./Component/ForgetPass/ForgetPassword";
import { UserContext, UserContextProvider } from "./Context/UserContext";
import ProtectRouting from "./Component/ProtectRouting/ProtectRouting";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import { QueryClient,QueryClientProvider } from "react-query";
import { CartContext } from "./Context/CartContextt";
import Brand from "./Component/Brand/Brand";
import WishList from "./Component/WishList/WishList";
import { WishContext } from "./Context/WishListContext";
import Allorders from "./Component/Allorders/Allorders";
import Checkout from "./Component/Checkout/Checkout";
import axios from 'axios'









let Route = createHashRouter([
  { path : "", element:<Layout/>, 
  children:[
    {path: "home", element:<ProtectRouting><Home/></ProtectRouting> },
    {path: "product", element: <ProtectRouting><Products/></ProtectRouting>},
    {path: "productDetails/:id",element: <ProtectRouting><ProductDetails/></ProtectRouting>},
    {path: "categories", element:<ProtectRouting><Categories/></ProtectRouting> },
   {path: "cart", element: <ProtectRouting><Cart/></ProtectRouting>},
   {path: "Checkout/:id", element: <ProtectRouting><Checkout/></ProtectRouting>},
   {path: "allorders", element: <ProtectRouting><Allorders/></ProtectRouting>},
   {path: "brand", element: <ProtectRouting><Brand/></ProtectRouting>},
   {path: "wishList", element: <ProtectRouting><WishList/></ProtectRouting>},
    { index :true, element:<Login/>},
    { path: "register",element:<Register/>},
    {path: "*", element:<NotFound/>},
    {path: "forgetpass",element:<ForgetPassword/>},
    {path: "ResetPassword",element:<ResetPassword/>},
  ]}
])
export default function App() {

  
  let {successMessage,AddToFavourite, color, setColor,countOfFavourItems, setCountOfFavourItems} = useContext(WishContext)
  let {getUserCart,setItemNum} = useContext(CartContext)
  let queryClients = new QueryClient()

  let{setToken} = useContext(UserContext)


  useEffect(()=>{
if(localStorage.getItem("userToken") !=null){
  setToken(localStorage.getItem("userToken") )
  getUserData()
}
  },[])

async function getUserData() {
  let req = await getUserCart().catch((err)=>{
    // console.log(err);
  })
  // console.log(req);
  if (req?.data?.status == 'success') {
    setItemNum(req.data.numOfCartItems)
  }
  }


  return (

<QueryClientProvider client={queryClients}>

     <RouterProvider router={Route}></RouterProvider>
     
     </QueryClientProvider>
  )
}
