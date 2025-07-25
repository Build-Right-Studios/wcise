import React from 'react';

function FormModal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-600 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default FormModal;