import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import ProfileHeader from './Profileheader';
import EditorsPapercard from './EditorsPapercard';

const EditorSignup = () => {
  const [profile, setProfile] = useState(null);
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    setProfile({
      name: 'Melissa',
      email: 'melissa@example.com',
      phone: '9222000055',
      photo: '/assets/default-avatar.png',
    });

    // Axios call to fetch papers from backend
    axios.get('http://localhost:8000/editor/papers')
      .then(response => {
        setPapers(response.data);
      })
      .catch(error => {
        console.error('Error fetching papers:', error);
      });

  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6">
      {profile && <ProfileHeader profile={profile} />}
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Research Papers</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {papers.map((paper) => (
            <EditorsPapercard key={paper._id || paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSignup;
