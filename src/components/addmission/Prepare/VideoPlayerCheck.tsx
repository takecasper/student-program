'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoPlayerCheckProps {
  onComplete: () => void;
}

const VideoPlayerCheck = ({ onComplete }: VideoPlayerCheckProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedTest, setHasStartedTest] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideoTest = () => {
    setHasStartedTest(true);
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoEnded(true);
  };

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
    if (value === 'yes') {
      onComplete();
    }
  };

  // Create a test video blob (simple colored rectangle with audio tone)
  useEffect(() => {
    if (hasStartedTest && videoRef.current) {
      // Use a sample video URL or create a simple test video
      // For demo purposes, we'll use a data URL for a simple video
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Create a simple animated video
        let frame = 0;
        const fps = 30;
        const duration = 10; // 10 seconds
        const totalFrames = fps * duration;

        const stream = canvas.captureStream(fps);

        // Add audio context for test audio
        const audioContext = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

        oscillator.connect(gainNode);

        // Create MediaStreamDestination to add audio to the stream
        const dest = audioContext.createMediaStreamDestination();
        gainNode.connect(dest);

        // Add audio track to video stream
        const audioTrack = dest.stream.getAudioTracks()[0];
        if (audioTrack) {
          stream.addTrack(audioTrack);
        }

        const animate = () => {
          if (frame < totalFrames) {
            // Clear canvas
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw animated content
            const progress = frame / totalFrames;
            const x = progress * (canvas.width - 100);

            // Moving rectangle
            ctx.fillStyle = '#3B82F6';
            ctx.fillRect(x, canvas.height / 2 - 25, 100, 50);

            // Progress text
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
              `Test Video - ${Math.round(progress * 100)}%`,
              canvas.width / 2,
              canvas.height / 2 + 100,
            );

            frame++;
            requestAnimationFrame(animate);
          } else {
            // Stop audio
            oscillator.stop();
            audioContext.close();
          }
        };

        animate();

        // Set the stream as video source
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Start oscillator
        oscillator.start();
      }
    }
  }, [hasStartedTest]);

  if (!hasStartedTest) {
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
          Under the video, you will be able to indicate whether the video played successfully after
          it ends. Instructions will be provided if you experience any technical issues (e.g. no
          sound or no image).
        </p>

        <button
          onClick={startVideoTest}
          className="bg-[#364699] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
        >
          Proceed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        If you don&apos;t hear audio with this video, please refresh your browser. This clip is only
        10 seconds long.
      </p>

      <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={false}
          muted={false}
        />

        {!isPlaying && !videoEnded && (
          <button
            onClick={playVideo}
            className="absolute w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition z-10"
          >
            <svg className="w-6 h-6 ml-1 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {isPlaying && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            Playing...
          </div>
        )}
      </div>

      {videoEnded && (
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
                  checked={selectedAnswer === 'yes'}
                  onChange={e => handleAnswerChange(e.target.value)}
                />
                <span className="text-sm">Yes, the video played properly.</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="videoCheck"
                  value="no"
                  className="w-4 h-4 text-blue-600"
                  checked={selectedAnswer === 'no'}
                  onChange={e => handleAnswerChange(e.target.value)}
                />
                <span className="text-sm">No, I had trouble playing the video properly.</span>
              </label>
            </div>

            {selectedAnswer === 'no' && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Troubleshooting:</strong>
                </p>
                <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside space-y-1">
                  <li>Refresh your browser and try again</li>
                  <li>Check that your browser supports HTML5 video</li>
                  <li>Ensure your speakers/headphones are connected and volume is up</li>
                  <li>Try using a different browser (Chrome, Firefox, Safari)</li>
                </ul>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                >
                  Refresh Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerCheck;
