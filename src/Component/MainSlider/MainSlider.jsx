import React from 'react'
import img1 from '../../assets/img/41nN4nvKaAL._AC_SY200_.jpg'
import img2 from '../../assets/img/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import img3 from '../../assets/img/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img4 from '../../assets/img/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img5 from '../../assets/img/61cSNgtEISL._AC_SY200_.jpg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MainSlider() {
  return (
    <div className='pt-5 container my-3'>
<div className='row g-0 justify-content-center'>
<div className='col-md-3'>
<OwlCarousel items={1} className="owl-dots disabled " >
<div className='item'>
<img src={img1} className='w-100' alt="" />
</div>
<div className='item'>
<img src={img4} className='w-100' alt="" />
</div>
<div className='item'>
<img src={img5} className='w-100' alt="" />
</div>
</OwlCarousel>
</div>

<div className='col-md-3'>
<img src={img3} className='w-100' alt="" />
<img src={img2} className='w-100' alt="" />
</div>
</div>
    </div>
  )
}
