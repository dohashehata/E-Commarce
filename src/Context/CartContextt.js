import { createContext , useState } from "react";
import axios from 'axios'


export let CartContext = createContext()

export function CartContexttProvider({children}) {
    let [numItem,setItemNum]=useState(0)
    
    function getUserCart() {
        let Options={
            headers:{
                token:localStorage.getItem("userToken")
            }
           
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',Options)
        
    }
    
    
        function addCart(productId) {
    
            let body ={
                productId:productId
            }
            let Options={
                headers:{
                    token:localStorage.getItem("userToken")
                }
               
            }
    
          return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",body,Options
            )
        }
    function removeCart(productId) {
        let Options={
            headers:{
                token:localStorage.getItem("userToken")
            }
           
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,Options)
    }

    function CleearCart() {
        let Options={
            headers:{
                token:localStorage.getItem("userToken")
            }
           
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,Options)
    }




    function updateCart(productId,count) {
        let Options={
            headers:{
                token:localStorage.getItem("userToken")
            }
           
        }
        let body={
            count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,body,Options)
    }

    function checkoutPayment(id, data) {
        let options = {
            headers: {
                token: localStorage.getItem("userToken")
            }
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, body, options)
    }





        return <CartContext.Provider value={{getUserCart,addCart,CleearCart,updateCart,checkoutPayment, removeCart,numItem,setItemNum  }}>
            {children}
        </CartContext.Provider>
     }