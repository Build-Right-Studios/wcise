import React from 'react'
import logo from '../images/wcise_logo.png';

function Footer() {
  return (
    <div className='bg-[#1a1a1a] py-3'>
        <div className='flex flex-col lg:flex-row-reverse justify-between'>
            <img src={logo} alt="" className='h-23 w-27 lg:h-16 lg:w-auto px-2'/>
            <div className='text-white flex flex-col lg:flex-row lg:justify-around lg:w-2/4 px-6 gap-8'>
                <div>
                    <div className='mb-2 lg:mb-4 text-xl roboto-wcise font-extrabold'><strong>WCISE</strong></div>
                    <div className='roboto-condensed-wcise hover:underline  cursor-pointer'>About Us</div>
                    <div className='roboto-condensed-wcise hover:underline cursor-pointer'>Terms</div>
                    <div className='roboto-condensed-wcise hover:underline cursor-pointer'>Privacy Policy</div>
                </div>
                <div>
                    <div className='mb-2 lg:mb-4 text-xl roboto-wcise'><strong>HELP</strong></div>
                    <div className='roboto-condensed-wcise hover:underline  cursor-pointer'>Contact us</div>
                    <div className='roboto-condensed-wcise hover:underline cursor-pointer'>Websites</div>
                    <div className='roboto-condensed-wcise hover:underline cursor-pointer'>Agreement</div>
                </div>
            </div>
        </div>
        
        <br />
        <div className='text-white lg:px-16 mt-4'>All prices are in US dollars</div>

        <br />
        <div className='text-white lg:px-16'>All Rights Reserved, Trademarks are the property of their respective owners.</div>
    </div>
  )
}

export default Footer