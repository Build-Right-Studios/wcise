import react from "react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import logo from './images/wcise_logo.png';

import {
  Award,
  Calendar,
  Mic,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const RightNav = () => {
  return (
    <div className="bg-[#f4f5f7]">
      <LeftNav />

      <div className="p-4 sm:ml-64">
        {/* Content */}
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800">
            Main Content Area
          </h1>
          <p className="mt-2 text-gray-600">Awards section</p>
        </div>
      </div>
    </div>
  );
};

// Reusable NavLink Component
const NavLink = ({ icon, text, active }) => (
  <a
    href="#"
    className={`
      flex items-center p-3 my-1 rounded-lg text-white
      transition-colors duration-200
      ${active ? "bg-[#122e76]" : "hover:bg-[#f4f5f7]"}
    `}
  >
    {icon}
    <span className="ml-4 font-medium">{text}</span>
  </a>
);

const LeftNav = () => {
  const [activeLink, setActiveLink] = useState("Keynotes");

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-[#122e76]">
        <div className="flex items-center justify-center p-4 mb-5 border-b border-white">
          <img src={logo} alt="WCISE Logo" className="h-8 w-8 mr-3" />
          <h1 className="ml-3 text-2xl font-bold text-white">WCISE</h1>
        </div>

        <ul className="space-y-2 font-medium flex-1">
          <li>
            <NavLink
              icon={<Award size={20} />}
              text="Awards"
              active={activeLink === "Awards"}
              onClick={() => setActiveLink("Awards")}
            />
          </li>
          <li>
            <NavLink
              icon={<Calendar size={20} />}
              text="Previous Event"
              active={activeLink === "Previous Event"}
              onClick={() => setActiveLink("Previous Event")}
            />
          </li>
          <li>
            <NavLink
              icon={<Mic size={20} />}
              text="Keynotes"
              active={activeLink === "Keynotes"}
              onClick={() => setActiveLink("Keynotes")}
            />
          </li>
          <li>
            <NavLink
              icon={<Users size={20} />}
              text="Committee"
              active={activeLink === "Committee"}
              onClick={() => setActiveLink("Committee")}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RightNav;
