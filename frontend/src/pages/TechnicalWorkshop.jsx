import React from 'react'
// import courseDetails from './components/tracks/courseDetails.jsx';
import Abc from '../components/tracks/Abc';
function TechnicalWorkshop() {

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
    <div className="text-center mt-8 text-6xl font-bold text-[#1d3b58]">WCISE-RESEARCH ORIENTED WORKSHOP

      <h1 className="text-xl sm:text-2xl md:text-3xl text-center mt-4 sm:mt-6 text-[#1d3b58] px-4 sm:px-6">
  Under the Aegis of Ministry of Micro, Small & Medium Enterprises (MSME), Government of India
</h1>

      <div
  className="bg-cover bg-center bg-no-repeat mt-10 p-6 sm:p-10 text-xl font-bold text-[#1d3b58] text-justify"
  style={{ backgroundImage: "url('./src/images/Untitled design (1).png')" }}
>
  <p className="p-4 rounded">
    The technology is playing an important role in formulating a good research article or project.
    The in-depth knowledge of technology provides the researchers to convert their ideas into latest innovations.
    During our conferences and social meetings, we got feedback from our participants that there is a lack of information on the net, books and research articles about the application of latest technology from research perspective.
    This motivates WCISE research group to collaborate with the experienced people in industry and academia to fill this gap.
    This led to the start of WCISE-RESEARCH ORIENTED WORKSHOP on latest technologies as per the need of market.
    Initially, we are starting with four technologies as per availability of domain specific people.
    The support and requirement of audience will provide us the feedback to include more courses or not.
  </p>
</div>
      <div className="bg-[#040833] text-white font-bold text-xl px-10 py-4 rounded-full inline-block ml-8 mt-10">
        COURSES OFFERED
      </div>
      <div className="flex justify-center px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div onClick={handleClickAndScroll} className="cursor-pointer transition-all w-full sm:w-[300px] md:w-[400px] h-[240px] sm:h-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg border-4 border-[#0a0e3f] flex items-center justify-center mx-auto hover:shadow-blue-900">
            <img src=".\src\images\embedded systems.png" alt="Embedded Systems"
              className="object-contain w-full h-full rounded-xl p-4" />
          </div>

          <div onClick={handleClickAndScroll2} className=" cursor-pointer transition-all w-full sm:w-[300px] md:w-[400px] h-[240px] sm:h-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg border-4 border-[#0a0e3f] flex items-center justify-center mx-auto hover:shadow-blue-900">
            <img src=".\src\images\IOT.png" alt="Internet of Things"
              className="object-contain w-full h-full rounded-xl p-4" />
          </div>

          <div onClick={handleClickAndScroll4} className=" cursor-pointer transition-all w-full sm:w-[300px] md:w-[400px] h-[240px] sm:h-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg border-4 border-[#0a0e3f] flex items-center justify-center mx-auto hover:shadow-blue-900">
            <img src=".\src\images\python and ml.png" alt="Python + ML"
              className="object-contain w-full h-full rounded-xl p-4" />
          </div>

          <div onClick={handleClickAndScroll3} className="cursor-pointer transition-all w-full sm:w-[300px] md:w-[400px] h-[240px] sm:h-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg border-4 border-[#0a0e3f] flex items-center justify-center mx-auto hover:shadow-blue-900">
            <img src='.\src\images\digital system design.png' alt='digital system design'
              className='object-contain w-full h-full rounded-xl p-4' />
          </div>

        </div>
        
      </div>
      <Abc/>
      <p className="text-xl text-justify text center mt-10 font-bold text-[#1d3b58] mx-15">For detailed course content Email at manoj.md.et@gmail.com or whatsup at +919667006019.</p>
      <div className="bg-[#0a0e3f] text-white font-semibold text-base sm:text-lg px-6 sm:px-12 py-3 rounded-full inline-block mt-7">
    REWARDS
  </div>

        <div className="mx-4 sm:mx-10 text-base sm:text-lg md:text-2xl">
  <ul className="mt-3 text-justify font-bold list-disc ml-4 sm:ml-6 space-y-2">
    <li>Globally recognized certificate from government approved MSME enterprise.</li>
    <li>Workshop will be conducted on 30th December 2022 at conference venue.</li>
    <li>Workshop will be conducted by industry experts/academicians/researchers as per their domain expertise.</li>
    <li>All the courses are designed with research oriented exposure to bridge the gap between academia and industry.</li>
  </ul>
  <br />
</div>

        <div className="bg-[#0a0e3f] text-white font-semibold text-base sm:text-lg px-6 sm:px-12 py-3 rounded-full inline-block mt-7">
  REGISTRATION PROCEDURE
</div>

<div className="mx-4 sm:mx-10 text-base sm:text-lg md:text-2xl">
  <ul className="mt-3 text-left font-bold list-disc ml-4 sm:ml-6 space-y-2">
    <li>Email your choice at manoj.md.et@gmail.com or WhatsApp at +91 9667006019.</li>
    <li>Submit the registration fees at <a href="https://wcise.co.in/register" className="underline text-blue-300">wcise.co.in/register</a></li>
    <li>Fill the Google Form at <a href="https://forms.gle/m4JidARm6WEaWBMM6" className="underline text-blue-300">forms.gle/m4JidARm6WEaWBMM6</a></li>
    <li>For more information WhatsApp at +91 9667006019</li>
  </ul>
  <br />
</div>

      {/* <courseDetails/> */}
    </div>


  )
}

export default TechnicalWorkshop