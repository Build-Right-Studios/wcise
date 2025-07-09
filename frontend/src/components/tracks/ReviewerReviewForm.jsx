import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewerReviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paper = location.state?.paper;

  const [comments, setComments] = useState('');
  const [pdfFile] = useState(paper?.pdf || '');

  const handleDownloadPdf = () => {
    if (pdfFile) {
      const link = document.createElement('a');
      link.href = pdfFile;
      link.download = pdfFile.split('/').pop();
      link.click();
    } else {
      alert('No PDF available to download');
    }
  };

  if (!paper) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        No Paper Data Found. Please go back.
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-sm text-blue-700 underline hover:text-blue-900"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold text-white bg-[#12357e] py-2 px-4 rounded-t-md text-center">REVIEW</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block font-semibold">Paper ID :</label>
          <input
            type="text"
            value={paper?.id || ''}
            readOnly
            className="w-full border p-2 rounded bg-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Date :</label>
          <input
            type="text"
            value={paper?.date || ''}
            readOnly
            className="w-full border p-2 rounded bg-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Title :</label>
          <input
            type="text"
            value={paper?.title || ''}
            readOnly
            className="w-full border p-2 rounded bg-white"
          />
        </div>
        <div>
          <label className="block font-semibold">Key Tags :</label>
          <input
            type="text"
            value={paper?.keyTags || ''}
            readOnly
            className="w-full border p-2 rounded bg-white"
          />
        </div>
      </div>

      <div
        onClick={handleDownloadPdf}
        className="border border-dashed border-black rounded-md text-center mt-4 py-3 text-gray-700 cursor-pointer hover:bg-gray-200 transition"
      >
        Click here to load Pdf
      </div>

      <div className="mt-4">
        <label className="block font-semibold mb-1">Comments :</label>
        <textarea
          rows="5"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full border rounded-md p-3"
          placeholder="Write your comments here..."
        ></textarea>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => alert('Edit Mode Enabled')}
          className="bg-[#365fb1] text-white px-6 py-2 rounded hover:bg-[#2e4c8c] transition"
        >
          Edit
        </button>
        <button
          onClick={() => alert('Review saved!')}
          className="bg-[#365fb1] text-white px-6 py-2 rounded hover:bg-[#2e4c8c] transition"
        >
          Save
        </button>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-700 underline hover:text-blue-900"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ReviewerReviewForm;
