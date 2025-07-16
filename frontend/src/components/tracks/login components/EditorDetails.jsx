import React from 'react';
import { useParams } from 'react-router-dom';

const EditorDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Paper ID: {id}</h1>
      {/* Fetch and show more details using the id */}
    </div>
  );
};

export default EditorDetails;