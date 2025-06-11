import React from 'react'
import { FaPhone } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoLogoFacebook } from "react-icons/io";
import { Link } from 'react-router-dom';


function GetInTouch() {
  return (
    <div>
        <div className='flex items-center justify-center flex-col gap-2 mb-20'>
            <div className='text-4xl font-bold text-center my-8 text-[#1d3b58] lg:text-6xl '>GET IN TOUCH</div>
            <div className='h-1/5 w-3/4 text-white pl-4 pr-4'>
                <div className='bg-[#1d3b58] border border-transparent rounded-xl mt-4'>
                    <div className='flex flex-col items-center lg:flex-row text-xl gap-8 lg:gap-6 justify-around mt-2 pb-2'>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            <FaPhone />
                            <div>
                                <div className='inter'>Phone Number</div>
                                <div>000000000000</div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            <TfiEmail />
                            <div>
                                <div className='inter'>Email</div>
                                <div>000000000000</div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            <HiOutlineBuildingOffice2 />
                            <div>
                                <div className='inter'>Address</div>
                                <div>000000000000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center gap-16 mt-16'>
                <div className='w-full bg-gray-100'>
                    <div className='text-4xl text-center mb-4 pt-4'>Don't Hesitate To Contact Us</div>
                    
                    <form>
                        {/* Row 1 */}
                        <div className='flex flex-col lg:flex-row gap-4 px-10'>
                            <div className='flex-1'>
                                <label className='text-lg'>Name</label>
                                <input type="text" className='border rounded-sm w-full h-8 px-1 bg-white focus:shadow-2xl' />
                            </div>
                            <div className='flex-1'>
                                <label className='text-lg'>Email</label>
                                <input type="email" className='border rounded-sm w-full h-8 px-1 bg-white' />
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className='flex flex-col lg:flex-row gap-4 px-10 mt-4'>
                            <div className='flex-1'>
                                <label className='text-lg'>Phone</label>
                                <input type="text" className='border rounded-sm w-full h-8 px-1 bg-white' />
                            </div>
                            <div className='flex-1'>
                                <label className='text-lg'>Subject</label>
                                <input type="text" className='border rounded-sm w-full h-8 px-1 bg-white' />
                            </div>
                        </div>  
                        <div className='px-10 mt-4'>
                            <label className='text-lg'>Message</label>
                            <textarea type="text" rows={6} className='border rounded-sm w-full bg-white'  />
                        </div>
                        <br />
                        <div className='flex items-center justify-center flex-col mb-4'>
                            <button className='bg-[#050a30] text-xl px-4 py-1 rounded-sm text-white hover:cursor-pointer hover:bg-white hover:border hover:border-[#050a30] hover:text-[#050a30]'>SUBMIT</button>

                        </div>
                    </form>
                </div>
                <div className='text-left text-black roboto-wcise lg:w-1/2'>
                    <h3 className='text-[22px] lg:text-[26px] inter'>Contact Address:</h3>
                    <br />
                    <h2 className='text-[24x] lg:text-[30px]'>Prof. (Dr) C. C. Tan</h2>
                    <br />
                    <p className='text-[16px]'>General Chair, WCISE</p>
                    <p className='text-[16px]'>Rajamangala University of Technology,</p>
                    <p className='text-[16px]'>Rattanakosin,</p>
                    <p className='text-[16px]'>Bangkok, Thailand.</p>
                    <div><strong className='text-[16px]'>Email : </strong><span className='text-[#1d3b58] cursor-pointer underline lg:text-[18px]'>wcise.convenor@gmail.com</span></div>
                    <div><strong className='text-[16px]'>Visit : </strong><span className='text-[#1d3b58] cursor-pointer underline lg:text-[18px]'>wcise.co.in</span></div>
                    <br />
                    <div className='text-[30px]'>We're on Socials</div>
                    <a href="https://www.facebook.com/people/WCISE-Conference/100068581008071/" target="_blank" rel="noopener noreferrer">
                        <div>
                            <IoLogoFacebook size={45} className="text-[#1877F2] hover:opacity-80 cursor-pointer" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default GetInTouch