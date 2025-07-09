'use client';
import Image from 'next/image';

import { ArrowLeft } from 'lucide-react';
import VideoInterviewRight from './VideoInterviewRight';

interface VideoInterviewProps {
  onBack?: () => void;
}

export default function VideoInterview({ onBack }: VideoInterviewProps) {
  return (
    <div className="bg-white  text-gray-800 flex flex-col md:flex-row gap-10">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
      )}

      {/* Left Section */}
      <div className="md:w-2/3 mx-auto mt-8 bg-white flex justify-center ">
        <div className="w-full mx-auto mt-8 bg-white flex justify-center border-r h-[calc(100vh-230px)] overflow-auto">
          <div className="w-full max-w-[477px] space-y-6">
            {/* Header */}
            <div className="flex space-x-3">
              <div className="w-[60px] h-[60px] rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                <Image src="/svgs/stars.svg" alt="clinical" width={24} height={24} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm text-gray-500 font-medium">Recommended</span>
                <h1 className="text-2xl font-semibold">Video Interview</h1>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-full">
              <Image
                src="/videointerview.png"
                alt="Casper Thumbnail"
                width={477}
                height={193}
                className="rounded-2xl object-cover w-[477px] h-[193px]"
              />
            </div>

            {/* Practice Test Box */}
            <div className="border rounded-[20px] py-[22px] px-[39px] bg-white flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[5px]">
                <h1 className="text-[12px] font-semibold text-[#333333DE]">
                  Video Interview Practice Test
                </h1>
                <p className="text-[12px] text-gray-600">
                  Try out our currently available Video Interview test formats. Applicants who
                  complete the practice test generally perform better.
                </p>
              </div>

              <button
                onClick={() => {
                  window.location.href = `/snapshot-test`;
                }}
                className="border border-[#364699] text-[12px] text-[#364699] py-3 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer w-fit"
              >
                Start Test
              </button>
            </div>

            <div className="border rounded-[20px] py-[22px] px-[39px] bg-white flex flex-col gap-[16px]">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-[5px]">
                  <h1 className="text-[12px] font-semibold text-[#333333DE]">Formative</h1>
                  <p className="text-[12px] text-gray-600">April 3, 2025 - May 3, 2025</p>
                </div>
                <div className="bg-[#EEF8EB] rounded-full px-4 py-1">
                  <p className="text-[#24590A] text-[12px] font-medium"> Not Started</p>
                </div>
              </div>
              <p className="text-[12px] text-gray-600">
                Before you begin your Formative test, please take a moment to go through the
                checklist below. This will help ensure you are fully prepared for the assessment.
              </p>
              <button
                onClick={() => {
                  window.location.href = `/snapshot-test`;
                }}
                className="border border-[#364699] text-[#364699] py-3 px-8 rounded-full text-[12px] font-medium hover:bg-[#2538A8] transition cursor-pointer w-fit"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Preparation Steps */}
      <div className="w-full md:w-[550px] py-6 bg-white space-y-6 text-gray-800 shrink-0">
        <div className="overflow-auto h-[calc(100vh-270px)]">
          <VideoInterviewRight />
        </div>
      </div>
    </div>
  );
}
