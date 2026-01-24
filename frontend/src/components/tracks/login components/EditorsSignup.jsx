import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './Profileheader';
import EditorsPapercard from './EditorsPaperCard';
import { useNavigate } from 'react-router-dom';


import { BACKEND_URL } from '../../../constant';

const EditorSignup = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [papers, setPapers] = useState([]);

  useEffect(() => {
  const fetchEditorDashboard = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      // 1️⃣ Fetch editor profile
      const profileRes = await axios.get(
        `${BACKEND_URL}/editor/me`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProfile(profileRes.data.editor);

      // 2️⃣ Fetch assigned papers for editor
      const papersRes = await axios.get(
        `${BACKEND_URL}/editor/papers`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const fetchedPapers = papersRes.data.map(paper => ({
        paperCode: paper.paperCode,
        title: paper.title,
        keyTags: Array.isArray(paper.keywords)
          ? paper.keywords.join(", ")
          : paper.keywords,
        pdf: paper.pdf,
        status: paper.status || "Pending Editor",
        date: new Date(paper.submittedAt).toLocaleDateString(),
      }));

      setPapers(fetchedPapers);

    } catch (error) {
      console.error("Editor dashboard error:", error);

      if (error.response?.status === 401) {
        sessionStorage.clear();
        navigate("/login");
      } else {
        alert("Failed to load editor dashboard");
      }
    }
  };

  fetchEditorDashboard();
}, [navigate]);


  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6">
      {profile && <ProfileHeader profile={profile} />}
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Research Papers</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {papers.map((paper) => (
            <EditorsPapercard key={paper.paperCode} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSignup;