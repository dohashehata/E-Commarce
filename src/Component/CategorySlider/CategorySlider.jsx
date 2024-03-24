import axios from 'axios'
import React from 'react';
import { useQuery } from 'react-query';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



export default function CategorySlider() {
function getAllCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}
let {data}=useQuery('CategoryApi',getAllCategory)

// console.log(data);

  return (
    <div className='my-5 ' >
        <OwlCarousel className='owl-theme' items={6}   >
          {data?.data.data.map((el)=>{
            return   <div key={el._id} className='item'>
            <img src={el.image} className='w-100' height={250}  alt="" />
            <h3  className="ng-star-inserted" >{el.name} </h3>
            </div>
          })}  
       
          
        </OwlCarousel>
    </div>
  )
  }
