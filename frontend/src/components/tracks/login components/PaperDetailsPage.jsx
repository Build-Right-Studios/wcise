import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaperDetailsCard from '../PaperDetailsCard';

const PaperDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [latestComment, setLatestComment] = useState(null);

  useEffect(() => {
    const fetchPaper = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/author/paper/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaper(response.data.paper);
        setLatestComment(response.data.latestComment || null);
        console.log("✅ Latest comment received:", response.data.latestComment);
      } catch (error) {
        console.error('Error fetching paper:', error);
        alert('Failed to load paper details');
      }
    };

    fetchPaper();
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-6">
      {paper ? (
        <PaperDetailsCard paper={paper} latestComment={latestComment} />
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default PaperDetailsPage;
