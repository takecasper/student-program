import React from 'react';
import { X, Paperclip, FlaskConicalIcon } from 'lucide-react';

interface CourseDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseDetailDrawer: React.FC<CourseDetailDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ maxWidth: 420 }}
    >
      <div className="h-full overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Purple icon with Lab text */}
            <div className="w-16 h-20 bg-[#7779B8] rounded-lg flex flex-col items-center justify-center">
              <FlaskConicalIcon className="w-10 h-10 text-white" />
              <span className="text-white text-xs font-medium">Lab</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">2nd Year</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Women’s Health</h2>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white" />
                  <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white" />
                  <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white" />
                </div>
                <span className="text-sm text-gray-500 ml-2">+12</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors ml-2"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* General Info Section */}
        <div className="px-6 py-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">GENERAL INFO</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 ">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Name:</span>
                <span className="text-sm text-gray-900">Full Class</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Date:</span>
                <span className="text-sm text-gray-900">November 8, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Time:</span>
                <span className="text-sm text-gray-900">3:00pm - 4:00pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Room:</span>
                <span className="text-sm text-gray-900">Medical Building Lecture Hall 2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Facilitator:</span>
                <span className="text-sm text-gray-900">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Student Group:</span>
                <span className="text-sm text-gray-900">--</span>
              </div>
            </div>
          </div>
        </div>

        {/* Handouts Section */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">HANDOUTS</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#364699] cursor-pointer hover:text-blue-700">
                      Forearm Handouts
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      added by: S. Devin | Date: Sep 23 2024
                    </p>
                  </div>
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailDrawer;
