'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface WebcamCheckProps {
  onComplete: () => void;
}

const WebcamCheck = ({ onComplete }: WebcamCheckProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        // Call onComplete when photo is taken
        onComplete();
      }
    }
  };

  const retake = () => {
    setCapturedImage(null);
  };

  return isReady ? (
    start ? (
      <div className="flex flex-col items-start gap-4 px-6 py-4">
        <h2 className="text-sm font-bold text-[#333]">Take a Picture</h2>
        <p className="text-sm text-[#666]">
          If you are wearing glasses, please remove them before taking your photo.
        </p>

        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-[400px] h-[280px] rounded-lg bg-black"
            videoConstraints={{ facingMode: 'user' }}
          />
        ) : (
          <img
            src={capturedImage}
            className="w-[400px] h-[280px] rounded-lg object-cover"
            alt="Captured"
          />
        )}

        <div className="flex w-full gap-2 justify-end">
          {capturedImage && (
            <button
              onClick={retake}
              className="mt-2 text-[#364699] bg-white text-sm font-semibold px-7 py-5 rounded-3xl cursor-pointer"
            >
              Retake Photo
            </button>
          )}
          <button
            onClick={capture}
            className="mt-2 bg-[#364699] text-white text-sm font-semibold px-7 py-5 rounded-3xl shadow-md cursor-pointer"
          >
            Take Photo
          </button>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-start gap-4 px-6 py-4">
        {/* Title + Instruction */}
        <div>
          <h2 className="text-sm font-bold text-[#333]">Take a Picture</h2>
          <p className="text-sm text-[#666] mt-1">
            If you are wearing glasses, please remove them before taking your photo.
          </p>
        </div>

        {/* Webcam Placeholder */}
        <div className="w-[400px] h-[280px] bg-[#333] rounded-lg" />

        {/* Take Photo Button */}
        <button
          onClick={() => setStart(true)}
          className="self-end mt-2 bg-[#364699] text-white text-sm font-semibold px-7 py-5 rounded-3xl shadow-md cursor-pointer"
        >
          Take Photo
        </button>
      </div>
    )
  ) : (
    <div className="flex items-start gap-14 flex-col">
      <div className="flex flex-col gap-6 text-xs text-[#333333DE]">
        <p className="mt-1 max-w-lg">
          We will need to take a picture of you right before your actual Casper test begins. This is
          done to validate your identity and enhance test security.
        </p>
        <p>
          <span className="font-bold">Note:</span> No photos taken during this System Requirements
          Check will be used or stored.
        </p>
        <p>
          <span className="font-bold">Note:</span> The next page may prompt you for webcam access.
          Click &apos;ALLOW&apos; to proceed.
        </p>
      </div>
      <div className="flex justify-end gap-6 w-full">
        <button className="text-[#364699] text-sm font-medium underline cursor-pointer">
          Need more info?
        </button>
        <button
          onClick={() => setIsReady(true)}
          className="bg-[#364699] text-white text-sm font-semibold px-10 py-5 rounded-3xl shadow-md cursor-pointer"
        >
          Ready
        </button>
      </div>
    </div>
  );
};

export default WebcamCheck;
