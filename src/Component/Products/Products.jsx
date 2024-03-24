import axios from 'axios'
import React, { useEffect,useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { WishContext } from '../../Context/WishListContext';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../Context/CartContextt';

export default function Products() {
  let [search,setSearch] = useState("")
  let {successMessage,AddToFavourite,getFavourItems,color, setColor,countOfFavourItems, setCountOfFavourItems} = useContext(WishContext)
  let {addCart,setItemNum} = useContext(CartContext)
  function getProduct() {
    return  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }




 let { isLoading, data, isError, isFetching, refetch } = useQuery('productApi',getProduct)
// console.log(data);

function addfavourite(id){
  AddToFavourite(id)
  console.log();
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



// async function addtoWish(e,id) {
//   let req =await addWish(id)
//   // console.log(req);
//   if (req.data.status == "success") {
//     setNumWish(req.data.data)
// e.target.classList.add('text-danger')
//     // setItemNum(req.data.numOfCartItems)
//     toast.success(req.data.message+"💛", {
//       position: 'top-right',
//       duration: 8000,
     
//       style:{
//   borderRadius:" 25px 50px",
//   backgroundColor:'',
//   color:'#22db14',
//   padding:'20px',
//   boxShadow:'1px 1px 10px #22db14',
//       }
  
//     });
//   }
// }

  return (
    <>
    <Toaster />
    {isLoading ?<Loader/>: <div className='container py-5 '>
      <div className='py-5'>
    <input  onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="search...." className="w-75 mx-auto form-control my-5  ng-untouched  ng-pristine ng-valid"/>
    </div>
    <div className='row g-4 '>

      {data?.data.data.filter((el)=>{
        return search.toLowerCase()===''
        ? el :el.title.toLowerCase().includes(search);
      })
      .map( (el)=>{
      return <div  key={el._id} className='col-md-6 col-lg-3'>
       <div className='product px-2 py-4 rounded cursor-pointer'>

        <Link to={`/productDetails/${el.id}`}>
     <img src={el.imageCover} className='w-100 rounded' alt="" />
   
     <p className='text-main pt-1 pb-3'>{el.category.name }</p>
     <h5 className='title'>{el.title.split(" ").slice(0, 2).join(" ")}</h5>
     <div className='d-flex justify-content-between'>
     <span>{el.price}EGP</span>
     <span> <i className='fa fa-star rating-color'></i>{el.ratingsAverage}</span>
     </div>
     </Link>
     <div  className="d-flex align-items-center justify-content-center">
       <button onClick={() => addToCart(el.id)} className="w-75 btn mt-4 bg-main text-white mb-1"> + Add</button>
     
       { color.includes(el.id)? 
    (localStorage.getItem('userToken') ?
    <i className="fa-solid fa-heart h3 text-danger cursor-pointer" onClick={()=>{addfavourite(el.id);  setColor([...color, el._id])}}></i>    : 
     <i className="fa-solid fa-heart h3 cursor-pointer" onClick={()=>addfavourite(el.id)}></i>): 
     <i className="fa-solid fa-heart h3 cursor-pointer" onClick={()=>{addfavourite(el.id);  setColor([...color, el._id])}}></i>}
     
     
     
    
     </div>
       </div>
     
     </div>
      })}
 
    </div>
    </div>}
    
    </>
  )
}
