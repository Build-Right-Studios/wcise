import { motion } from "framer-motion";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5" 
    stroke="#000"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle, isOpen }) => (
  <button
    onClick={toggle}
    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-50" // Adjusted positioning and added shadow
  >
    <svg width="20" height="20" viewBox="0 0 23 23"> {/* Reduced SVG size */}
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);