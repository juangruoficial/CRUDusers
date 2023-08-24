import React from "react";

const Err404PopUp = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          404 Error: Page Not Found
        </h2>
        <p className="text-gray-600 mb-4">The requested page was not found.</p>
        <button
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Err404PopUp;
