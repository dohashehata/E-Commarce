
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContextt'
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet'

export default function Cart() {
let{getUserCart,CleearCart,updateCart,removeCart,setItemNum,numItem}=useContext(CartContext)

let[CartData,setCartData] = useState(null)
let[loading, setloading] = useState(true)
useEffect(()=>{
  getUserData()
},[])



async function getUserData() {
  setloading(true)
  let req =  await getUserCart().catch((err)=>{
    console.log(err);
    if (err.response.data.statusMsg == 'fail') {
      setCartData(null)
      setloading(false)
    }
  })
  if (req?.data.status == 'success'){
    setloading(false)
    setCartData(req.data.data)
    
  }
}


async function removeItem(productId) {
  setloading(true)
 let req= await removeCart(productId)
//  console.log(req);
 if (req?.data.status == 'success'){
  setItemNum(req.data.numOfCartItems)
  setCartData(req.data.data)
  setloading(false)
}
}


async function CleearItems() {
  setloading(true)
 let req = await CleearCart()
 console.log(req);
 if (req.data.message == 'success') {
  setCartData(req.data.data)
  setloading(false)
}
}
 
async function updateItem(productId,count) {
  if (count == 0) {
    removeItem(productId)

  } else {
  let req = await updateCart(productId,count)
  console.log(req);
  if (req?.data.status == 'success'){
    setCartData(req.data.data)
   
  }
}
}






  return (
    <>
  {loading?<Loader/>:<>
  {CartData  == null ?<div className='container py-5'> <div  className="container  my-5 p-5 bg-light rounded">
    <div  className="d-flex justify-content-between mb-4">
      <h2 >Cart Shop</h2>
      </div>
      <p  className="mx-auto h2 ">your cart is empty</p>
  </div>
  </div>
  :<div className='container py-5'>
   <div className="container py-5 my-5 p-5 bg-light rounded">
  <div className="d-flex justify-content-between mb-4">
       <h2 >Cart Shop</h2>
       <button className="btn btn-primary btn-lg ">
         <Link className="text-decoration-none text-white" to={'/Checkout/'+CartData._id}>check out</Link>
         </button>
        
         </div>
        
         <div className=" ">
         <h5 >total number of items: <span className="green">{numItem}</span>
           </h5>
           <h5 className='border-bottom pb-4' >total price <span className="green"> : </span> {CartData.totalCartPrice}<span className="green">EGP</span>
          
</h5>
           </div>
           {CartData.products.map((el)=>{
            return<>
             <Helmet>
    <meta charSet="utf-8" />
    <title>Cart</title>
    <meta name="description" content="Cart" />
   </Helmet>
   <div key={el._id} className="row border-bottom my-3 d-flex align-items-center p-2 ">
            <div className="col-md-2">
              <img alt=""className="w-100" src={el.product.imageCover}/>
                </div>
                <div className="col-md-10 d-flex justify-content-between">
                  <div >
                    <h5 >{el.product.title.split(" ").slice(0, 3).join(" ")}</h5>
                  <h6 >Price:{el.price}EGP</h6>
                  <button onClick={()=>removeItem(el.product._id)} className="btn btn-sm m-0 p-0 text-danger">
                    <i className="fa fa-trash"></i> Remove</button>
                    </div>
                    <div >
                      <button onClick={()=> updateItem(el.product._id, el.count += 1)} className="btn btn-count btn-colr btn-md">+</button>
                      <span className="mx-3">{el.count}</span>
                      <button onClick={()=> updateItem(el.product._id, el.count -= 1)} className="btn btn-colr btn-count btn-md">-</button>
                      </div>
                      </div>
                      </div>
            
            </>
             
          })}
          
          <button onClick={CleearItems} className="btn-count btn-colr btn btn-lg d-block mx-auto "> Clear Your Cart</button>
  </div>
   
  </div>}

  </>
}

  
  </>
  )
}

