import React, { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { Award, Calendar, Mic, Users } from "lucide-react";
import { useDimensions } from "./useDimensions";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";

// Variants for the sidebar background (clipPath)
const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// Variants for the WCISE title
const wciseTitleVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1, // Slight delay to appear after clipPath starts opening
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  closed: {
    opacity: 0,
    x: -20, // Move slightly left when fading out
    transition: {
      delay: 0, // No delay for disappearing
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const AnimatedSidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [activeLink, setActiveLink] = useState("Keynotes");
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const navItems = [
    { icon: <Award size={20} />, text: "Awards" },
    { icon: <Calendar size={20} />, text: "Previous Event" },
    { icon: <Mic size={20} />, text: "Keynotes" },
    { icon: <Users size={20} />, text: "Committee" },
  ];

  const NavLink = ({ icon, text, onClick }) => (
    <button
      onClick={onClick}
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
      {/* Mobile sidebar: Framer Motion */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="fixed top-0 left-0 bottom-0 z-50 sm:hidden w-full"
      >
        {/* Background div with clipPath */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-[300px] bg-white shadow-lg"
          variants={sidebarVariants}
        />

        {/* Content div - separate from clipPath background but still relative to nav */}
        <div className="relative top-0 left-0 bottom-0 w-[300px] p-6 z-50">
          {/* WCISE Title - now a motion component */}
          <motion.h1
            className="text-xl mx-10 font-bold text-[#122e76] mb-6"
            variants={wciseTitleVariants}
            initial="closed" // Ensure it starts hidden
            animate={isOpen ? "open" : "closed"}
          >
            WCISE
          </motion.h1>

          {/* Navigation links */}
          <Navigation
            navItems={navItems}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            toggleOpen={toggleOpen}
          />
        </div>
        {/* Hamburger Button */}
        <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
      </motion.nav>

      {/* Static sidebar for larger screens */}
      <aside className="hidden sm:block w-64 h-screen bg-[#122e76] text-white p-6 shadow-xl">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">WCISE</h1>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.text}
            icon={item.icon}
            text={item.text}
            onClick={() => setActiveLink(item.text)}
          />
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:ml-64">
        <h1 className="text-2xl font-bold text-gray-800">Main Content Area</h1>
        <p className="mt-2 text-gray-600">Selected: {activeLink}</p>
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Responsive Design Overview:</h2>
            <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>On **mobile (screens less than 640px)**, the sidebar appears as an animated overlay controlled by a hamburger menu.</li>
                <li>On **desktop (screens 640px and wider)**, a static, always-visible sidebar is displayed on the left.</li>
                <li>Navigation links automatically highlight the active section and close the mobile sidebar upon selection.</li>
            </ul>
        </div>
      </main>
    </div>
  );
};

export default AnimatedSidebar;