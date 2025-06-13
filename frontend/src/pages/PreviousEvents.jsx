import React, { useState } from 'react';
import PrevButtons from '../components/tracks/PrevButtons';
import img1 from '../images/graphic1.png';
import img2 from '../images/graphic2.png';

function PreviousEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventLabel) => {
    setSelectedEvent(eventLabel);
    alert(`Selected Event: ${eventLabel}`);
  };

  return (
    <div>
      <div className="text-center mt-8 mb-10 text-6xl font-bold text-[#1d3b58]">
        Previous Conferences
      </div>

      <div className="relative min-h-screen bg-[#050e2d] flex flex-col items-center justify-center px-4 py-10">
        
        {/* Background Images */}
        <img
          src={img1}
          alt="image"
          className="absolute top-0 right-0 w-40 opacity-80 z-0"
        />
        <img
          src={img2}
          alt="image2"
          className="absolute bottom-0 left-0 w-40 opacity-80 z-0"
        />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
        <div className="text-center mb-12 text-3xl font-bold text-white tracking-wide roboto-wcise">
          Click below to explore conference galleries
        </div>

        {/* Buttons */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10 mb-10">
            <PrevButtons textTop="India" textBottom="2019" location="Dehradun, India" onClick={() => handleEventClick("India 2019")} />
            <PrevButtons textTop="Thailand" textBottom="2019" location="Bangkok, Thailand" onClick={() => handleEventClick("Thailand 2019")} />
            <PrevButtons textTop="India" textBottom="2020" location="Dehradun, India" onClick={() => handleEventClick("India 2020")} />
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10">
            <PrevButtons textTop="India" textBottom="2021" location="Online, India" onClick={() => handleEventClick("India 2021")} />
            <PrevButtons textTop="Thailand" textBottom="2022" location="Pattaya, Thailand" onClick={() => handleEventClick("Thailand 2022")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviousEvents;
