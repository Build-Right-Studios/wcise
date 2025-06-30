import React, { useState, useRef } from 'react';

const PaperDetailsCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [abstract, setAbstract] = useState("This paper introduces...");
  const [status, setStatus] = useState("Under Review");
  const [pdfFile, setPdfFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", { abstract, status, pdfFile });
  };

  const handlePdfUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md font-sans">
      <div className="bg-[#0A2B6C] text-white text-center py-3 rounded-t-md text-lg font-semibold">
        Title: <span className="font-normal">New Era Deep Learning</span>
      </div>

      <div className="flex justify-between bg-[#f3f6fb] p-4 rounded-b-md flex-wrap gap-y-4">
        <div className="flex flex-col text-left text-sm font-medium gap-2 w-full sm:w-[45%]">
          <div>
            <span className="font-semibold">Paper ID :</span><br />
            <span>101</span>
          </div>
          <div>
            <span className="font-semibold">Key Tags :</span><br />
            <span>ML, Deep learning, Python, AI</span>
          </div>
        </div>
        <div className="flex flex-col text-left text-sm font-medium gap-2 w-full sm:w-[45%]">
          <div>
            <span className="font-semibold">Author Name :</span><br />
            <span>R.K. Sharma</span>
          </div>
          <div>
            <span className="font-semibold">Submission Date :</span><br />
            <span>2<sup>nd</sup> June 2025</span>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f6fb] mt-4 p-4 rounded-md">
        <label className="font-semibold block mb-2">Abstract :</label>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
          placeholder="Enter abstract..."
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      <div
        onClick={() => isEditing && fileInputRef.current.click()}
        className={`mt-4 p-4 rounded-md text-center text-gray-700 border border-dotted border-gray-600 ${
          isEditing ? 'cursor-pointer hover:bg-gray-100 transition' : 'cursor-not-allowed bg-gray-100'
        }`}
      >
        Upload PDF
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handlePdfUpload}
          className="hidden"
          disabled={!isEditing}
        />
        {pdfFile && <p className="text-sm mt-2 text-green-600">{pdfFile.name}</p>}
      </div>

      <div className="bg-[#f3f6fb] mt-4 p-4 rounded-md">
        <label className="font-bold text-lg">Status :</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={!isEditing}
          className="block mt-2 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleEdit}
          className={`px-6 py-2 rounded text-white transition-all duration-300 transform font-medium ${
            isEditing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#0A2B6C] hover:bg-[#1a3c7c] active:bg-[#274a85] hover:scale-105 shadow-md hover:shadow-lg'
          }`}
          disabled={isEditing}
        >
          Edit
        </button>

        <button
          onClick={handleSave}
          className={`px-6 py-2 rounded text-white transition-all duration-300 transform font-medium ${
            !isEditing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#0A2B6C] hover:bg-[#1a3c7c] active:bg-[#274a85] hover:scale-105 shadow-md hover:shadow-lg'
          }`}
          disabled={!isEditing}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PaperDetailsCard;
