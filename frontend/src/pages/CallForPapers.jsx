import React from 'react'
import Tracks from '../components/tracks/Tracks';


function CallForPapers() {
  const handleClickAndScroll = () => {
    const targetElement = document.getElementById('sec-1');

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const handleClickAndScroll2 = () => {
    const targetElement = document.getElementById('sec-2');

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleClickAndScroll3 = () => {
    const targetElement = document.getElementById('sec-3');

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  const handleClickAndScroll4 = () => {
    const targetElement = document.getElementById('sec-4');

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className='p-4 text-[#1d3b58] font-sans bg-[#1d3b58]'>
      <div className='bg-white flex flex-col items-center justify-center p-8'>

        {/* Call for paper parts */}
        <div className=' text-center text-5xl font-bold m-4'>CALL FOR PAPERS</div>
        <div className='m-8 p-2 text-justify h-auto w-auto text-2xl md:h-auto md:w-200 justify-center flex'><p>WCISE-2023 is the premier forum for the presentation of advancement in technology and research results. All the participants are encouraged for their contribution to the conference through submissions of their research abstracts and papers. Originality and unpublished results of conceptual, experimental or theoretical work in all areas of electronics and computer systems are encouraged and cordially invited for presentation at the conference.</p></div>
        <div className='flex flex-row items-center p-8'>
          <div className='w-1/2'><img src='/src/images/cfp-1.png' alt='image'></img></div>
          <div className='bg-[#1d3b58] text-white text-2xl h-1/2 w-1/2 p-4 text-justify rounded-4xl '  ><p>Note: WCISE-2023 Submissions are solicited, but not limited to the following areas.</p></div>
        </div>

        {/* Topics Part */}
        <div className='text-5xl font-bold mt-6'>TOPICS</div>
        <div className='flex flex-col gap-8 m-8 p-4'>
          <div className='flex flex-row gap-8'>
            <div onClick={handleClickAndScroll}
              className='h-[200px] w-[400px] bg-[#1d3b58] flex items-center justify-center rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'>
              <div className='h-[180px] w-[380px] bg-white p-4 rounded-xl  flex items-center justify-center'>
                <div className='h-[150px] w-[350px] bg-[#1d3b58] text-white text-xl text-center p-6 rounded-xl'>
                  <p>Track 1 – Innovation in Science and Materials</p>
                </div>
              </div>
            </div>

            <div onClick={handleClickAndScroll2} className='h-[200px] w-[400px] bg-[#1d3b58] flex items-center justify-center rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'>
              <div className='h-[180px] w-[380px] bg-white p-4 rounded-xl  flex items-center justify-center'>
                <div className='h-[150px] w-[350px] bg-[#1d3b58]  text-white text-xl text-center p-6 rounded-xl'>
                  <p>Track 2 - Innovation in Computer Science & Applications</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-8'>
            <div  onClick={handleClickAndScroll3} className='h-[200px] w-[400px] bg-[#1d3b58] flex items-center justify-center rounded-xl border-[#1d3b58]-4 shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'>
              <div className='h-[180px] w-[380px] bg-white p-4 rounded-xl  flex items-center justify-center '>
                <div className='h-[150px] w-[350px] bg-[#1d3b58]   text-white text-xl text-center p-6 rounded-xl'>
                  <p>Track 3 – Innovation in Electrical & Electronics Engineering</p>
                </div>
              </div>
            </div>
            <div onClick={handleClickAndScroll4} className='h-[200px] w-[400px] bg-[#1d3b58] flex items-center justify-center rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'>
              <div className='h-[180px] w-[380px] bg-white p-4 rounded-xl  flex items-center justify-center'>
                <div className='h-[150px] w-[350px] bg-[#1d3b58]   text-white text-xl text-center p-6 rounded-xl'>
                  <p>Track 4 - Innovations in Management & SOCIAL SCIENCE</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Tracks part */}
        <Tracks />
      </div>
    </div>
  )
}

export default CallForPapers