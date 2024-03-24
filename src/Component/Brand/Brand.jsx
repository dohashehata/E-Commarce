import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';


export default function Brand() {

    function getBrand() {
        return  axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      }
     let { isLoading, data, isError, isFetching, refetch } = useQuery('brandApi',getBrand)
    //  console.log(data);
    
  return (
    <>
    {isLoading?<Loader/>: 
    <> <Helmet>
    <meta charSet="utf-8" />
    <title>Brand</title>
    <meta name="description" content="Brand" />
   </Helmet>
   
   <div className='container py-5'>
        <div className="py-5">
        <h1  className="text-main text-center mb-5">All Brands</h1>
            <div className="row g-4">
                {data?.data.data.map((el)=>{
                    return <div key={el._id} className="col-md-3">
                    <div className="card">
                        <div className="card-img">
                            <img alt="" className="img-fluid ratio-4x3 w-100" height={300} src={el.image}   data-bs-toggle="modal" data-bs-target=  { `#${el.name}`}/>
                            </div>
                            <div className="card-body">
                                <p className="text-success h3 text-center">{el.name}</p>


                                <div className="modal fade" id={el.name} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body row d-flex justify-content-center align-items-center">
        <div className='col-md-6'>
       <h2 className='text-main '>{el.name}</h2>
       <p>{el.slug}</p>
       </div>
       <div className='col-md-6'>
        <img className='img-fluid' src={el.image} alt=''/>
        </div>
      </div>
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


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
