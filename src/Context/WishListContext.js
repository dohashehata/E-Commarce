import { createContext , useContext, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useEffect } from "react";






export let WishContext = createContext()


export function WishContextProvider(props) {


    const [color, setColor] = useState([])
    const [countOfFavourItems, setCountOfFavourItems] = useState(0)
    


    async function AddToFavourite(id){
        try {
            const data = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
                productId: id
            }, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            });
            setCountOfFavourItems(data.data.data.length)
            return (
                successMessage(data?.data.message)
                
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
                    token: localStorage.getItem('userToken')
                }
            });
            // setLoad(data.data)
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
    



  function successMessage(data){
    toast.success(data+'💛', {
        position: 'top-right',
        duration: 8000,
        style:{
    borderRadius:" 25px 50px",
    backgroundColor:'',
    color:'#22db14',
    padding:'20px',
    boxShadow:'1px 1px 10px #22db14',
        }
    
      })
  }

function errorMessage(data){
    toast.error(data+'💛', {
        position: 'top-right',
        duration: 8000,
        style:{
    borderRadius:" 25px 50px",
    backgroundColor:'',
    color:'#22db14',
    padding:'20px',
    boxShadow:'1px 1px 10px #22db14',
        }
    
      })
  }

    return <WishContext.Provider value={{successMessage,AddToFavourite,getFavourItems,color, setColor,countOfFavourItems, setCountOfFavourItems}}>
 {props.children}
    </WishContext.Provider>
 }