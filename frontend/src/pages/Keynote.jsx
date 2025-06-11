import React from 'react';
import Card from '../components/card/Card';

function Keynote() {
  return (
    <div className='p-6 text-[#1d3b58]'>
      <p className='text-2xl sm:text-4xl text-center font-bold mb-8'>KEYNOTE SPEAKERS</p>

      <div className='flex flex-wrap justify-center items-stretch gap-8'>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/director.jpg"
            heading="Prof. Yannakorn Toprayoon"
            subhead="Director"
            para="Management, Rajpark Institute, Thailand"
          />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/prof_1.jpg"
            heading="Prof. Shamimul Qamar"
            subhead="Professor"
            para="King khalid University, Abha Kingdom of saudi arabia"
          />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>Read More</button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/ap.jpg"
            heading="Prof. Nitin Chanderwal"
            subhead="Associate Professor"
            para="University of Cincinnati, USA"
          />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>Read More</button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/avp.jpeg"
            heading="Laxmi Kant Sahoo"
            subhead="Assistant Vice President"
            para="Mahindra Group, India"
          />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>Read More</button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/prof_2.jpg"
            heading="Prof. Yannakorn Toprayoon"
            subhead="Professor"
            para="Rajamangala University of Technology, Rattanakosin, Thailand"
          />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>Read More</button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/prof_3.png"
            heading="A. Pushparaghavan"
            subhead="Professor"
            para="Bahir Dar University, Bahir Dar, Ethiopia" />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>Read More</button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl="./src/images/ap_2.jpg"
            heading="DR. WORAKAMOL WISETSRI"
            subhead="ASSOCIATE PROFESSOR"
            para="King Mongkut's University of Technology North Bangkok" />
          <button className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'>Read More</button>
        </div>

      </div>

    </div>
  );
}

export default Keynote;