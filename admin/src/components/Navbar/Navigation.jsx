import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ navItems, activeLink, setActiveLink, toggleOpen }) => (
  <motion.ul
    variants={variants}
    className="absolute top-[80px] left-0 w-full p-6" // Adjust top position and width
  >
    {navItems.map((item) => (
      <MenuItem
        key={item.text}
        icon={item.icon}
        text={item.text}
        onClick={() => {
          setActiveLink(item.text);
          toggleOpen(); // Close sidebar on link click
        }}
        isActive={activeLink === item.text}
      />
    ))}
  </motion.ul>
);