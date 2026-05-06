import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileHeader from './Profileheader';
import { BACKEND_URL } from '../../../constant';

const getTopReviewer = (paperTags, reviewers) => {
  const paperTagSet = new Set(paperTags.map(tag => tag.trim().toLowerCase()));
  let maxMatchCount = 0;
  let bestReviewers = [];

  for (const reviewer of reviewers) {
    const reviewerTags = (reviewer.tags || []).map(tag => tag.trim().toLowerCase());
    let matchCount = 0;
    for (const tag of reviewerTags) {
      if (paperTagSet.has(tag)) matchCount++;
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
  const navigate = useNavigate();
  const paper = location.state?.paper;

  const [reviewers, setReviewers] = useState([]);
  const [allReviewers, setAllReviewers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [manualMode, setManualMode] = useState(false);

  // ✅ New state for paper status management
  const [paperStatus, setPaperStatus] = useState(paper?.status || 'Under Review');
  const [statusSaving, setStatusSaving] = useState(false);

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          alert('Please login first');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/editor/suggested-reviewers`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fetchedReviewers = Array.isArray(response.data) ? response.data : [];
        setAllReviewers(fetchedReviewers);

        const paperTags = paper?.keyTags?.split(',').map(tag => tag.trim()) || [];
        const matchedReviewers = getTopReviewer(paperTags, fetchedReviewers);
        setReviewers(matchedReviewers);

        const statusResponse = await axios.get(
          `${BACKEND_URL}/editor/paper-status/${paper?.paperCode}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const allStatuses = statusResponse.data;
        const map = {};
        fetchedReviewers.forEach(rev => {
          const match = allStatuses.find(r => String(r.reviewerId) === String(rev._id));
          map[rev._id] = match?.status || 'Waiting';
        });
        setStatusMap(map);

      } catch (error) {
        console.error('Error fetching reviewers:', error);
      }
    };

    fetchReviewers();
  }, [paper]);

  const handleSendMail = async (rev) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) { alert('Please login first'); navigate('/login'); return; }

      const response = await axios.post(
        `${BACKEND_URL}/send-mail/${encodeURIComponent(rev.email)}`,
        {
          name: rev.name,
          paperTitle: paper?.title || 'Paper',
          paperCode: paper?.paperCode || '',
          reviewerId: rev._id
        }
      );

      if (response.data?.success) {
        alert(`Mail successfully sent to ${rev.email}`);
      } else {
        alert(`Mail failed: ${response.data?.message || 'Unknown error'}`);
      }
      setStatusMap(prev => ({ ...prev, [rev._id]: 'Mail Sent' }));

    } catch (error) {
      console.error('Failed to send mail:', error);
      alert(`Failed to send mail to ${rev.email}`);
    }
  };

  // ✅ New: update paper status from editor
  const handleStatusSave = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return alert('Please login first');

    try {
      setStatusSaving(true);
      await axios.put(
        `${BACKEND_URL}/editor/paper-status/${paper.paperCode}`,
        { status: paperStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Paper status updated successfully!');
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update paper status');
    } finally {
      setStatusSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-6">
      <ProfileHeader profile={{ name: 'Editor', email: '', phone: '', photo: '' }} />

      {/* ✅ Paper Info + Status Update Panel */}
      {paper && (
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold text-[#1d3b58] mb-1">{paper.title}</h3>
          <p className="text-sm text-gray-600 mb-4">Paper Code: {paper.paperCode}</p>

          <label className="block font-semibold text-[#1d3b58] mb-2">Update Paper Status:</label>
          <div className="flex gap-3 items-center">
            <select
              value={paperStatus}
              onChange={(e) => setPaperStatus(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option>Under Review</option>
              <option>Minor Revision</option>
              <option>Major Revision</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
            <button
              onClick={handleStatusSave}
              disabled={statusSaving}
              className={`px-5 py-2 rounded text-white font-semibold ${
                statusSaving ? 'bg-gray-400' : 'bg-[#1d3b58] hover:bg-[#163048]'
              }`}
            >
              {statusSaving ? 'Saving...' : 'Save Status'}
            </button>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-[#1d3b58] mt-8 mb-8">
        {manualMode ? 'ALL REVIEWERS (Manual Assignment)' : 'SUGGESTED REVIEWERS'}
      </h2>

      {reviewers.length === 0 && !manualMode && (
        <div className="text-center text-gray-700 mt-10">
          <p className="mb-4 text-lg">No matching reviewers found for this paper.</p>
          <button
            onClick={() => setManualMode(true)}
            className="bg-[#0073e6] text-white px-6 py-2 rounded-lg hover:bg-[#005bb5] transition"
          >
            Assign Reviewer Manually
          </button>
        </div>
      )}

      {/* Reviewer Grid */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
        {(manualMode ? allReviewers : reviewers).map((rev) => (
          <div key={rev._id} className="bg-[#e9ecef] p-6 rounded-2xl shadow-md flex gap-4">
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
              {manualMode && (
                <p className="mt-2 font-bold text-sm text-[#1d3b58]">
                  Tags: <span className="font-normal text-gray-700">{rev.tags?.join(', ')}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 items-end justify-start mt-2">
              <button
                onClick={() => handleSendMail(rev)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              >
                Send Mail
              </button>

              <button
                disabled
                className={`px-4 py-2 rounded text-sm cursor-default text-white ${
                  statusMap[rev._id] === 'Accepted' ? 'bg-green-500' :
                  statusMap[rev._id] === 'Declined' ? 'bg-red-500' :
                  statusMap[rev._id] === 'Mail Sent' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}
              >
                {statusMap[rev._id] || 'Waiting'}
              </button>

              <button
                onClick={() => handleSendMail(rev)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Send Paper
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual mode toggle at bottom */}
      {!manualMode && reviewers.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setManualMode(true)}
            className="bg-[#0073e6] text-white px-6 py-2 rounded-lg hover:bg-[#005bb5] transition"
          >
            Assign Reviewer Manually Instead
          </button>
        </div>
      )}
    </div>
  );
};

export default EditorsViewMore;