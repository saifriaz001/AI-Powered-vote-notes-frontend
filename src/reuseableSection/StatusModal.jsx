import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const StatusModal = ({ isOpen, onClose, message, isError }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-box ">
        <div className="flex justify-center mb-4">
          {isError ? (
            <FiXCircle className="text-red-500 text-5xl" />
          ) : (
            <FiCheckCircle className="text-green-500 text-5xl" />
          )}
        </div>
        <p className={`text-lg ${isError ? "text-red-500" : "text-gray-800"}`}>
          {message}
        </p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-md text-white font-semibold ${
              isError
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
