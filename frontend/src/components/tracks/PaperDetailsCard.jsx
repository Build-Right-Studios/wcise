import React, { useState, useRef, useEffect } from 'react';

const PaperDetailsCard = ({ paper, latestComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [abstract, setAbstract] = useState('');
  const [status, setStatus] = useState('Under Review');
  const [pdfFile, setPdfFile] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (paper) {
      setAbstract(paper.abstract);
    }
  }, [paper]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved:", { abstract, status, pdfFile });
  };

  const handlePdfUpload = (e) => setPdfFile(e.target.files[0]);

  if (!paper) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md font-sans">
      {/* Title */}
      <div className="bg-[#0A2B6C] text-white text-center py-3 rounded-t-md text-lg font-semibold">
        Title: <span className="font-normal">{paper.title}</span>
      </div>

      {/* Details */}
      <div className="flex justify-between bg-[#f3f6fb] p-4 rounded-b-md flex-wrap gap-y-4">
        <div className="flex flex-col text-left text-sm font-medium gap-2 w-full sm:w-[45%]">
          <div><span className="font-semibold">Paper ID :</span><br />{paper._id}</div>
          <div><span className="font-semibold">Key Tags :</span><br />{paper.keywords.join(', ')}</div>
        </div>
        <div className="flex flex-col text-left text-sm font-medium gap-2 w-full sm:w-[45%]">
          <div><span className="font-semibold">Author ID :</span><br />{paper.author}</div>
          <div><span className="font-semibold">Submission Date :</span><br />{new Date(paper.submittedAt).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Abstract */}
      <div className="bg-[#f3f6fb] mt-4 p-4 rounded-md">
        <label className="font-semibold block mb-2">Abstract :</label>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      {/* Upload PDF */}
      <div
        onClick={() => isEditing && fileInputRef.current.click()}
        className={`mt-4 p-4 rounded-md text-center text-gray-700 border border-dotted border-gray-600 ${isEditing ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed bg-gray-100'}`}
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

      {/* Status */}
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

      {/* ✅ Comment Section */}
      <div className="bg-[#f3f6fb] mt-4 p-4 rounded-md">
        <label className="font-bold text-lg block mb-1">Latest Reviewer Comment:</label>
        {latestComment && latestComment.comment ? (
          <>
            <p className="text-sm text-gray-800 mt-1 italic">"{latestComment.comment}"</p>
            <p className="text-xs text-gray-500 text-right mt-2">
              — {new Date(latestComment.commentedAt).toLocaleString()}
            </p>
          </>
        ) : (
          <p className="text-gray-500 italic mt-1">No comment available yet.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleEdit}
          className={`px-6 py-2 rounded text-white ${isEditing ? 'bg-gray-400' : 'bg-[#0A2B6C] hover:bg-[#1a3c7c]'}`}
          disabled={isEditing}
        >
          Edit
        </button>

        <a
          href={paper.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded bg-[#0A2B6C] hover:bg-[#1a3c7c] text-white"
        >
          View PDF
        </a>

        <button
          onClick={handleSave}
          className={`px-6 py-2 rounded text-white ${!isEditing ? 'bg-gray-400' : 'bg-[#0A2B6C] hover:bg-[#1a3c7c]'}`}
          disabled={!isEditing}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PaperDetailsCard;
