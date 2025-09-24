import React from "react"
import { X, Check } from "lucide-react"

const Modal = ({ isOpen, title, children, onClose, onSave }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="text-gray-500 ">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 modal-title max-h-[60vh] overflow-y-auto">{children}</div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 p-4 border-t">
          {onSave && (
            <button
              onClick={onSave}
              className="Load-More"
            >
               Save
            </button>
          )}
          <button
            onClick={onClose}
            className="Load-More"
          >
             Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
