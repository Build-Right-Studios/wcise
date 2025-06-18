import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// Removed fixed colors and `i` prop as they are no longer necessary for dynamic links
export const MenuItem = ({ icon, text, onClick, isActive }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }} // Slightly reduced hover scale
      whileTap={{ scale: 0.98 }} // Slightly increased tap scale
      className="mb-2 cursor-pointer" // Adjust margin
    >
      <button
        onClick={onClick}
        className={`flex items-center p-3 rounded-lg w-full transition-colors duration-200 ${
          isActive
            ? "bg-[#122e76] text-white"
            : "hover:bg-[#f4f5f7] text-[#122e76]"
        }`}
      >
        {icon}
        <span className="ml-4 font-medium">{text}</span>
      </button>
    </motion.li>
  );
};