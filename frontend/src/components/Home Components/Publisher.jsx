import React from 'react'

import img1 from '../../images/1.jpg';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import img4 from '../../images/4.png';
import img5 from '../../images/5.jpg';
import img6 from '../../images/6.jpg';
import img7 from '../../images/7.jpg';
import img8 from '../../images/8.jpg';

function Publisher() {
  return (
    <div className='mt-10 ml-4 mr-4 mb-4'>
        <h3 className='text-[#1d3b58] font-bold text-3xl text-center mb-3 lg:text-4xl'>PUBLISHER, INDEXING PARTNER, AND TECHNICAL CO-SPONSOR</h3>
        <div className='flex flex-col items-center justify-center gap-4'>
            <div className='flex flex-col lg:flex-row gap-4'>
                <img src={img1} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
                <img src={img2} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
                <img src={img3} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
                <img src={img4} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
            </div>
            <div className='flex flex-col lg:flex-row gap-4'>
                <img src={img5} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
                <img src={img6} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
                <img src={img7} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
                <img src={img8} alt="" className='w-[190px] h-[190px] border-4 p-2'/>
            </div>
        </div>
    </div>
  )
}

export default Publisher