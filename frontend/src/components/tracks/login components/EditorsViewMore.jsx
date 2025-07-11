import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './Profileheader';  // Optional, you can remove if not needed

const EditorsViewMore = () => {
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/editor/suggested-reviewers');
        setReviewers(response.data);
      } catch (error) {
        console.error('Error fetching reviewers:', error);
      }
    };

    fetchReviewers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6">
      {/* Optional profile header */}
      <ProfileHeader profile={{ name: 'Editor', email: '', phone: '', photo: '' }} />

      <h2 className="text-3xl font-bold text-center text-[#1d3b58] mt-6 mb-8">
        SUGGESTED REVIEWERS
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {reviewers.length > 0 ? (
          reviewers.map((rev, idx) => (
            <div
              key={rev._id || idx}
              className="bg-[#e9ecef] p-6 rounded-2xl shadow-md flex items-start gap-4"
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No reviewers found.</p>
        )}
      </div>
    </div>
  );
};

export default EditorsViewMore;
