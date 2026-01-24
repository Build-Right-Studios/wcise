import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './Profileheader';
import PaperCard from './PaperCard';
import PaperDetailsCard from '../PaperDetailsCard';
import axios from 'axios';

import { BACKEND_URL } from '../../../constant.js';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      try {
        // 1️⃣ Fetch author profile
        const profileRes = await axios.get(`${BACKEND_URL}/author/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(profileRes.data.author);

        // 2️⃣ Fetch author's papers
        const papersRes = await axios.get(`${BACKEND_URL}/author/my-papers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPapers(papersRes.data.papers);

      } catch (error) {
        console.error("Error fetching author data:", error);

        if (error.response?.status === 401) {
          sessionStorage.clear();
          navigate("/login");
        } else {
          alert("Failed to load dashboard");
        }
      }
    };

    fetchAuthorData();
  }, [navigate]);


  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6 relative">
      {profile && <ProfileHeader profile={profile} />}

      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">My Research Papers</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">

          <div
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition flex items-center justify-center cursor-pointer text-[#4267B2] font-semibold"
            onClick={() => navigate('/author/new-paper')}
          >
            + New Paper
          </div>

          {/* {papers.map((paper) => (
            <PaperCard
              key={paper._id}
              paper={{
                id: paper._id,
                title: paper.title,
                keyTags: paper.keywords.join(', '),
                pdf: <span className="block max-w-full overflow-hidden text-ellipsis break-all">
                  {paper.pdf}
                </span>,
                status: 'Under Review',
                date: new Date(paper.submittedAt).toLocaleDateString(),
              }}
              onViewMore={() => navigate(`/paper-details/${paper._id}`)}
            />
          ))} */}
          {papers.map((paper) => (
            <PaperCard
              key={paper.paperCode}   // ✅ better key
              paper={{
                paperCode: paper.paperCode,   // optional but useful
                title: paper.title,
                keyTags: paper.keywords.join(', '),
                pdf: (
                  <span className="block max-w-full overflow-hidden text-ellipsis break-all">
                    {paper.pdf}
                  </span>
                ),
                status: 'Under Review',
                date: new Date(paper.submittedAt).toLocaleDateString(),
              }}
              onViewMore={() => navigate(`/paper-details/${paper.paperCode}`)}
            />
          ))}

        </div>
      </div>

      {selectedPaper && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative p-4">
            <PaperDetailsCard course={selectedPaper} />
            <button
              onClick={() => setSelectedPaper(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
