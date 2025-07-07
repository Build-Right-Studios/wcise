import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

  const selectedPaper = papers.find(paper => paper.paperId === paperId);

  useEffect(() => {
    axios.get('http://localhost:8000/reviewer/reviews')
      .then(response => setPapers(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
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

      {selectedPaper ? (
        <div className="bg-white shadow-md rounded-md p-6 mt-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-2">{selectedPaper.title}</h2>
          <p><strong>Paper ID:</strong> {selectedPaper.paperId}</p>
          <p><strong>Tags:</strong> {selectedPaper.tags.join(', ')}</p>
          <p><strong>PDF:</strong> {selectedPaper.pdfName}</p>
          <p><strong>Comments:</strong> {selectedPaper.comments}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {papers.map((paper) => (
            <div
              key={paper._id}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition relative"
            >
              <h3 className="font-semibold text-lg mb-1">{paper.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Paper ID: {paper.paperId}</p>
              <p className="text-sm text-gray-600 mb-1">Tags: {paper.tags.join(', ')}</p>
              <p className="text-sm text-gray-600 mb-2">PDF: {paper.pdfName}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/reviewer/dashboard/${paper.paperId}`)}
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
