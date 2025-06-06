'use client';

interface CongratulationsScreenProps {
  onStartTest: () => void;
}

const CongratulationsScreen = ({ onStartTest }: CongratulationsScreenProps) => {
  return (
    <div className="w-full md:w-96 space-y-6 text-gray-800 shrink-0">
      <div className="flex flex-col items-center space-y-6 pt-20">
        <div className="w-16 h-16 bg-[#00A59B] rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Congratulations!</h2>
          <p className="text-gray-600 text-center max-w-sm">Everything is working perfectly!</p>
        </div>

        <div className="space-y-3 max-w-sm">
          <button
            onClick={onStartTest}
            className="w-full bg-[#364699] text-white py-3 px-6 rounded-[20px] text-sm font-medium hover:bg-[#2538A8] transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsScreen;
