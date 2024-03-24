import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function Categories() {
  function getBrand() {
          return  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        }
       let { isLoading, data, isError, isFetching, refetch } = useQuery('brandApi',getBrand)
      //  console.log(data);



  return (
    <>
    {isLoading?<Loader/>:
    <>
        <Helmet>
    <meta charSet="utf-8" />
    <title>Categories</title>
    <meta name="description" content="Categories" />
   </Helmet>
   <div className='container py-5'>
        <div className="py-5">
            <div className="row g-4">
                {data?.data.data.map((el)=>{
                    return <div key={el._id} className="col-md-4">
                    <div className="card">
                        <div className="card-img category">
                            <img alt="" className=" ratio-4x3 w-100  " height={300} src={el.image}/>
                            </div>
                            <div className="card-body">
                                <p className="text-success h3 text-center">{el.name}</p>
                                </div>
                                </div>
                                </div>
                })}
           
                          
        </div>
    </div>
    </div>
    
    </>
  } 
    
    </>
  )
}
