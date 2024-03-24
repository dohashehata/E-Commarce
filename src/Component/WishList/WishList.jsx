import React ,{ useContext, useEffect, useState }from 'react'
import Loader from '../Loader/Loader'
import { WishContext } from '../../Context/WishListContext'
import { CartContext } from '../../Context/CartContextt';
import toast, { Toaster } from 'react-hot-toast';
import { data } from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function WishList() {
  let {addCart,setItemNum} = useContext(CartContext)
let{getFavourItems} = useContext(WishContext)
const [showFavouriteItems, setShowFavouriteItems] = useState({})
const [numberOfItems, setNumberOfItems] = useState(0)
  let[loading, setloading] = useState(true)

function deleteItem(id){
    console.log("delete", id)
    removeFromFavourite(id)
  }


  async function addToCart(id) {
    setloading(true)
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
    setloading(false)
    }


    async function removeFromFavourite(id){
        setloading(true)
      
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/` + id, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
               
            console.log(data.data)
            getFavourItems()
            favouriteItems()
    }
   
    async function favouriteItems(){
        try {
          const {data} = await getFavourItems();
          setNumberOfItems(data.count)
          setShowFavouriteItems(data.data)
          setloading(false)
        } catch (err) {
            console.log(err);
        }
    
    }
    useEffect(() => {
      favouriteItems()
    }, [])
    


  return (
    <>
    {loading?<Loader/>:

  
  

<>
<Helmet>
                <meta charSet="utf-8" />
                <title>WishList</title>
                <meta name="description" content="WishList" />
            </Helmet>
 <div className='container py-5'>
     <div className="container py-5 my-5 p-5 bg-light rounded">
    <div className="d-flex justify-content-between mb-4">

    {numberOfItems>=1 ?  <h2 >Favourites Items : {numberOfItems}</h2>: <p  className="mx-auto h2 ng-star-inserted">There are no items in your wishlist</p>}
         <h2 >My wish List</h2>
      
          
           </div>
        
             {showFavouriteItems?.map((el)=>{
            return  <div key={el.id} className="row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted">
            <div className="col-md-2">
              <img alt=""className="w-100 mb-sm-2" src={el.imageCover}/>
                </div>
                <div className="col-md-10 d-flex justify-content-between ">
                  <div >
                    <h5  >{el.title.split(" ").slice(0,3).join(' ')}</h5>
                  <h6 className='text-main'>Price:{el.price}EGP</h6>
                  <button  className="btn btn-sm m-0 p-0 text-danger" onClick={()=>deleteItem(el.id)}>
                    <i className="fa fa-trash"></i> Remove</button>
                    </div>
                    <div>
                      <button onClick={() => addToCart(el.id)} className="btn-count  text-white bg-main btn btn-lg d-block mx-auto"> add To Cart</button>
                    </div>
                      </div>
                      </div>
          })} 
           
         
            
           
    </div>
     
    </div> </>}
  
    </>


  )

}
