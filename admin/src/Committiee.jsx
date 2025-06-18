import { motion } from 'framer-motion';
import React, { useState } from 'react';

function Committiee() {
  const [formData1, setFormData1] = useState({
    year: '',
    title: '',
    nameDate: '',
    description: '',
    rewards: '',
    nomination: ''
  });

  const [formData2, setFormData2] = useState({
    year: '',
    name: '',
    designation: '',
    affiliation: '',
    award: '',
    awardId: '',
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-8 py-10 gap-12">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">Committiee</h1>

      <form className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="md:col-span-2">
            <label className="block font-semibold">General Chair :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Conference Chair :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Conference Co-Chair :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Track Chair :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Organizing Secretary :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Publicity Chair :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Publication Chair :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Convenor :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Conference Tour Manager :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">International Advisory Committiee:</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Technical Program Committee :</label>
            <textarea
              name="awardeeDescription"
              className="w-full border border-gray-400 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
  <motion.button
    type="submit"
    className="border-4 border-[#10276b] text-[#10276b] font-semibold rounded-full px-8 py-2 hover:bg-[#10276b] hover:text-white transition-all"
    
  >
    SAVE DETAILS
  </motion.button>
</div>

      </form>

    </div>
  );
}

export default Committiee;
