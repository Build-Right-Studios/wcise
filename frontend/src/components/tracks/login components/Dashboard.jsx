import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';   // ✅ Import navigate
import ProfileHeader from './Profileheader';
import PaperCard from './PaperCard';
import PaperDetailsCard from '../PaperDetailsCard';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const navigate = useNavigate();  // ✅ Hook for navigation

  useEffect(() => {
    setProfile({
     
    });

    setPapers([
      {
        id: 'P101',
        title: 'New Era of Deep Learning',
        keyTags: 'ML, AI, Deep Learning, Python',
        pdf: 'deep-learning.pdf',
        status: 'Under Review',
        date: 'June 2, 2025',
      },
      {
        id: 'P102',
        title: 'AI in Finance',
        keyTags: 'AI, Finance, Data Science',
        pdf: 'ai-finance.pdf',
        status: 'Accepted',
        date: 'May 28, 2025',
      },
      {
        id: 'P103',
        title: 'IoT in Smart Cities',
        keyTags: 'IoT, Smart Cities, Networks',
        pdf: 'iot-smartcities.pdf',
        status: 'Pending',
        date: 'June 10, 2025',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6 relative">
      {profile && <ProfileHeader profile={profile} />}
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">My Research Papers</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">

          {/* New Paper Button */}
          <div
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition flex items-center justify-center cursor-pointer text-[#4267B2] font-semibold"
            onClick={() => navigate('/author/new-paper')}  // ✅ Open Authorcomponent in a new page
          >
            + New Paper
          </div>

          {/* Paper Cards */}
          {papers.map((paper) => (
            <PaperCard
  key={paper.id}
  paper={paper}
  onViewMore={() => navigate(`/paper-details/${paper.id}`)}   //  Navigates to details page
/>
          ))}
        </div>
      </div>

      {/* Paper Details Popup */}
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
