import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

interface VideoRecordingCheckProps {
  onComplete: () => void;
  onRecordAgain: () => void;
}

export default function VideoRecordingCheck({
  onComplete,
  // onRecordAgain,
}: VideoRecordingCheckProps) {
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      video: true,
      audio: true,
      blobPropertyBag: { type: 'video/mp4' },
    });

  const handleStopRecording = () => {
    stopRecording();
    setHasRecorded(true);
  };

  const handleSubmitRecording = () => {
    setIsSubmitted(true);

    // Immediately complete the check
    onComplete();
  };

  return (
    <div className="space-y-4">
      {status === 'idle' && !hasRecorded && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Speak loud and clearly for a few words and test your webcam. We will record you for a
            few seconds so you can see and hear yourself as others would during your Casper test.
          </p>

          <p className="text-sm text-gray-600">
            You will then be able to play back your recording to confirm everything is working
            properly.
          </p>

          <button
            onClick={startRecording}
            className="bg-[#364699] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
          >
            Record
          </button>
        </div>
      )}

      {status === 'recording' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Speak loud and clearly for a few words in the window below and test your camera. This
            will help you prepare for the Casper test experience.
          </p>

          {/* Live Preview */}
          <div className="relative">
            <video
              ref={video => {
                if (video && previewStream) {
                  video.srcObject = previewStream;
                }
              }}
              autoPlay
              muted
              className="w-full rounded-lg aspect-video bg-gray-900"
            />

            {/* Recording indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Recording
            </div>

            {/* Timer */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
              0:05
            </div>
          </div>

          <div className="flex items-end justify-end gap-4">
            <button
              onClick={handleStopRecording}
              className="flex items-center gap-2 px-6 py-3 bg-[#364699] text-white rounded-[20px] hover:bg-red-700 transition"
            >
              Record
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Make sure you can see and hear yourself clearly
          </p>
        </div>
      )}

      {(status === 'stopped' || hasRecorded) && mediaBlobUrl && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Review your recording below. You should be able to see and hear yourself clearly.
          </p>

          {/* Playback Area with Play Button Overlay */}
          <div className="relative">
            <video
              src={mediaBlobUrl}
              className="w-full rounded-lg aspect-video bg-gray-900"
              poster="/api/placeholder/400/300"
            />

            {/* Play button overlay - styled like the image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => {
                  const video = document.querySelector('video[src]') as HTMLVideoElement;
                  if (video) {
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }
                }}
                className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition shadow-lg"
              >
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-end justify-end gap-4">
            {/* <button
              onClick={() => {
                setHasRecorded(false);
                onRecordAgain();
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
            >
              Record Again
            </button> */}
            <button
              onClick={handleSubmitRecording}
              className="bg-[#364699] text-white py-3 px-8 rounded-[20px] text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
            >
              Submit Video
            </button>
          </div>
        </div>
      )}

      {isSubmitted && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600">
            <span>✅</span>
            <span className="text-sm">Recording submitted successfully!</span>
          </div>
          <p className="text-sm text-gray-600">
            Great! Your video and audio are working perfectly. The system check will complete
            automatically.
          </p>
        </div>
      )}
    </div>
  );
}
