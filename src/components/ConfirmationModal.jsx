import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, title, message, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div> {/* Background overlay */}
        <div className="relative w-auto max-w-lg mx-auto my-6">
          <div className="relative flex flex-col bg-white border-2 border-gray-300 shadow-lg rounded-lg">
            <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onCancel}
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-600 text-lg leading-relaxed">{message}</p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
              <button
                onClick={onCancel}
                className="px-6 py-2 mr-2 text-sm font-medium text-gray-500 transition duration-300 ease-in-out bg-transparent border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 text-sm font-medium text-white transition duration-300 ease-in-out bg-black rounded-md hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default ConfirmationModal;
