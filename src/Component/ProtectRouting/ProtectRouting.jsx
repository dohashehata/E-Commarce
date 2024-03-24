import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../Home/Home'
export default function ProtectRouting({children}) {
 if (localStorage.getItem("userToken") !=null) {

    return children
 }else {
    return <Navigate to='/login'/>
}
}
