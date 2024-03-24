// wish context
const [color, setColor] = useState([])
const [countOfFavourItems, setCountOfFavourItems] = useState(0)

async function AddToFavourite(id){
    try {
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setCountOfFavourItems(data.data.data.length)
        return (
            successMessage(data.data.message)
            
        )
    } catch (err) {
        console.log(err);
        errorMessage(err)
    }

}

async function getFavourItems(){
    try {
        const data = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setLoad(data.data)
        const response = data.data.data;
        const id = response.map(item => item.id);
        if(data.data.status == "success"){
            setColor(...color,id)
        }
        setCountOfFavourItems(data.data.count)
        return data;
    } catch (err) {
        console.log(err);
    }
}



useEffect(()=>{
    getFavourItems()
}, [])



{ color.includes(product.id)? 
    (localStorage.getItem('token') ?
    <i className="fa-regular color-main-light fa-heart position-absolute bg-main p-2 rounded-2" onClick={()=>{addfavourite(product.id);  setColor([...color, product._id])}}></i>    : 
     <i className="fa-solid fa-heart h3" onClick={()=>addfavourite(product.id)}></i>): 
     <i className="fa-solid fa-heart h3" onClick={()=>{addfavourite(product.id);  setColor([...color, product._id])}}></i>}




     async function favouriteItems(){
        try {
          const {data} = await getFavourItems();
          setNumberOfItems(data.count)
          setShowFavouriteItems(data.data)
          setIsLoading(false)
        } catch (err) {
            console.log(err);
        }
    
    }
    useEffect(() => {
      favouriteItems()
    }, [])
    


    {numberOfItems>=1 ? <h2 className=' text-center my-3 bg-main text-light p-2 fw-bolder'>Favourites Items : {numberOfItems}</h2> : <h2 className=' text-center my-3 bg-danger bg-gradient text-light p-2 fw-bolder'>There are no items in your wishlist</h2>}
    {showFavouriteItems.map((data)=>















        <>
        {isLoading? <div className='loading d-flex align-items-center justify-content-center'>
              <Triangle
               visible={true}
               height="80"
               width="80"
               color="var(--main-color)"
               ariaLabel="triangle-loading"
               wrapperStyle={{}}
               wrapperClass=""/> </div>:
       <div className="container mt-5 pt-3">
         {numberOfItems>=1 ? <h2 className=' text-center my-3 bg-main text-light p-2 fw-bolder'>Favourites Items : {numberOfItems}</h2> : <h2 className=' text-center my-3 bg-danger bg-gradient text-light p-2 fw-bolder'>There are no items in your wishlist</h2>}
       {showFavouriteItems.map((data)=>
     <div key={data.id} className="card my-3">
       <div className="row g-0">
         <div className="col-md-4">
           <img src={data.imageCover} className="img-fluid rounded-start w-100" alt={data.imageCover}/>
         </div>
         <div className="col-md-8 position-relative">
           <div className ="card-body">
             <h5 className="card-title mb-4 fw-bolder">{data.title.split(" ").slice(0,3).join(' ')}</h5>
             <ul className=' list-unstyled'>
               <li className='fw-bolder mb-2'>Brand: <span className='color-main'>{data.brand.name}</span></li>
               <li className='fw-bolder mb-2'>Category: <span className='color-main'>{data.category.name}</span></li>
               <li className='fw-bolder mb-2'>Rating: <i className="fa fa-star rating-color"></i>{data.ratingsAverage}</li>
             </ul>
             <p className='fw-bolder'> Price: {data.price} L.E</p>
             
             <i className="fa-solid fa-xmark p-2 close-btn rounded-2 position-absolute cursor-pointer bottom-0 end-0 m-3" onClick={()=>deleteItem(data.id)}></i>
             <div className='details-btn cursor-pointer rounded-2' onClick={()=>addCart(data.id)}><i className="fa-solid fa-cart-plus"></i> Add to cart</div>
           </div>
         </div>
     </div>
     </div>
     )}
       </div>
     }
         </>
       )
     }