import { motion } from 'framer-motion';
import React, { useState } from 'react';

function KeynoteAdmin() {
  const [formData1, setFormData1] = useState({
    name: '',
    designation: '',
    current: '',

  });

  const [formData2, setFormData2] = useState({
    name: '',
    description: '',

  });

  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log('Form 1 Data:', formData1);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log('Form 2 Data:', formData2);
  };

  return (
    <div>
      <div className="min-h-screen items-center bg-gray-100 flex flex-col  px-8 py-10 gap-12">

        {/* ---------- Form 1 ---------- */}
        <form
          onSubmit={handleSubmit1}
          className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]"
        >
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">KEYNOTE SPEAKERS </h1>

          <div className="bg-blue-900 w-30 h-12 text-2xl text-white px-6 py-2 font-bold rounded-full mb-6 block mx-auto"
            whileHover={{ scale: 1.05 }}
          >
            Details
          </div>

          <div className="flex flex-col  md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold">Name :</label>
              <input
                type="text"
                name="name"
                value={formData1.name}
                onChange={handleChange1}
                className="w-full border border-gray-400 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block font-semibold">Designation :</label>
              <input
                type="text"
                name="designation"
                value={formData1.text}
                onChange={handleChange1}
                className="w-full border border-gray-400 rounded-md p-2"
              />
            </div>


            <div>
              <label className="block font-semibold">Current :</label>
              <input
                type="text"
                name="current"
                value={formData1.current}
                onChange={handleChange1}
                className="w-full border border-gray-400 rounded-md p-2"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-lg mb-2">Upload Picture</label>
              <input
                type="file"
                name="picture"
                className="border-2 border-dashed border-gray-500 p-2 rounded-md w-full"
              />
            </div>


          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              SAVE DETAILS
            </motion.button>
          </div>
        </form>

        {/* ---------- Form 2 ---------- */}
        <form
          onSubmit={handleSubmit2}
          className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]"
        >
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">KEYNOTE SPEAKERS </h1>

          <div className="bg-blue-900 w-40 h-12 text-2xl text-white px-4 py-2 font-bold rounded-full mb-6 block mx-auto "
            whileHover={{ scale: 1.05 }}
          >
          Read More
          </div>

          <div className="mb-6">
            <div>
              <label className="block font-semibold">Name :</label>
              <input
                type="text"
                name="name"
                value={formData1.name}
                onChange={handleChange1}
                className="w-full border border-gray-400 rounded-md p-2"
              />
            </div>
            <div>
              <label className=" font-semibold">Description :</label>
              <textarea name="description" id="" className="w-full h-64 bg-white border  border-gray-400 rounded-lg " value={formData2.description} onChange={handleChange2}></textarea>

            </div>

          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              type="submit"
              className="bg-blue-900 text-white px-8 py-2 rounded-full  font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              SAVE DETAILS
            </motion.button>
          </div>

        </form>
      </div>
    </div>

  );
}

export default KeynoteAdmin;