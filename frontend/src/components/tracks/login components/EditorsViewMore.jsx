import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditorsViewMore = () => {
  const { id } = useParams(); // id is paperId
  const [paper, setPaper] = useState(null);
  const [matchedReviewers, setMatchedReviewers] = useState([]);

  // Sample reviewer database (can be fetched later)
  const allReviewers = [
    {
      reviewerId: 'R101',
      name: 'Hrithik Roshan',
      role: 'PROFESSOR',
      tags: ['ML', 'Deep Learning', 'Python', 'AI']
    },
    {
      reviewerId: 'R102',
      name: 'Sanjay Dutt',
      role: 'RESEARCHER',
      tags: ['AI', 'Finance', 'Data Science']
    },
    {
      reviewerId: 'R103',
      name: 'Amitabh Bachchan',
      role: 'ASSOCIATE PROFESSOR',
      tags: ['IoT', 'Networks', 'Smart Cities']
    }
  ];

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/paper/${id}`);
        setPaper(res.data);

        // Tag-matching logic
        const paperTags = res.data.tags || [];
        const matches = allReviewers
          .map((rev) => {
            const revTags = rev.tags;
            const intersection = paperTags.filter(tag => revTags.includes(tag));
            return {
              ...rev,
              matchCount: intersection.length,
              paperId: res.data.paperId
            };
          })
          .filter(r => r.matchCount > 0) // keep only those with at least 1 tag match
          .sort((a, b) => b.matchCount - a.matchCount); // sort by relevance

        setMatchedReviewers(matches);
      } catch (error) {
        console.error('Error fetching paper:', error);
      }
    };

    fetchPaper();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-[#1d3b58] mt-6 mb-8">
        Suggested Reviewers
      </h2>

      {matchedReviewers.length === 0 ? (
        <p className="text-center text-gray-500">No matching reviewers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {matchedReviewers.map((rev, idx) => (
            <div
              key={rev.reviewerId}
              className="bg-[#e9ecef] p-6 rounded-2xl shadow-md flex flex-row items-start gap-4"
            >
              <div className="w-16 h-16 bg-white rounded-full" />
              <div className="flex-grow">
                <h2 className="font-bold text-lg">{rev.name}</h2>
                <p className="font-semibold text-sm">{rev.role}</p>

                <p className="mt-2 font-bold text-sm">Key Tags:</p>
                <p className="text-sm">{rev.tags.join(', ')}</p>

                <p className="mt-2 font-bold text-sm">Reviewer ID:</p>
                <p className="text-sm">{rev.reviewerId}</p>

                <p className="mt-2 font-bold text-sm">Paper ID:</p>
                <p className="text-sm">{rev.paperId}</p>

                <p className="mt-2 font-bold text-sm text-green-700">
                  Relevance Score: {rev.matchCount}
                </p>
              </div>

              <div className="pt-40 pl-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all text-sm">
                  Send
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorsViewMore;
