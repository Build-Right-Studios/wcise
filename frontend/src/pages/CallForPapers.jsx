import React from 'react'
import Tracks from '../components/tracks/Tracks';
import cfp from '../images/cfp-1.png'


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
    <div className='md:p-6 p-4 text-[#1d3b58] font-sans max-sm:bg-white bg-[#1d3b58]'>
      <div className='bg-white flex flex-col items-center justify-center p-8'>

        {/* Call for paper parts */}
        <div className='text-3xl text-center md:text-5xl font-bold m-4'>CALL FOR PAPERS</div>
        <div className='md:m-8 sm:m-6 m-2 md:text-2xl p-2 text-justify h-auto w-auto text-xl md:h-auto md:w-200 md:justify-center flex'><p>WCISE-2023 is the premier forum for the presentation of advancement in technology and research results. All the participants are encouraged for their contribution to the conference through submissions of their research abstracts and papers. Originality and unpublished results of conceptual, experimental or theoretical work in all areas of electronics and computer systems are encouraged and cordially invited for presentation at the conference.</p></div>
        <div className='flex md:flex-row  gap-4 flex-col items-center p-8'>
          <div className='w-1/2 max-sm:hidden'><img src={cfp} alt='image'></img></div>
          <div className='bg-[#1d3b58] text-white h-auto w-80  md:text-2xl text-xl md:h-1/2 md:w-1/2 p-4 text-justify rounded-4xl '  ><p>Note: WCISE-2023 Submissions are solicited, but not limited to the following areas.</p></div>
        </div>

        {/* Topics Part */}
        <div className='text-4xl font-bold mt-6 text-center sm:text-5xl underline'>TOPICS</div>
        <div className='flex flex-col gap-6 p-4 sm:m-8 sm:p-4'> 
          <div className='flex flex-col gap-6 sm:flex-row sm:gap-8'> 
            {/* Card 1 */}
            <div
              onClick={handleClickAndScroll}
              className=' w-full sm:w-1/2 md:w-[400px] bg-[#1d3b58] flex items-center justify-center rounded-xl md:shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'
            >
              <div className='h-[140px] m-4 w-[calc(100%-16px)] sm:w-[380px] bg-white rounded-xl flex items-center justify-center p-2'> {/* Adjusted width with calc */}
                <div className='h-[120px] w-[calc(100%-16px)] sm:w-[350px] bg-[#1d3b58] text-white text-base sm:text-xl text-center p-4 rounded-xl flex items-center justify-center'> {/* Adjusted width with calc, reduced text size */}
                  <p>Track 1 – Innovation in Science and Materials</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={handleClickAndScroll2}
              className='flex-grow flex-shrink-0 w-full sm:w-1/2 md:w-[400px] h-auto bg-[#1d3b58] flex items-center justify-center rounded-xl md:shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'
            >
              <div className='h-[140px] m-4 w-[calc(100%-16px)] sm:w-[380px] bg-white rounded-xl flex items-center justify-center p-2'>
                <div className='h-[120px] w-[calc(100%-16px)] sm:w-[350px] bg-[#1d3b58] text-white text-base sm:text-xl text-center p-4 rounded-xl flex items-center justify-center'>
                  <p>Track 2 - Innovation in Computer Science & Applications</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8 sm:flex-row sm:gap-8'> {/* Added gap for rows of cards */}
            {/* Card 3 */}
            <div
              onClick={handleClickAndScroll3}
              className='flex-grow flex-shrink-0 w-80 sm:w-1/2 md:w-[400px] h-auto bg-[#1d3b58] flex items-center justify-center rounded-xl border-[#1d3b58]-4 md:shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'
            >
              <div className='h-[140px] m-4 w-[calc(100%-16px)] sm:w-[380px] bg-white rounded-xl flex items-center justify-center p-2'>
                <div className='h-[120px] w-[calc(100%-16px)] sm:w-[350px] bg-[#1d3b58] text-white text-base sm:text-xl text-center p-4 rounded-xl flex items-center justify-center'>
                  <p>Track 3 – Innovation in Electrical & Electronics Engineering</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={handleClickAndScroll4}
              className='flex-grow flex-shrink-0 w-full sm:w-1/2 md:w-[400px] h-auto bg-[#1d3b58] flex items-center justify-center rounded-xl md:shadow-md hover:shadow-lg hover:shadow-blue-900 cursor-pointer transition-all'
            >
              <div className='h-[140px] m-4 w-[calc(100%-16px)] sm:w-[380px] bg-white rounded-xl flex items-center justify-center p-2'>
                <div className='h-[120px] w-[calc(100%-16px)] sm:w-[350px] bg-[#1d3b58] text-white text-base sm:text-xl text-center p-4 rounded-xl flex items-center justify-center'>
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