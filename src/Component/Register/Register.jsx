import axios from 'axios'
import { useFormik, validateYupSchema } from 'formik'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
let navg =  useNavigate()
  let [errMass,setErr] = useState("")
let [loading,setloading] = useState(true)
 let validationSchema = Yup.object({
 name : Yup.string().required("name required ").min(4,"min char 4").max(30,"max char 30"),
 email : Yup.string().required(" email is required").email("enter valid email"),
 phone: Yup.string().matches(/^01[1025][0-9]{8}$/,"enter valid phone").required("phone is required"),
 password:Yup.string().required("password is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"enter valid password"),
rePassword:Yup.string().required("rePassword is required").oneOf([Yup.ref("password")])
 })

 
  let formik1 =  useFormik({
      initialValues:{
        name:"",
        phone:"",
        password:"",
        rePassword:"",
        email:""
      },
      onSubmit : RegisterApi,
    validationSchema
    })
  async function RegisterApi(val) {
    setloading(false)
   let req= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch(function (err) {
    setErr( err.response.data.message)
    console.log( err.response.data.message);
    setloading(true)

   })
   if (req.data.message=="success") {
    setloading(true)
    navg('/login')

   }
    }
  return (

    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Register</title>
    <meta name="description" content="Register" />
   </Helmet>

   <div className='container py-5'>
      <h1>register now</h1>
      {errMass!="" ?<div className='alert alert-danger'>{errMass}</div> :""}
      
      <form onSubmit={formik1.handleSubmit} className='' >
        <div>
      
        <label htmlFor="name">Name:</label>
        <input value={formik1.values.name} onBlur={formik1.handleBlur}  onChange={formik1.handleChange} className='form-control mb-3'id="name" name='name' type="text" />
        
        {formik1.errors.name && formik1.touched.name ? 
       <div className=' alert alert-danger'>{formik1.errors.name} </div> :"" }
        </div>
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
        <div>
        <label htmlFor="rePassword">rePassword:</label>
        <input value={formik1.values.rePassword} onBlur={formik1.handleBlur} onChange={formik1.handleChange} className='form-control mb-3' id="rePassword" name='rePassword' type="password" />
        {formik1.errors.rePassword && formik1.touched.rePassword ? 
       <div className=' alert alert-danger'>{formik1.errors.rePassword} </div> :"" }
        </div>
        <div>
        <label htmlFor="phone">Phone:</label>
        <input value={formik1.values.phone} onBlur={formik1.handleBlur} onChange={formik1.handleChange} className='form-control mb-3' id="phone" name='phone' type="tel" />
        {formik1.errors.phone && formik1.touched.phone ? 
       <div className=' alert alert-danger'>{formik1.errors.phone} </div> :"" }
        </div>


    
      
        {loading?<button disabled={!(formik1.isValid&&formik1.dirty)}
         type='submit' className='btn btn-lg ms-auto  d-block'><span  className="ng-star-inserted ms-auto ">Register now</span></button>:
         
         <button  type='submit' className='btn btn-lg ms-auto text-white bg-main  d-block'><span  className="ng-star-inserted ms-auto ">Register now</span></button>
      
           }
           

      </form>
    </div>
    </>
   
  )
}
