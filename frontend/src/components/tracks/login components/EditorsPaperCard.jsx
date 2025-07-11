import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditorsPaperCard = () => {
  const { id } = useParams(); // paperId from URL
  const navigate = useNavigate();

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/editor/paper/${id}`);
        console.log(response.data);
        // setPaper(response.data);
      } catch (error) {
        console.error('Error fetching paper:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaperDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Loading paper details...
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        Paper not found.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border max-w-3xl mx-auto mt-10">
      <h3 className="text-2xl font-semibold mb-3 text-center">{paper.title}</h3>

      <div className="space-y-2">
        <p><strong>Paper ID:</strong> {paper.paperId}</p>
        <p><strong>Tags:</strong> {Array.isArray(paper.tags) ? paper.tags.join(', ') : 'None'}</p>
        <p><strong>PDF:</strong> {paper.pdfName}</p>
        <p><strong>Status:</strong> {paper.status}</p>
        <p><strong>Date:</strong> {paper.date}</p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#4267B2] text-white px-4 py-2 rounded hover:bg-[#365899] transition"
        >
          🔙 Back
        </button>

        <button
          onClick={() => window.open(`/pdfs/${paper.pdfName}`, '_blank')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          📄 View PDF
        </button>
      </div>
    </div>
  );
};

export default EditorsPaperCard;

