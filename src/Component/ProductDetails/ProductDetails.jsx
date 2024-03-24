import React from 'react'
import  { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Loader/Loader';

import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../Context/CartContextt';
import { WishContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let { AddToFavourite,color, setColor} = useContext(WishContext)
let {addCart,setItemNum} = useContext(CartContext)
  let param = useParams()
  let [productid, setProduct] = useState(null)

    useEffect(() => {
        setProduct(param.id)
    }, [])
   let {data, isLoading} = useQuery(["ProductDetails",productid], getDetails)

  

   let product = data?.data.data
   console.log(product);
function getDetails(queryParm) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${queryParm.queryKey[1]}`)
}
function getImgPath(event) {
  let imgpath  =event.target.getAttribute("src")
  document.querySelector("#imgId").setAttribute("src",imgpath)
}

async function addToCart(id) {
  let req =await addCart(id)
  if (req.data.status == "success") {
  
    setItemNum(req.data.numOfCartItems)
    toast.success(req.data.message+'🛺', {
      position: 'top-right',
      duration: 8000,
 
      style:{
  borderRadius:" 25px 50px",
  backgroundColor:'',
  color:'#22db14',
  padding:'20px',
  boxShadow:'1px 1px 10px #22db14',
      }
  
    });
  }
  }

  function addfavourite(id){
    AddToFavourite(id)
 }





  return (
    <>
    {isLoading ? <Loader/>:<Toaster />}
    <div  className='container py-5'>
{isLoading ? <Loader/>:
<>
<Helmet>
    <meta charSet="utf-8" />
    <title>ProductDetails</title>
    <meta name="description" content={product?.title} />
   </Helmet>
   <div className=' pt-5'>
       <div className='row align-items-center'>
<div className='col-md-4'>

  <div className='row align-items-center g-0 shadow-sm rounded p-2'>
<div className='col-md-2'>
{product?.images.map((product) => {   
 return <img  key={product._id} src={product} onClick={getImgPath}  className='w-100  mb-2 cursor-pointer'  alt="" />
})}


</div>
<div className='col-md-10'>
<img src={product?.imageCover} id='imgId' className='w-100  mb-2 cursor-pointer'  alt="" />
</div>
  </div>

</div>


<div className="col-md-8 pt-4">
  <h2>{product?.title}</h2>
  <p>{product?.description}</p>

<div className="d-flex justify-content-between">
  <span>{product?.price}EGP</span>
  <div className="rating">
    <i className="fa fa-star rating-color"></i>
    <span>{product?.ratingsAverage}</span>
    </div>
    </div>
    <div className="d-flex justify-content-between align-items-center mt-4">
      <button onClick={() => addToCart(product.id)} className="w-75 mx-auto btn d-block bg-main text-white"> + Add</button>

      { color.includes(product.id)? 
    (localStorage.getItem('userToken') ?
    <i className="fa-solid fa-heart h3 text-danger cursor-pointer" onClick={()=>{addfavourite(product.id);  setColor([...color, product._id])}}></i>    : 
     <i className="fa-solid fa-heart h3 cursor-pointer" onClick={()=>addfavourite(product.id)}></i>): 
     <i className="fa-solid fa-heart h3 cursor-pointer" onClick={()=>{addfavourite(product.id);  setColor([...color, product._id])}}></i>}
</div>
</div>
      </div>
    </div>
</>
 
}
</div>
</>
  )
}


