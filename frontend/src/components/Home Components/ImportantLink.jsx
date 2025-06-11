import React from 'react'
import deadlines from '../../images/deadlines.png'

function ImportantLink() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='mt-10 ml-4 mr-4 mb-4'>
            <h3 className='text-[#1d3b58] font-bold text-4xl text-center lg:text-5xl'>IMPORTANT LINKS</h3>
            <p className='text-[#050a30] mt-4 text-xl text-center lg:text-3xl'>Authors are invited to submit paper through the Google form link.</p>
            <p className='text-red-500 text-xl mt-4 text-center hover:text-[#050a30] hover:underline cursor-pointer lg:text-3xl'>Click here to submit your paper</p>
        </div>
        <div className='mt-10 ml-4 mr-4 mb-4 border-4 rounded-xl w-fit mx-auto'>
            <h3 className='text-[#1d3b58] font-bold text-4xl text-center lg:text-5xl'>IMPORTANT DEADLINES</h3>
            <div className='mt-4 flex flex-col items-center justify-center lg:flex-row'>
                <img src={deadlines} alt="" className='lg:w-[450px] lg:h-[400px] mb-8'/>
                <div className='ml-4'>
                    <ol className='list-disc flex flex-col gap-4 ml-4 mr-4 text-[#1d3b58]'>
                        <li>
                            <div className='text-3xl'>SUBMISSION OF FINAL PAPER: </div>
                            <div className='text-xl'>October 31, 2023</div>
                        </li>
                        <li>
                            <div className='text-3xl'>PAPER ACCEPTANCE NOTIFICATION:</div>
                            <div className='text-xl'>November 15, 2023</div>
                        </li>
                        <li>
                            <div className='text-3xl'>RECEIVING CRC AND REGISTRATION:</div>
                            <div className='text-xl mb-4'>November 30, 2023</div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImportantLink