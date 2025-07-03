import React from "react";
import { motion } from "motion/react";

import img1 from "../../images/1.jpg";
import img2 from "../../images/2.jpg";
import img3 from "../../images/3.jpg";
import img4 from "../../images/4.png";
import img5 from "../../images/5.jpg";
import img6 from "../../images/6.jpg";
import img7 from "../../images/7.jpg";
import img8 from "../../images/8.jpg";

const scrollImageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

function Publisher() {
  return (
    <div className="mt-10 ml-4 mr-4 mb-4">
      <h3 className="text-[#1d3b58] font-bold text-3xl text-center mb-3 lg:text-4xl">
        PUBLISHER, INDEXING PARTNER, AND TECHNICAL CO-SPONSOR
      </h3>
      <div className="flex flex-col items-center justify-center gap-8">
        {/* First Row */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          variants={scrollImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            src={img1}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
          <motion.img
            src={img2}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
          <motion.img
            src={img3}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
          <motion.img
            src={img4}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
        </motion.div>

        {/* Second Row */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          variants={scrollImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            src={img5}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
          <motion.img
            src={img6}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
          <motion.img
            src={img7}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
          <motion.img
            src={img8}
            alt=""
            className="w-[190px] h-[190px] border-4 p-2"
            variants={itemVariants}
          />
        </motion.div>

        {/* Venue Section */}
        <div>
          <div className="text-4xl font-bold text-center my-8 text-[#1d3b58] lg:text-6xl">
            VENUE
          </div>
          <h2 className="text-3xl text-center">
            Citrus Grand Pattaya, Pattaya,
            <div>Thailand.</div>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Publisher;