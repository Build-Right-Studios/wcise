import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './Profileheader';
import EditorsPapercard from './EditorsPaperCard';

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

    axios.get('http://localhost:8000/editor/papers')
      .then(response => {
        const fetchedPapers = response.data.map(paper => ({
          id: paper.paperId || paper._id,       // Fallback if paperId is missing
          title: paper.title,
          keyTags: Array.isArray(paper.tags) ? paper.tags.join(', ') : paper.tags,
          pdf: paper.pdfName,
          status: paper.status,
          date: paper.date,
        }));
        setPapers(fetchedPapers);
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
            <EditorsPapercard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSignup;
