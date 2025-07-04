import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewerDashboard = () => {
  const [reviewer, setReviewer] = useState({
    name: 'Dr. A. Mehta',
    email: 'mehta@example.com',
    phone: '9876543210',
    photo: '/assets/default-avatar.png',
  });

  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  const { paperId } = useParams();

  const selectedPaper = papers.find(paper => paper.id === paperId);

  useEffect(() => {
    const paperList = [
      {
        id: 'P201',
        title: 'Quantum Computing in AI',
        author: 'R.K. Sharma',
        keyTags: 'AI, Quantum, Algorithms',
        pdf: 'quantum-ai.pdf',
      },
      {
        id: 'P202',
        title: 'Blockchain for Healthcare',
        author: 'S. Verma',
        keyTags: 'Blockchain, Healthcare, Security',
        pdf: 'block-health.pdf',
      },
      // Add more papers here
    ];
    setPapers(paperList);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setReviewer(prev => ({ ...prev, photo: url }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-4">
      {/* Header */}
      <div className="bg-[#4267B2] text-white p-4 flex items-center gap-4 rounded-t-md">
        <label className="cursor-pointer">
          <img
            src={reviewer.photo}
            alt="Reviewer"
            className="w-14 h-14 rounded-full object-cover border-2 border-white"
          />
          <input type="file" onChange={handlePhotoUpload} className="hidden" />
        </label>
        <div>
          <h1 className="font-bold text-lg">{reviewer.name}</h1>
          <p className="text-sm">{reviewer.email}</p>
          <p className="text-sm">{reviewer.phone}</p>
        </div>
      </div>

      {/* Paper Detail View */}
      {selectedPaper ? (
        <div className="bg-white shadow-md rounded-md p-6 mt-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-2">{selectedPaper.title}</h2>
          <p><strong>Paper ID:</strong> {selectedPaper.id}</p>
          <p><strong>Author:</strong> {selectedPaper.author}</p>
          <p><strong>Tags:</strong> {selectedPaper.keyTags}</p>
          <p><strong>PDF:</strong> {selectedPaper.pdf}</p>
        </div>
      ) : (
        // Grid of Assigned Papers
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition relative"
            >
              <h3 className="font-semibold text-lg mb-1">{paper.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Paper ID: {paper.id}</p>
              <p className="text-sm text-gray-600 mb-1">Author: {paper.author}</p>
              <p className="text-sm text-gray-600 mb-1">Tags: {paper.keyTags}</p>
              <p className="text-sm text-gray-600 mb-2">PDF: {paper.pdf}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/reviewer/dashboard/${paper.id}`)}
                  className="bg-[#4267B2] text-white text-sm px-4 py-1 rounded-full hover:bg-[#365899]"
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewerDashboard;
