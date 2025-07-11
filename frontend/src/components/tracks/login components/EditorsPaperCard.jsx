import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditorsPapercard = ({ paper }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-1">{paper.title}</h3>
      <p><strong>Paper ID:</strong> {paper.id}</p>
      <p><strong>Tags:</strong> {paper.keyTags}</p>
      <p><strong>PDF:</strong> <span className="block max-w-full overflow-hidden text-ellipsis break-all">
        {paper.pdf}
      </span></p>
      <p><strong>Status:</strong> {paper.status}</p>
      <p><strong>Date:</strong> {paper.date}</p>

      <div className="mt-3 flex justify-between items-center">
        <button
          onClick={() => navigate(`/editor/view-more/${paper.id}`, { state: { paper } })}
          className="bg-[#4267B2] text-white px-4 py-1 rounded hover:bg-[#365899] transition"
        >
          View More
        </button>

        <button
          onClick={() => window.open(`/pdfs/${paper.pdf}`, '_blank')}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
        >
          📄 View PDF
        </button>
      </div>
    </div>
  );
};

export default EditorsPapercard;
