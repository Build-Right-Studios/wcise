import React from 'react'

function ImportantNews() {
  return (
    <div className='ml-4 mr-4 mt-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-center'>
      <div className='flex flex-col border-4 border-[#1d3b58] bg-[#f5fbf9] text-center text-3xl pb-2 text-[#1d3b58] font-bold lg:w-1/5'>
        Important News
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