import { motion } from 'framer-motion';
import React, { useState } from 'react';

function Awards() {
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

  const sectionHeadingStyle =
    "bg-blue-900 text-white px-8 py-2 font-bold rounded-full mb-6 block text-center w-fit mx-auto";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-8 py-10 gap-12">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">Awards</h1>

      {/* ---------- Form 1 ---------- */}
      <form
        onSubmit={handleSubmit1}
        className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]"
      >
        <div className={sectionHeadingStyle}>Add Awards</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ label: 'Year', name: 'year' },
          { label: 'Award Title', name: 'title' },
          { label: 'Awards Name and Date', name: 'nameDate' },
          { label: 'Awards Description', name: 'description' },
          { label: 'Rewards', name: 'rewards' },
          { label: 'Nomination Procedure', name: 'nomination' }].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold">{field.label} :</label>
              <input
                type="text"
                name={field.name}
                value={formData1[field.name]}
                onChange={handleChange1}
                className="w-full border border-gray-400 rounded-md p-2"
              />
            </div>
          ))}
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

      {/* ---------- Form 2 ---------- */}
      <form
        onSubmit={handleSubmit2}
        className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]"
      >
        <div className={sectionHeadingStyle}>Awardee's List</div>

        <div className="mb-6">
          <label className="block font-semibold text-lg mb-2">Select Year</label>
          <select
            name="year"
            value={formData2.year}
            onChange={handleChange2}
            className="w-full border border-gray-400 rounded-md p-2 font-semibold"
          >
            <option value="">Select Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-lg mb-2">Upload Picture</label>
          <input
            type="file"
            name="picture"
            className="border-2 border-dashed border-gray-500 p-2 rounded-md w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[{ label: 'Name', name: 'name' },
          { label: 'Designation', name: 'designation' },
          { label: 'Affiliation', name: 'affiliation' },
          { label: 'Award', name: 'award' }].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold">{field.label} :</label>
              <input
                type="text"
                name={field.name}
                value={formData2[field.name]}
                onChange={handleChange2}
                className="w-full border border-gray-400 rounded-md p-2"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block font-semibold">Award ID :</label>
            <input
              type="text"
              name="awardId"
              value={formData2.awardId}
              onChange={handleChange2}
              className="w-full border border-gray-400 rounded-md p-2"
            />
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

      {/* ---------- Form 3 ---------- */}
      <form className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]">
        <div className={sectionHeadingStyle}>Read more</div>

        <div className="mb-6">
          <label className="block font-bold text-lg mb-2">Select Year</label>
          <select
            name="year3"
            className="w-full border border-gray-400 rounded-md p-2 font-bold"
          >
            <option>Select Year</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold">Field of specialization :</label>
            <input
              type="text"
              name="specialization"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold">Award Name :</label>
            <input
              type="text"
              name="awardName"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-semibold">Award Details :</label>
            <input
              type="text"
              name="awardDetails"
              className="w-full border border-gray-400 rounded-md p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">Description about the awardee :</label>
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

export default Awards;
