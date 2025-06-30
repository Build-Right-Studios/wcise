import React, { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-[#f6f9fc] p-6">
      {profile && <ProfileHeader profile={profile} />}
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Research Papers</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {papers.map((paper) => (
            <EditorsPapercard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSignup;
