import React, { useState } from 'react';

function PreviousEventsForm() {
  const [formData, setFormData] = useState({
    year: '',
    country: '',
    city: '',
    Title: '',
    'Sub-Title': '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      {/* ----------- Section 1 ----------- */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-8 py-10 gap-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">Previous Events</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]"
        >
          <div className="text-center text-white font-bold bg-[#10276b] px-8 py-2 rounded-full mb-6 w-fit mx-auto">
            Details
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[{ label: 'Year', name: 'year' }, { label: 'Country', name: 'country' }, { label: 'State/City', name: 'city' }].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold">{field.label} :</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md p-2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="border-4 border-[#10276b] text-[#10276b] font-semibold rounded-full px-8 py-2 hover:bg-[#10276b] hover:text-white transition-all"
            >
              SAVE DETAILS
            </button>
          </div>
        </form>
      </div>

      {/* ----------- Section 2 ----------- */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-8 py-10 gap-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-10 w-full md:w-3/5 lg:w-[60%]"
        >
          <div className="text-center text-white font-bold bg-[#10276b] px-8 py-2 rounded-full mb-6 w-fit mx-auto">
            Details
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[{ label: 'Title', name: 'Title' }, { label: 'Sub-Title', name: 'Sub-Title' }].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold">{field.label} :</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md p-2"
                />
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-lg mb-2">Upload Picture</label>
            <input
              type="file"
              name="picture"
              className="border-2 border-dashed border-gray-500 p-2 rounded-md w-full"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="border-4 border-[#10276b] text-[#10276b] font-semibold rounded-full px-8 py-2 hover:bg-[#10276b] hover:text-white transition-all"
            >
              SAVE DETAILS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PreviousEventsForm;
