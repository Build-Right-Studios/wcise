import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewerDashboard = () => {
  const [reviewer, setReviewer] = useState({
    _id: '',
    name: 'Dr. A. Mehta',
    email: 'mehta@example.com',
    phone: '9876543210',
    photo: '/assets/default-avatar.png',
  });

  const [papers, setPapers] = useState([]);
  const [comments, setComments] = useState('');
  const [latestComment, setLatestComment] = useState('');
  const navigate = useNavigate();
  const { paperId } = useParams();

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const fetchPapers = async (reviewerId) => {
    const response = await axios.get(`https://wcise-tr2s.vercel.app/reviewer/assigned-papers/${reviewerId}`);
    setPapers(response.data);

    if (paperId) {
      const selected = response.data.find((paper) => (paper._id?.toString?.() || paper.id) === paperId);
      if (selected?.comments?.length > 0) {
        setLatestComment(selected.comments[selected.comments.length - 1].text);
      }
    }
  };

  useEffect(() => {
    const fetchReviewerDataAndPapers = async () => {
      try {
        const reviewerData = JSON.parse(localStorage.getItem('reviewer')) || {};
        setReviewer(reviewerData);

        const reviewerId = reviewerData.id || reviewerData._id;
        if (!reviewerId) return;

        await fetchPapers(reviewerId);
      } catch (error) {
        console.error('Error fetching assigned papers:', error);
      }
    };

    fetchReviewerDataAndPapers();
  }, [paperId]);

  const selectedPaper = papers.find(
    (paper) => (paper._id?.toString?.() || paper.id) === paperId
  );

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setReviewer((prev) => ({ ...prev, photo: url }));
    }
  };

  const handleDownloadPdf = () => {
    if (selectedPaper?.pdf) {
      const link = document.createElement('a');
      link.href = selectedPaper.pdf;
      link.download = selectedPaper.pdf.split('/').pop();
      link.click();
    } else {
      alert('No PDF available to download');
    }
  };

  const handleSendComments = async () => {
    if (!comments.trim()) return alert('Please write a comment.');

    const targetPaperId = selectedPaper._id || selectedPaper.id;
    if (!isValidObjectId(targetPaperId)) {
      alert('Invalid paper ID format');
      return;
    }

    try {
      await axios.post(`https://wcise-tr2s.vercel.app/reviewer/add-comment/${targetPaperId}`, {
        reviewerId: reviewer._id,
        text: comments,
      });
      alert('Comment saved!');
      setLatestComment(comments);
      setComments('');
    } catch (err) {
      console.error('Failed to send comment:', err);
      alert('Error saving comment');
    }
  };

  const handleResponse = async (status) => {
    const targetPaperId = selectedPaper._id || selectedPaper.id;
    if (!isValidObjectId(targetPaperId)) {
      alert('Invalid paper ID format');
      return;
    }

    try {
      await axios.post('https://wcise-tr2s.vercel.app/reviewer/respond', {
        paperId: targetPaperId,
        email: reviewer.email,
        status,
      });

      alert(`Paper ${status}!`);
      await fetchPapers(reviewer._id);
    } catch (err) {
      console.error(`Failed to update status to ${status}:`, err);
      alert('Error updating status');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-4">
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
          <p><strong>Paper ID:</strong> {selectedPaper._id || selectedPaper.id}</p>
          <p><strong>Keywords:</strong> {selectedPaper.keywords?.join(', ') || 'N/A'}</p>
          <p><strong>PDF:</strong>
            <span className="block max-w-full overflow-hidden text-ellipsis break-all">{selectedPaper.pdf}</span>
          </p>
          <p><strong>Abstract:</strong> {selectedPaper.abstract}</p>

          {selectedPaper.reviewResponses?.[reviewer.email] && (
            <p className="mt-2 font-semibold text-green-600">
               Status: {selectedPaper.reviewResponses[reviewer.email]}
            </p>
          )}

          <div
            onClick={handleDownloadPdf}
            className="border border-dashed border-black rounded-md text-center mt-4 py-3 text-gray-700 cursor-pointer hover:bg-gray-200 transition"
          >
            Click here to load PDF
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1">Comments:</label>
            <textarea
              rows="5"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full border rounded-md p-3"
              placeholder="Write your comments here..."
            ></textarea>
          </div>

          {latestComment && (
            <div className="mt-2 text-sm text-gray-700 italic">
              <strong>Latest comment:</strong> {latestComment}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4">
            <button
              onClick={() => handleResponse('Accepted')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
            >
              Accept
            </button>

            
  <button
    onClick={handleSendComments}
    className="bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-blue-700 transition w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto block"
  >
    Send Comments
  </button>



            <button
              onClick={() => handleResponse('Declined')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
            >
              Decline
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {papers.map((paper) => (
            <div
              key={paper._id || paper.id}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition relative"
            >
              <h3 className="font-semibold text-lg mb-1">{paper.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Paper ID: {paper._id || paper.id}</p>
              <p className="text-sm text-gray-600 mb-1">Keywords: {paper.keywords?.join(', ') || 'N/A'}</p>
              <p className="text-sm text-gray-600 mb-1">
                Status: {paper.reviewResponses?.[reviewer.email] || 'Pending'}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                PDF: <span className="block max-w-full overflow-hidden text-ellipsis break-all">{paper.pdf}</span>
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/reviewer/dashboard/${paper._id || paper.id}`)}
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
