import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProfileHeader from './Profileheader';

// Function to find best matching reviewers based on tags
const getTopReviewer = (paperTags, reviewers) => {
  const paperTagSet = new Set(paperTags.map(tag => tag.trim().toLowerCase()));
  let maxMatchCount = 0;
  let bestReviewers = [];

  for (const reviewer of reviewers) {
    const reviewerTags = (reviewer.tags || []).map(tag => tag.trim().toLowerCase());
    let matchCount = 0;

    for (const tag of reviewerTags) {
      if (paperTagSet.has(tag)) {
        matchCount++;
      }
    }

    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      bestReviewers = [reviewer];
    } else if (matchCount === maxMatchCount && matchCount > 0) {
      bestReviewers.push(reviewer);
    }
  }

  return bestReviewers;
};

const EditorsViewMore = () => {
  const location = useLocation();
  const paper = location.state?.paper;
  const [reviewers, setReviewers] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/editor/suggested-reviewers');
        const allReviewers = response.data;

        const paperTags = paper?.keyTags?.split(',').map(tag => tag.trim()) || [];
        const matchedReviewers = getTopReviewer(paperTags, allReviewers);

        setReviewers(matchedReviewers);

        const initialStatus = {};
        matchedReviewers.forEach(rev => {
          initialStatus[rev._id] = 'Waiting';
        });
        setStatusMap(initialStatus);

      } catch (error) {
        console.error('Error fetching reviewers:', error);
      }
    };

    fetchReviewers();
  }, [paper]);

  const handleSendMail = (rev) => {
    alert(`Mail sent to ${rev.email} (placeholder action)`);
  };

  const handleSendPaper = (rev) => {
    alert(`Paper sent to ${rev.name} (placeholder action)`);
    // Optional: Change status on click:
    setStatusMap(prev => ({ ...prev, [rev._id]: 'Sent' }));
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6">
      <ProfileHeader profile={{ name: 'Editor', email: '', phone: '', photo: '' }} />

      <h2 className="text-3xl font-bold text-center text-[#1d3b58] mt-6 mb-8">
        SUGGESTED REVIEWERS
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {reviewers.length > 0 ? (
          reviewers.map((rev) => (
            <div
              key={rev._id}
              className="bg-[#e9ecef] p-6 rounded-2xl shadow-md flex gap-4"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#1d3b58]">
                {rev.name?.charAt(0).toUpperCase() || 'R'}
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-lg text-[#1d3b58]">{rev.name}</h2>
                <p className="font-semibold text-sm text-gray-700">{rev.role}</p>

                <p className="mt-2 font-bold text-sm text-[#1d3b58]">Email:</p>
                <p className="text-sm break-words text-gray-800">{rev.email}</p>

                <p className="mt-2 font-bold text-sm text-[#1d3b58]">Reviewer ID:</p>
                <p className="text-sm break-words text-gray-800">{rev._id}</p>
              </div>

              <div className="flex flex-col gap-4 items-end justify-start mt-2">
                <button
                  onClick={() => handleSendMail(rev)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                >
                  Send Mail
                </button>

                <button
                  disabled
                  className="bg-yellow-500 text-white px-4 py-2 rounded text-sm cursor-default"
                >
                  {statusMap[rev._id]}
                </button>

                <button
                  onClick={() => handleSendPaper(rev)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  Send Paper
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No matching reviewers found.</p>
        )}
      </div>
    </div>
  );
};

export default EditorsViewMore;
