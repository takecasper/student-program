import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const GradeCard = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex-1 space-y-6">
      <div>
        <div className="flex justify-between mt-7">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d1d5dc] mb-6" />
            <div>
              <p className="font-semibold">Neuroscience</p>
              <p className="text-xs text-[#6a7282]">Mar 7, 2025 – May 2, 2025</p>
              <button
                className="text-[#364699] text-xs mt-3 cursor-pointer flex items-center"
                onClick={() => setShowDetails(!showDetails)}
              >
                Hide Details
                {showDetails ? (
                  <ChevronUpIcon className="w-6 h-4 text-[#364699] ml-3" />
                ) : (
                  <ChevronDownIcon className="w-6 h-4 text-[#364699] ml-3" />
                )}
              </button>
            </div>
          </div>

          {/* YEAR GRADES */}
          <div className="flex gap-7 items-center">
            {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((label, idx) => (
              <div key={label} className="text-center flex flex-col justify-between h-full">
                <p>{label}</p>
                <div className="flex items-center justify-center gap-1 border border-[#d1d5dc] px-3 py-1 rounded-full">
                  <p className="font-semibold text-xs">88.00</p>
                  {idx % 2 === 1 ? (
                    <ChevronDownIcon className="w-3 h-3 text-[#fb2c36]" />
                  ) : (
                    <ChevronUpIcon className="w-3 h-3 text-[#00A59B]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* COURSE DATA */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-6 gap-x-21 gap-y-8 text-sm ml-14">
          {['Assignments', 'iQuiz', 'Lab', 'Exams'].map(section => (
            <div key={section}>
              <h4 className="font-medium mb-2.5">{section}</h4>
              {section !== 'Exams' &&
                ['1', '2', '3'].map(num => (
                  <div key={num} className="flex justify-between mb-2.5">
                    <p>
                      ↳ {section} {num}
                    </p>
                    <p className="font-semibold">78.00</p>
                  </div>
                ))}
              {section === 'Exams' && (
                <>
                  <div className="flex justify-between mb-2.5">
                    <p>↳ Midterm Exam</p>
                    <p className="font-semibold">78.00</p>
                  </div>
                  <div className="flex justify-between mb-2.5">
                    <p>↳ Final Exam</p>
                    <p className="font-semibold">78.00</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradeCard;
