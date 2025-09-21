import React from 'react'
import { motion } from "framer-motion"

function ImportantNews() {
  return (
    <div className='ml-4 mr-4 mt-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-center'>
      <div className='flex flex-col border-4 h-full mt-4 border-[#1d3b58] bg-[#f5fbf9] lg:w-1/5'>
        <div className='text-center text-3xl pb-2 text-[#1d3b58] font-bold p-4'>Important News</div>
        <div className='relative h-72 mx-4 overflow-hidden text-xl'>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "-50%" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatType: 'loop',
            }}
            className="absolute w-full text-center"
          >
            <p>20th December 2023 will be conference tour to Kohlarn Island.</p> <br /> <br /> <br /> <br />
            <p>25th December 2023 will be conference tour to Kohlarn Island.</p> <br /> <br /> <br /> <br />
            <p>29th December 2023 will be conference tour to Kohlarn Island.</p> <br /> <br /> <br /> <br />
          </motion.div>
        </div>
      </div>

      <div>
        <div>
          <h3 className='mt-6 text-center text-[#1d3b58] text-2xl font-bold mb-4'>
            ALL ACCEPTED PAPERS WILL BE PUBLISHED IN ONE OF THE FOLLOWING INDEX JOURNALS:
          </h3>

          <div className='border-2 border-[#1d3b58] p-4 rounded mb-4 shadow-xl shadow-blue-500/30'>
            <h3 className='text-lg font-bold'>OPTION-1 SCOPUS Indexed Book Chapter</h3>
            <div>Awaiting approval</div>
          </div>



          <div className='border-2 border-[#1d3b58] p-4 mb-4 shadow-xl shadow-blue-500/30'>
            <h3 className='text-lg font-bold'>OPTION-2 NON SCOPUS Indexed JOURNALS</h3>
            <div>
              International Journal of Innovations in Management, Science and Engineering (Crossref, Google Scholar & Research Gate).<br />
              <a href="https://ijimse.co.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                https://ijimse.co.in/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportantNews
