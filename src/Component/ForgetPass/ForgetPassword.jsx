import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
export default function ForgetPassword() {

    let [errmsg, setErr] = useState("")
    let nav = useNavigate()
    let [changForm, setChangeForm] = useState(true)

    let validationSchema = Yup.object({
        email: Yup.string().required("email Required").email("enter Valid Email"),
    })
    let validationSchema2 = Yup.object({
      resetCode: Yup.string().required("resetCode Required").matches(/^[0-9]{4,6}$/),
  })

    let form1 = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: forgotPasswordsAPi,
        validationSchema
    })
 
let form2 = useFormik({
  initialValues:{
    resetCode: ""
  },
  onSubmit:verifyResetCode,
  validationSchema: validationSchema2
})
 async function verifyResetCode(value) {
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',value).catch((err)=>{
      setErr(err.response.data.message)
    })
    if (req.data.status == 'Success') {
      nav('/ResetPassword')
  }
   }
    async function forgotPasswordsAPi(value) {
      console.log(value);
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value).catch((err) => {
            console.log(err);
            setErr(err.response.data.message)
        })
       if (req.data.statusMsg == 'success') {
        setChangeForm(false)
    }
        console.log(req);
    }
    return (
      <>
      <Helmet>
    <meta charSet="utf-8" />
    <title>ForgetPassword</title>
    <meta name="description" content="ForgetPassword" />
   </Helmet>
      
   <div className='container py-5'>
      <div className='pt-5'>
        <div className='w-100 mx-auto my-5 '>
         {errmsg?<div className='alert alert-danger'>{errmsg}</div> :""}

         {changForm ?  <>
                <h2>please enter your email</h2>
                <form className='posi ' onSubmit={form1.handleSubmit}>
                  <div className='form-floating mb-3 '>
                <input value={form1.values.email} className='form-control ng-pristine ng-invalid ng-touched w-100 ' onChange={form1.handleChange} onBlur={form1.handleBlur} type="text" name="email" id="email" />
                <label >Email </label>
                </div>
                <button type='submit' className='btn bg-main text-white'>send Code </button>
            </form> 
            </> : <>
            <h2>please enter your verification code</h2>
                <form className='posi ' onSubmit={form2.handleSubmit}>
                  <div className='form-floating mb-3 '>
                <input value={form2.values.resetCode} onChange={form2.handleChange} onBlur={form2.handleBlur} className='form-control ng-pristine ng-invalid ng-touched w-100 '  type="text" name="resetCode" id="resetCode" />
                <label >code  </label>
              </div>
              {form2.errors.resetCode && form2.touched.resetCode ? <p className='text-danger'>{form2.errors.resetCode}</p> : ""}
                <button type='submit' className='btn bg-main text-white'>verify </button>
            </form> 
            </>}
       


        </div>
        </div>
        </div>
      </>
      
    )
}


