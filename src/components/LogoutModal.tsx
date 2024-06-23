import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-yellow-300 text-green-900 font-body p-4 rounded shadow-lg max-w-xs md:max-w-md w-full mx-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-800 hover:bg-green-900 text-yellow-300 font-bold py-2 px-4 rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
