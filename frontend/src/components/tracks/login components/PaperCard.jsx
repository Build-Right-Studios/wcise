import React from 'react';

const PaperCard = ({ paper, onViewMore }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition">
      <h3 className="font-semibold text-lg mb-1">{paper.title}</h3>
      <p className="text-sm text-gray-600 mb-1">Paper ID: {paper.id}</p>
      <p className="text-sm text-gray-600 mb-1">Tags: {paper.keyTags}</p>
      <p className="text-sm text-gray-600 mb-1">PDF: {paper.pdf}</p>
      <p className="text-sm text-gray-600 mb-1">Status: {paper.status}</p>
      <p className="text-xs text-gray-500">Date: {paper.date}</p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onViewMore}
          className="bg-[#4267B2] hover:bg-[#365899] text-white px-4 py-2 rounded-full text-sm transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default PaperCard;
