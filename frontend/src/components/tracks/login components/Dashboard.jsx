import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './Profileheader';
import PaperCard from './PaperCard';
import PaperDetailsCard from '../PaperDetailsCard';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/author/my-papers', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProfile(response.data.user);
        setPapers(response.data.papers);
      } catch (error) {
        console.error('Error fetching papers:', error);
        alert('Failed to load papers');
      }
    };

    fetchPapers();
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

          {papers.map((paper) => (
            <PaperCard
              key={paper._id}
              paper={{
                id: paper._id,
                title: paper.title,
                keyTags: paper.keywords.join(', '),
                pdf: paper.pdf,
                status: 'Under Review',   
                date: new Date(paper.submittedAt).toLocaleDateString(),
              }}
              onViewMore={() => navigate(`/paper-details/${paper._id}`)}
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
