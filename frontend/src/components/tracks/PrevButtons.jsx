import React from 'react';

const PrevButtons = ({ textTop, textBottom, location, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className="w-44 h-44 rounded-full bg-[#61b0f2] border-[6px] border-[#2e4a91] flex flex-col justify-center items-center text-white font-bold text-xl shadow-md hover:scale-105 transition-transform duration-300"
      >
        <span>{textTop}</span>
        <span className="text-2xl">{textBottom}</span>
      </button>
      <p className="text-white font-semibold mt-2 text-sm">{location}</p>
    </div>
  );
};

export default PrevButtons;
