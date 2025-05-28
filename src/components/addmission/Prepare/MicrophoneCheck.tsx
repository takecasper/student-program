'use client';

interface MicrophoneCheckProps {
  onComplete: () => void;
}

const MicrophoneCheck = ({ onComplete }: MicrophoneCheckProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Select your microphone. To minimize potential recording issues, we recommend not using
        wireless inputs (like Air pods), if possible.
      </p>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium">1. Select your microphone</span>
          <div className="mt-2">
            <select className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white">
              <option>Default - Macbook Pro Microphone(Built-in)</option>
            </select>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium">2. Say a few words</span>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 20 }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-6 rounded-sm ${index < 15 ? 'bg-teal-500' : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">Input Level</span>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Complete Check
        </button>
      </div>
    </div>
  );
};

export default MicrophoneCheck;
