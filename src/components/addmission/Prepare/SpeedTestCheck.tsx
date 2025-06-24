'use client';

import React, { useState } from 'react';

interface SpeedTestCheckProps {
  onComplete: () => void;
}

const SpeedTestCheck = ({ onComplete }: SpeedTestCheckProps) => {
  const [hasCheckedSpeed, setHasCheckedSpeed] = useState(false);
  const [speedTestPassed, setSpeedTestPassed] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);

  const testSpeed = async () => {
    setIsTestingSpeed(true);
    setHasCheckedSpeed(false);
    setDownloadSpeed(null);
    setUploadSpeed(null);

    // Test download speed
    const startTime = performance.now();
    const iterations = 5;
    let totalBytes = 0;

    try {
      const requests = Array(iterations).fill('/api/speedtest');

      for (const request of requests) {
        const response = await fetch(request);
        const data = await response.blob();
        totalBytes += data.size;
      }

      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const totalMB = totalBytes / (1024 * 1024);
      const speed = totalMB / duration;

      setDownloadSpeed(speed);
      // Simulate upload speed for now
      setUploadSpeed(speed * 0.8 + Math.random() * 20);
      setSpeedTestPassed(speed >= 1.5);
    } catch (error) {
      console.error('Speed test failed:', error);
      setDownloadSpeed(0);
      setUploadSpeed(0);
      setSpeedTestPassed(false);
    } finally {
      setIsTestingSpeed(false);
      setHasCheckedSpeed(true);
    }
  };

  const handleSpeedTestComplete = () => {
    if (speedTestPassed) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4 text-[#333333DE]">
      <h2 className="text-xs">
        We&apos;re testing your download and uplaod speeds. Please wait...
      </h2>

      {isTestingSpeed && (
        <p className="text-sm text-gray-500">
          We&apos;re testing your download and upload speeds. Please wait...
        </p>
      )}

      <div className="flex gap-4">
        <div className="flex-1 border rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500">↓ DOWNLOAD</div>
          <div className="text-2xl font-bold">
            {downloadSpeed !== null ? `${downloadSpeed.toFixed(0)} Mbps` : '-'}
          </div>
        </div>
        <div className="flex-1 border rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500">↑ UPLOAD</div>
          <div className="text-2xl font-bold">
            {uploadSpeed !== null ? `${uploadSpeed.toFixed(0)} Mbps` : '-'}
          </div>
        </div>
      </div>

      {hasCheckedSpeed && (
        <div className="mt-4 space-y-4">
          {speedTestPassed ? (
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-2xl">✓</span>
              <span className="text-sm">Your internet speed looks good!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <span>✗</span>
              <span className="text-sm">Your internet speed does not meet the requirements</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-start mt-6">
        {hasCheckedSpeed && speedTestPassed ? (
          <button
            onClick={handleSpeedTestComplete}
            className="bg-[#364699] text-white px-10 py-3 rounded-full text-sm font-medium"
          >
            Next
          </button>
        ) : (
          <button
            onClick={testSpeed}
            className="bg-[#364699] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#2a3875] transition-colors"
            disabled={isTestingSpeed}
          >
            {hasCheckedSpeed ? 'Try Again' : 'Check Speed'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeedTestCheck;
