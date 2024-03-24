import { createContext, useState ,useEffect} from "react";
// import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";



export let UserContext = createContext()

export function UserContextProvider(props) {
    let[userToken,setToken] = useState(null)
    let [decodeToken, setDecodeToken] = useState(null);
    let getToken = localStorage.getItem("userToken")
    useEffect(() => {
        if(getToken){
    
            if(getToken){
                let {id} = jwtDecode(getToken)
                setDecodeToken(id)
            // console.log(id);
            }
        }
    }, [])


    return<UserContext.Provider value={{userToken,setToken , decodeToken, setDecodeToken}}>
        {props.children}
    </UserContext.Provider>
}