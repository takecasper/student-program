'use client';

import { useState } from 'react';

interface VideoPlayerCheckProps {
  onComplete: () => void;
}

const VideoPlayerCheck = ({ onComplete }: VideoPlayerCheckProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startVideoTest = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          If you don&apos;t hear audio with this video, please refresh your browser. This clip is
          only 10 seconds long.
        </p>

        <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative">
          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Please answer the question below before proceeding:
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium">Did the video and audio play properly?</p>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="videoCheck"
                  value="yes"
                  className="w-4 h-4 text-blue-600"
                  onChange={onComplete}
                />
                <span className="text-sm">Yes, the video played properly.</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="videoCheck"
                  value="no"
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">No, I had trouble playing the video properly.</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        On the next page, we will play a short 10-second video to test your browser&apos;s ability
        to display the Casper test video scenarios without difficulties.
      </p>

      <p className="text-sm text-gray-600">
        If you do not experience any technical issues with the audio or video, your browser should
        be able to display the Casper test video scenarios without difficulties.
      </p>

      <p className="text-sm text-gray-600">
        Under the video, you will be able to indicate whether the video played successfully after it
        ends. Instructions will be provided if you experience any technical issues (e.g. no sound or
        no image).
      </p>

      <button
        onClick={startVideoTest}
        className="bg-[#364699] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
      >
        Proceed
      </button>
    </div>
  );
};

export default VideoPlayerCheck;
