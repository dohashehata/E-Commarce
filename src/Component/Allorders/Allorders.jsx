import React from 'react'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { UserContext } from '../../Context/UserContext';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export default function Allorders() {
  const [owner, setOwner] = useState([])
  const {decodeToken} = useContext(UserContext )
  const [isLoading, setIsLoading] = useState(true)
  
  async function getOrders(){
    try {
        const data = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodeToken}`,{
            headers: {
                token: localStorage.getItem('userToken')
            }
        });
          console.log(data.data)
          setOwner(data.data)
          setIsLoading(false)
    } catch (err) {
        console.log(err);
    }
}
useEffect(() => {
  getOrders()
}, [])








  return (
    <>
 {isLoading?<Loader/>:
 <>
 <Helmet>
 <meta charSet="utf-8" />
 <title>Allorders</title>
 <meta name="description" content="Allorders" />
</Helmet>

<section className='py-5'>
 {owner.map((data)=><div  key={data._id}  className='my-5 container '>
      
 {data.cartItems.map((productsOrder)=><div key={productsOrder._id} className='boxShadow mb-5 row bg-light rounded'> 
    <div className='col-md-12 pt-2'>
    <h2>Order Item </h2>
<div className='row d-flex justify-content-between pb-4 mx-2'>
<div className='col-md-5 bg-light rounded text-main mb-sm-1 '>

<span className='row  mx-1 py-3  '>
<span className='col-md-12 boxShadow text-center  '>
  <span className='col-md-6'></span>
<img src={productsOrder.product.imageCover} className=" rounded w-25 py-3" alt={productsOrder.product.imageCover} />
<h2 className='h5'>{productsOrder.product.title.split(" ").slice(0,3).join(' ')}</h2>
<p> Brand : {productsOrder.product.brand.name}</p>
<h2 className='h6'> Price : {productsOrder.price} L.E</h2>
<p>Qunatity:{productsOrder.count}</p>
</span>

</span>


</div>
<div className='col-md-5 bg-light rounded text-main mb-sm-1 pt-5  boxShadow'>
<span className='col-md-5'>
<h2 className='h5 pb-1'>Order details</h2>
<p >Name : {data.user.name}</p>
<p >Email :{data.user.email}</p>
<p >phone : +20{data.shippingAddress.phone}</p>
<p >city : {data.shippingAddress.city}</p>
<p >payment Method : {data.paymentMethodType}</p>

</span>


</div>
</div>
    </div>

    </div> )}  
   
    
      </div>)}
      </section>
</>
 } 
 
   
      </>
  )
}
