import React from 'react';
import ProfileHeader from './Profileheader';

const EditorsViewMore = () => {
  const reviewers = [
    {
      reviewerId: 'R101',
      name: 'Hrithik Roshan',
      role: 'PROFESSOR',
      tags: 'ML, Deep Learning, Python, AI',
      paperId: 'P301',
    },
    {
      reviewerId: 'R102',
      name: 'Sanjay Dutt',
      role: 'RESEARCHER',
      tags: 'ML, Deep Learning, Python, AI',
      paperId: 'P302',
    },
    // Add more reviewers as needed
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6">

      <h2 className="text-3xl font-bold text-center text-[#1d3b58] mt-6 mb-8">
        SUGGESTED REVIEWERS
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {reviewers.map((rev, idx) => (
          <div
            key={idx}
            className="bg-[#e9ecef] p-6 rounded-2xl shadow-md flex items-start gap-4"
          >
            <div className="w-16 h-16 bg-white rounded" />
            <div>
              <h2 className="font-bold text-lg">{rev.name}</h2>
              <p className="font-semibold text-sm">{rev.role}</p>

              <p className="mt-2 font-bold text-sm">Key Tags:</p>
              <p className="text-sm">{rev.tags}</p>

              <p className="mt-2 font-bold text-sm">Reviewer ID:</p>
              <p className="text-sm">{rev.reviewerId}</p>

              <p className="mt-2 font-bold text-sm">Paper ID:</p>
              <p className="text-sm">{rev.paperId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorsViewMore;
