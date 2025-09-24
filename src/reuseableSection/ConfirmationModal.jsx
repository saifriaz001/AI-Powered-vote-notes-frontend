import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="flex justify-center mb-4">
          <FiAlertTriangle className="text-yellow-500 text-5xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-1 sm:px-6 sm:py-2  rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 font-semibold"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 xs:px-6 xs:py-2  rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
