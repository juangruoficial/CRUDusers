import React from "react";

const Err404PopUp = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">404 Error: API Error</h2>
        <p className="text-gray-600 mb-4">
          The requested API has an error. <br /> Recharge the page to try again
        </p>
      </div>
    </div>
  );
};

export default Err404PopUp;
