import React, { useEffect, useState } from 'react';
import ProfileHeader from './Profileheader';
import EditorsPapercard from './EditorsPaperCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditorSignup = () => {
  const [profile, setProfile] = useState(null);
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Static profile (can be dynamic later)
    setProfile({
      name: 'Melissa',
      email: 'melissa@example.com',
      phone: '9222000055',
      photo: '/assets/default-avatar.png',
    });

    // Fetch papers from MongoDB backend
    const fetchPapers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/paper/papers');
        setPapers(response.data);
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    fetchPapers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6">
      {profile && <ProfileHeader profile={profile} />}
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Research Papers</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {papers.length > 0 ? (
            papers.map((paper) => (
              <EditorsPapercard
                key={paper.paperId}
                paper={paper}
                onViewMore={() => navigate(`/editor/${paper.paperId}`)}
              />
            ))
          ) : (
            <p className="text-center col-span-3">Paper not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorSignup;
