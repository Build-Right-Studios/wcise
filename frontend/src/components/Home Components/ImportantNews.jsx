import React from 'react'
import {motion} from 'motion/react'

function ImportantNews() {

  return (
    <div className='ml-4 mr-4 mt-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-center'>
      <div className='flex flex-col border-4 h-full border-[#1d3b58] bg-[#f5fbf9] lg:w-1/5'>

        <div className='text-center text-3xl pb-2 text-[#1d3b58] font-bold '>Important News</div>
        <div className='relative h-60 mx-4 overflow-hidden text-xl'>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: 'loop',
            }}
            className="absolute w-full text-center"
          >
            <p>20th December 2023 will be conference tour to Kohlarn Island.</p> <br /> <br /> <br />
            <p>25th December 2023 will be conference tour to Kohlarn Island.</p> <br /> <br /> <br />
            <p>29th December 2023 will be conference tour to Kohlarn Island.</p> 
          </motion.div>
        </div>
      </div>

      <div>
        <div>
          <h3 className='mt-6 text-center text-[#1d3b58] text-2xl font-bold mb-4'>ALL ACCEPTED PAPERS WILL BE PUBLISHED IN ONE OF THE FOLLOWING INDEX JOURNALS:</h3>
          <div className='border-2 border-[#1d3b58] p-4 rounded shadow-2xl mb-4'>
            <h3 className='text-lg font-bold'>OPTION-1 SCOPUS Indexed Book Chapter</h3>
            <div>Awaiting approval, Scrivener Publishing, Wiley (Indexed in SCOPUS).</div>
          </div>

          <div className='border-2 border-[#1d3b58] p-4 rounded shadow-2xl mb-4'>
            <h3 className='text-lg font-bold'>OPTION-2 SCOPUS Indexed Journal</h3>
            <div>Updated Soon</div>
          </div>

          <div className='border-2 border-[#1d3b58] p-4 rounded shadow-2xl mb-4'>
            <h3 className='text-lg font-bold'>OPTION-3 NON SCOPUS Indexed JOURNALS</h3>
            <div>International Journal of Innovations in Management, Science and Engineering (Crossref, Google Scholar & Research Gate).
              https://ijimse.co.in/
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportantNews