import React from 'react';
import './Arrowcard.css';

const ArrowCard = ({ title, data }) => {
  return (
    <div className="bg-white shadow-md w-auto rounded-lg p-4 m-4 sm:p-6 sm:m-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 m-0 sm:m-6">
        <div className="arrow-right bg-[#183655] text-white font-bold p-4 text-center text-sm sm:p-6 sm:text-3xs sm:w-70 max-sm:w-40 max-sm:h-auto"> 
          {title}
        </div>

        <div className="text-justify text-sm max-sm:text-center max-sm:m-0 mx-8 sm:text-base"> 
          {data.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrowCard;