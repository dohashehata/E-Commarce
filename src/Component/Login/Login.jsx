import axios from 'axios'
import { useFormik, validateYupSchema } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContextt'
import { WishContext } from '../../Context/WishListContext'
import { Helmet } from 'react-helmet'


export default function Login() {
let{getUserWish,setNumWish}= useContext( WishContext)
  let {getUserCart,setItemNum} = useContext(CartContext)
 let{setToken} = useContext(UserContext)
let navg =  useNavigate()
  let [errMass,setErr] = useState("")
let [loading,setloading] = useState(true)

 let validationSchema = Yup.object({

 email : Yup.string().required(" email is required").email("enter valid email"),
 password:Yup.string().required("password is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"enter valid password"),

 })

  // function registerApi(val) {
  //   console.log(val);
  // }
  let formik1 =  useFormik({
      initialValues:{
      
        password:"",
        email:""
      },
      onSubmit: loginApi,
    validationSchema
    })
  async function loginApi(val) {
    setloading(false)
  let req= await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
      console.log(err);
      setErr(err.response.data.message)
      setloading(true)
    })
    if(req.data.message=='success'){
    
      setloading(true)
      setToken(req.data.token)
      localStorage.setItem("userToken",req.data.token)
      getUserData()
      getwishData()
      navg('/home')
    
    }
    // console.log(req);
  }
  async function getUserData() {
    let req = await getUserCart().catch((err)=>{
      console.log(err);
    })
    console.log(req);
    if (req?.data?.status == 'success') {
      setItemNum(req.data.numOfCartItems)
    }
    }
    async function getwishData() {
      let req = await getUserWish().catch((err)=>{
        console.log(err);
      })
      console.log(req.data.data);
      if (req.data.data =='success') {
      setNumWish(req.data.data)
      
      }
      }
  return (
     <>
       <Helmet>
    <meta charSet="utf-8" />
    <title>Login</title>
    <meta name="description" content="Login" />
   </Helmet>
     
   <div className='container py-5'>
    <div className='mt-5'>
      <h1>Login Now...........</h1>
      {errMass!="" ?<div className='alert alert-danger'>{errMass}</div> :""}
      
      <form onSubmit={formik1.handleSubmit} >
       
        <div>
        <label htmlFor="email">Email:</label>
        <input  value={formik1.values.email} onBlur={formik1.handleBlur} onChange={formik1.handleChange} className='form-control mb-3' id="email" name='email' type="text" />
        {formik1.errors.email && formik1.touched.email ? 
       <div className=' alert alert-danger'>{formik1.errors.email} </div> :"" }
        </div>

        <div>
        <label htmlFor="password">Password:</label>
        <input value={formik1.values.password} onBlur={formik1.handleBlur} onChange={formik1.handleChange} className='form-control mb-3' id="password" name='password' type="password" />
        {formik1.errors.password && formik1.touched.password ? 
       <div className=' alert alert-danger'>{formik1.errors.password} </div> :"" }
        </div>
    <div className='d-flex justify-content-center align-items-between'>
    <Link className="h5 forget nav-link" to="/forgetpass">forget your password ?</Link>
        {loading?<button disabled={!(formik1.isValid&&formik1.dirty)}
         type='submit' className='btn text-white mt-3 bg-main ms-auto'>Login</button>:
          <button type='button' className='btn text-white mt-3 ms-auto bg-main'>
  <i className="fa-solid fa-spinner"></i>
  </button>}
 
  </div>
      </form>
    </div>
    </div>
     </>
    
  )
}