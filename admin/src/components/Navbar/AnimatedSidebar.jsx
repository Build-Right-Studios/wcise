import React, { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { Award, Calendar, Mic, Users } from "lucide-react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Awards from "../../awards";
import PreviousEvents from "../../PreviousEvents";
import Committiee from "../../committiee";
import { useDimensions } from "./useDimensions";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";


const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: { delay: 0.3, type: "spring", stiffness: 400, damping: 40 },
  },
};

const wciseTitleVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.1, type: "spring", stiffness: 100, damping: 20 },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { delay: 0, type: "spring", stiffness: 400, damping: 40 },
  },
};

const AnimatedSidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [activeLink, setActiveLink] = useState("Awards");
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const navigate = useNavigate();

  const navItems = [
    { icon: <Award size={20} />, text: "Awards", path: "/awards" },
    { icon: <Calendar size={20} />, text: "Previous Events", path: "/events" },
    { icon: <Mic size={20} />, text: "Keynotes", path: "/keynotes" },
    { icon: <Users size={20} />, text: "Committee", path: "/committiee" },
  ];

  const NavLink = ({ icon, text, path }) => (
    <button
      onClick={() => {
        setActiveLink(text);
        toggleOpen(); 
        navigate(path);
      }}
      className={`flex items-center p-3 my-1 rounded-lg w-full transition-colors duration-200 ${
        activeLink === text
          ? "bg-[#122e76] text-white"
          : "hover:bg-[#f4f5f7] text-[#122e76]"
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{text}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-[#f4f5f7]">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="fixed top-0 left-0 bottom-0 z-50 sm:hidden w-full"
      >
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-[300px] bg-white shadow-lg"
          variants={sidebarVariants}
        />
        <div className="relative top-0 left-0 bottom-0 w-[300px] p-6 z-50">
          <motion.h1
            className="text-xl mx-10 font-bold text-[#122e76] mb-6"
            variants={wciseTitleVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            WCISE
          </motion.h1>

          {navItems.map((item) => (
            <NavLink
              key={item.text}
              icon={item.icon}
              text={item.text}
              path={item.path}
            />
          ))}
        </div>
        <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
      </motion.nav>

      <aside className="hidden sm:block w-64 h-screen bg-[#122e76] text-white p-6 shadow-xl">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">WCISE</h1>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.text}
            icon={item.icon}
            text={item.text}
            path={item.path}
          />
        ))}
      </aside>

      <main className="flex-1 p-6 sm:ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/awards" />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/events" element={<PreviousEvents />} />
          <Route path="/committiee" element={<Committiee />} />
          <Route path="/keynotes" element={<div>Keynotes Component Coming Soon</div>} />
          <Route path="*" element={<p className="text-gray-500">Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
};

export default AnimatedSidebar;
