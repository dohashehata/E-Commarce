import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContextt'
import { Helmet } from 'react-helmet'

export default function Checkout() {

  let { checkoutPayment } = useContext(CartContext)
  let validationSchema = Yup.object({
    phone: Yup.string().required("Phone required").matches(/^01[0152][0-9]{8}$/, "enter Valid phone"),
    city: Yup.string().required("city Required").matches(/^[\w-]{3,}$/, "enter valid city"),
    details: Yup.string().required("details Required").matches(/^[\w-]{3,}$/, "enter valid details"),

  })
  let data = useParams()
  let formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: ""
    },
    onSubmit: chekoutSession,
    validationSchema
  })

  async function chekoutSession(val) {
    let req = await checkoutPayment(data.id, val)
    if (req.data.status == 'success') {
      
      window.open(req.data.session.url ,"_self")
    }
    console.log(req);
  }
  console.log(data.id);
  return ( <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Checkout</title>
    <meta name="description" content="Checkout" />
   </Helmet>
   <div className='container py-5'>
     <div className='w-75 mx-auto my-5'>
      <form onSubmit={formik.handleSubmit}>
      <div className='mb-3'>
      <label  htmlFor="details">Details</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='' name="details" ></input>
{formik.touched.details && formik.errors.details ? <p className='text-danger'>{formik.errors.details}</p> : ""}

</div>
<div className='mb-3'>
<label  htmlFor="phone">phone</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' placeholder='' name="phone" />
          {formik.touched.phone && formik.errors.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ""}

        </div>
        <div className='mb-3'>
        <label  htmlFor="city">city</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='' name="city" />
          {formik.touched.city && formik.errors.city ? <p className='text-danger'>{formik.errors.city}</p> : ""}

        </div>

        

     

        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white d-block w-100 '>Pay💸</button>
      </form>
    </div>
   </div>
   </>
  )
}
