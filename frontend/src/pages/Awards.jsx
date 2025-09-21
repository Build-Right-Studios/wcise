import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../images/graphic1.png';
import img2 from '../images/graphic2.png';

function Awards() {
  return (
    <div className="relative min-h-screen bg-[#050e2d] flex flex-col items-center justify-center px-4 py-10 overflow-hidden">

      <img
        src={img1}
        alt="Top Right Design"
        className="absolute top-0 right-0 w-80 h-auto opacity-80 z-0 object-cover"
      />
      <img
        src={img2}
        alt="Bottom Left Design"
        className="absolute bottom-0 left-0 w-80 h-auto opacity-80 z-0 object-cover"
      />

      <h1 className="text-center mb-12 text-3xl font-bold text-white tracking-wide roboto-wcise z-10">
        Click below to explore Awards
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 z-10">
        <Link
          to="/awards-2019"
          className="w-44 h-44 rounded-full bg-[#61b0f2] border-[6px] border-[#2e4a91] flex justify-center items-center text-white font-bold text-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          2019
        </Link>
        <Link
          to="/awards-2022"
          className="w-44 h-44 rounded-full bg-[#61b0f2] border-[6px] border-[#2e4a91] flex justify-center items-center text-white font-bold text-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          2022
        </Link>
        <Link
          to="/awards-2023"
          className="w-44 h-44 rounded-full bg-[#61b0f2] border-[6px] border-[#2e4a91] flex justify-center items-center text-white font-bold text-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          2023
        </Link>
        <Link
          to="/awards-2025"
          className="w-44 h-44 rounded-full bg-[#61b0f2] border-[6px] border-[#2e4a91] flex justify-center items-center text-white font-bold text-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          2025
        </Link>
      </div>

    </div>
  );
}

export default Awards;
