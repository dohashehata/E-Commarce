import React from 'react'
import notfound from '../../assets/img/error.svg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (

    <>

<Helmet>
    <meta charSet="utf-8" />
    <title>NotFound</title>
    <meta name="description" content="NotFound" />
   </Helmet>
 <div className='d-flex aligm-item-center'>
      <img src={notfound} alt=""  />
    </div>
    </>
   
  )
}
