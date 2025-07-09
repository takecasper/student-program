'use client';

import { MessageSquareText, Download } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

function getRandomHeight(min = 6, max = 28) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Permission status type
const PERMISSION_PENDING = 'pending';
const PERMISSION_ALLOWED = 'allowed';
const PERMISSION_DENIED = 'denied';

type PermissionStatus =
  | typeof PERMISSION_PENDING
  | typeof PERMISSION_ALLOWED
  | typeof PERMISSION_DENIED;

export default function SnapshotTestPage() {
  // Simplified state management
  const [currentStep, setCurrentStep] = useState<
    'initial' | 'video' | 'thinking' | 'recording' | 'review'
  >('initial');
  const [thinkingTime, setThinkingTime] = useState(80); // 1:20 in seconds
  const [totalTimeLeft, setTotalTimeLeft] = useState(600); // 10:00 in seconds
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  // Add these new state variables after the existing ones
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(50).fill(12));
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioAnimRef = useRef<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const reviewVideoRef = useRef<HTMLVideoElement>(null);

  // Permission states
  const [signalStatus, setSignalStatus] = useState<PermissionStatus>(PERMISSION_PENDING);
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>(PERMISSION_PENDING);
  const [micStatus, setMicStatus] = useState<PermissionStatus>(PERMISSION_PENDING);

  // Animated waveform state
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(30).fill(12));
  const waveAnimRef = useRef<NodeJS.Timeout | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'signal' | 'camera' | 'mic' | null>(null);

  // Total timer countdown (10:00 to 0:00)
  useEffect(() => {
    if (totalTimeLeft > 0) {
      totalTimerRef.current = setInterval(() => {
        setTotalTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(totalTimerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (totalTimerRef.current) {
        clearInterval(totalTimerRef.current);
        totalTimerRef.current = null;
      }
    };
  }, [totalTimeLeft]);

  // Animate waveform when recording
  useEffect(() => {
    if (currentStep === 'recording') {
      waveAnimRef.current = setInterval(() => {
        setWaveHeights(
          Array(30)
            .fill(0)
            .map(() => getRandomHeight()),
        );
      }, 120);
    } else {
      setWaveHeights(Array(30).fill(12));
      if (waveAnimRef.current) clearInterval(waveAnimRef.current);
    }

    return () => {
      if (waveAnimRef.current) clearInterval(waveAnimRef.current);
    };
  }, [currentStep]);

  // Start thinking time countdown
  useEffect(() => {
    if (currentStep === 'thinking' && thinkingTime > 0) {
      timerRef.current = setInterval(() => {
        setThinkingTime(prev => {
          if (prev <= 0) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentStep, thinkingTime]);

  // Start camera when recording step begins
  useEffect(() => {
    if (currentStep === 'recording') {
      startCamera();
    } else if (currentStep !== 'review') {
      stopCamera();
    }
  }, [currentStep]);

  // Debug when review step is reached
  useEffect(() => {
    if (currentStep === 'review') {
      console.log('Review step reached');
      console.log('Recorded video URL:', recordedVideoUrl);
      console.log('Recorded blob:', recordedBlob);
    }
  }, [currentStep, recordedVideoUrl, recordedBlob]);

  useEffect(() => {
    return () => {
      // Cleanup animation resources on unmount
      if (audioAnimRef.current) {
        cancelAnimationFrame(audioAnimRef.current);
      }
    };
  }, []);

  // Start camera recording
  const startCamera = async () => {
    try {
      setCameraError(null);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'user',
        },
        audio: true,
      });

      setCameraStream(stream);

      // Wait a bit for the component to render
      setTimeout(() => {
        const videoElement = cameraVideoRef.current;
        if (videoElement) {
          // Set the stream
          videoElement.srcObject = stream;
          videoElement.load();

          videoElement.onloadedmetadata = () => {
            videoElement
              .play()
              .then(() => {
                console.log('Camera video is now playing');
              })
              .catch(e => {
                console.error('Failed to play camera video:', e);
                setCameraError('Failed to play camera video');
              });
          };

          videoElement.onerror = () => {
            setCameraError('Video element error');
          };

          // Fallback: try to play immediately
          videoElement.play().catch(() => {
            // Will try again when metadata loads
          });
        } else {
          setCameraError('Camera video element not found');
        }
      }, 100);

      // Start recording
      try {
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = event => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          console.log('Recording saved:', blob);

          // Save the recorded video
          setRecordedBlob(blob);
          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideoUrl(videoUrl);

          // Move to review step
          setCurrentStep('review');
        };

        recorder.onerror = () => {
          setCameraError('Recording error occurred');
        };

        setMediaRecorder(recorder);
        recorder.start();
      } catch (recordError) {
        console.error('MediaRecorder creation failed:', recordError);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError(
        `Unable to access camera: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  };

  // Stop camera recording
  const stopCamera = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }

    if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
        track.stop();
      });
      setCameraStream(null);
    }

    if (cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = null;
    }

    setMediaRecorder(null);
    setCameraError(null);
  };

  // Simple animated waveform for video playback
  const startWaveformAnimation = () => {
    console.log('Starting waveform animation');
    const updateWaveform = () => {
      if (isVideoPlaying) {
        const waveformData = new Uint8Array(50);
        for (let i = 0; i < 50; i++) {
          // Create more realistic waveform pattern
          const baseHeight = 12;
          const variation = Math.sin(Date.now() * 0.01 + i * 0.3) * 8;
          const randomFactor = Math.random() * 4;
          waveformData[i] = Math.max(8, Math.min(28, baseHeight + variation + randomFactor));
        }
        setAudioData(waveformData);
        console.log('Waveform updated:', waveformData.slice(0, 5)); // Debug first 5 values
        audioAnimRef.current = requestAnimationFrame(updateWaveform);
      }
    };
    updateWaveform();
  };

  const stopWaveformAnimation = () => {
    console.log('Stopping waveform animation');
    if (audioAnimRef.current) {
      cancelAnimationFrame(audioAnimRef.current);
      audioAnimRef.current = null;
    }
  };

  // Download recorded video
  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interview-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Format time as mm:ss
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Progress bar width (percentage)
  const progress = Math.max(0, Math.min(100, ((80 - thinkingTime) / 80) * 100));

  // Modal handler
  function handleFABClick(type: 'signal' | 'camera' | 'mic') {
    setModalType(type);
    setModalOpen(true);
  }

  function handleModalAllow() {
    if (modalType === 'signal') setSignalStatus(PERMISSION_ALLOWED);
    if (modalType === 'camera') setCameraStatus(PERMISSION_ALLOWED);
    if (modalType === 'mic') setMicStatus(PERMISSION_ALLOWED);
    setModalOpen(false);
    setModalType(null);
  }

  function handleModalDeny() {
    if (modalType === 'signal') setSignalStatus(PERMISSION_DENIED);
    if (modalType === 'camera') setCameraStatus(PERMISSION_DENIED);
    if (modalType === 'mic') setMicStatus(PERMISSION_DENIED);
    setModalOpen(false);
    setModalType(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3b4cca] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <Image src="/toro.png" alt="UofT Logo" width={120} height={32} className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-2 bg-[#EDEEF6] px-4 py-1 rounded-full">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#3b4cca" strokeWidth="2" />
            <path
              d="M12 6v6l4 2"
              stroke="#3b4cca"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#3b4cca] font-medium">Time Left:</span>
          <span className="text-[#3b4cca] font-semibold">{formatTime(totalTimeLeft)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Video Player or Camera */}
        <div
          id="video-container"
          className="w-[480px] h-[270px] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden"
        >
          {currentStep === 'recording' ? (
            // Camera view when recording
            <div className="w-full h-full relative bg-black">
              <video
                ref={cameraVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                style={{
                  transform: 'scaleX(-1)',
                  backgroundColor: '#000',
                }}
              />

              {cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-800">
                  <div className="text-center p-4">
                    <p className="font-semibold">Camera Error</p>
                    <p className="text-sm mt-1">{cameraError}</p>
                    <button
                      onClick={() => startCamera()}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Retry Camera
                    </button>
                  </div>
                </div>
              )}

              {!cameraStream && !cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Loading camera...</p>
                  </div>
                </div>
              )}

              {/* Recording badge */}
              {cameraStream && (
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow text-xs font-semibold">
                  <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse" />
                  <span className="text-red-500">Recording</span>
                </div>
              )}
            </div>
          ) : currentStep === 'review' ? (
            // Review recorded video
            <div className="w-full h-full relative bg-black">
              {recordedVideoUrl && (
                <video
                  ref={reviewVideoRef}
                  src={recordedVideoUrl}
                  className="w-full h-full object-cover"
                  controls
                  style={{
                    transform: 'scaleX(-1)', // Keep mirrored for consistency
                    backgroundColor: '#000',
                  }}
                  onLoadedMetadata={() => {
                    console.log('Video metadata loaded');
                  }}
                  onPlay={() => {
                    console.log('Video started playing');
                    setIsVideoPlaying(true);
                    startWaveformAnimation();
                  }}
                  onPause={() => {
                    console.log('Video paused');
                    setIsVideoPlaying(false);
                    stopWaveformAnimation();
                  }}
                  onEnded={() => {
                    console.log('Video ended');
                    setIsVideoPlaying(false);
                    stopWaveformAnimation();
                  }}
                />
              )}

              {/* Recording badge for consistency */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow text-xs font-semibold">
                <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
                <span className="text-red-500">Recording</span>
              </div>
            </div>
          ) : currentStep === 'video' ? (
            // Video playing
            <>
              <video
                ref={videoRef}
                src="/video.mp4"
                className="w-full h-full object-cover"
                controls={true}
                autoPlay
                muted
                onEnded={() => {
                  setCurrentStep('thinking');
                }}
                onError={() => {
                  console.log('Video failed to load, showing fallback after 2 seconds');
                  setTimeout(() => {
                    setCurrentStep('thinking');
                  }, 2000);
                }}
              />
            </>
          ) : (
            // Initial state or thinking time - show mock video interface
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polygon points="9,6 21,12 9,18" fill="white" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Interview Question Video</h3>
                <p className="text-sm text-white/80">
                  {currentStep === 'initial'
                    ? 'Click play to start the question'
                    : 'Question completed'}
                </p>
              </div>

              {currentStep === 'initial' && (
                <button
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg z-10"
                  onClick={() => {
                    setCurrentStep('video');
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="#fff" />
                    <polygon points="16,13 28,20 16,27" fill="#3b4cca" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Transcript and UI based on current step */}
        {currentStep !== 'initial' && (
          <>
            <div className="mt-6 w-[480px]">
              <div className="flex gap-2">
                <div className="border h-8 w-1 bg-gray-300"></div>
                <span className="text-xs text-[#364699] font-semibold">Transcript:</span>
                <span className=" text-sm text-gray-700">
                  Tell us about a time you faced a challenge...
                </span>
              </div>
            </div>

            {/* Show UI based on current step */}
            {currentStep === 'thinking' ? (
              <>
                {/* Animated Thinking Time Progress Bar */}
                <div className="mt-4 w-[480px]">
                  <div className="relative w-full h-10 flex items-center">
                    {/* Progress background */}
                    <div className="absolute inset-0 rounded-full border border-[#E0E0E0] bg-white" />
                    {/* Progress fill */}
                    <div
                      className="absolute left-0 top-0 h-full rounded-l-full bg-[#00A59B] transition-all duration-100 linear"
                      style={{ width: `${Math.max(progress, 6)}%` }}
                    />
                    {/* Content */}
                    <div className="relative flex items-center w-full h-full px-4 justify-between">
                      <div
                        className="flex items-center gap-2 z-10"
                        style={{ color: progress > 6 ? 'white' : '#00A59B' }}
                      >
                        <span className="w-6 h-6 flex items-center justify-center">
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke={progress > 6 ? 'white' : '#00A59B'}
                              strokeWidth="2"
                            />
                            <path
                              d="M12 8v4l2 2"
                              stroke={progress > 6 ? 'white' : '#00A59B'}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className={`font-medium ${progress > 6 ? 'text-white' : 'text-[#00A59B]'}`}
                        >
                          Thinking Time
                        </span>
                      </div>
                      <span className="font-medium text-gray-600 z-10">
                        {formatTime(thinkingTime)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Start Answer Button */}
                <button
                  className="mt-6 px-8 py-2 rounded-full bg-[#364699] text-white font-semibold transition hover:bg-[#2a3a7a]"
                  onClick={() => {
                    setCurrentStep('recording');
                  }}
                >
                  Start Answer
                </button>
              </>
            ) : currentStep === 'recording' ? (
              <>
                {/* Waveform Bar */}
                <div className="mt-4 w-[480px] flex items-center gap-2 bg-white border rounded-[14px] px-4 py-2">
                  {/* Animated sound wave */}
                  <div className="flex-1 flex items-end h-8 gap-[2px]">
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="w-[4px] rounded bg-[#C7C7C7] transition-all duration-100"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-600 ml-2">01:20</span>
                </div>
                <div className="flex items-center justify-between w-[480px]">
                  {/* Response Time */}
                  <div className="mt-2 flex items-center gap-2 ">
                    <MessageSquareText className="w-4 h-4" />
                    <span className="text-gray-500 text-sm">Response Time:</span>
                    <span className="text-gray-700 text-sm font-semibold">4:48</span>
                  </div>
                  {/* Stop Recording Button */}
                  <button
                    className="mt-4 px-8 py-2 rounded-full bg-[#B71C1C] text-white font-semibold hover:bg-[#a31515] transition"
                    onClick={() => {
                      stopCamera();
                    }}
                  >
                    Stop Recording
                  </button>
                </div>
              </>
            ) : currentStep === 'review' ? (
              <>
                {/* Animated Waveform Bar */}
                <div className="mt-6 w-[480px] flex items-center gap-2 bg-white border rounded-[14px] px-4 py-2">
                  {/* Debug info */}

                  {/* Animated waveform */}
                  <div className="flex-1 flex items-end h-8 gap-[2px]">
                    {Array.from(audioData).map((height, i) => (
                      <div
                        key={i}
                        className={`w-[3px] rounded transition-all duration-75 ${
                          isVideoPlaying ? 'bg-[#364699]' : 'bg-[#C7C7C7]'
                        }`}
                        style={{
                          height: `${height}px`,
                          opacity: isVideoPlaying ? 0.8 + (height / 28) * 0.2 : 0.6,
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-600 ml-2">
                    {reviewVideoRef.current
                      ? `${Math.floor(reviewVideoRef.current.currentTime / 60)
                          .toString()
                          .padStart(2, '0')}:${Math.floor(reviewVideoRef.current.currentTime % 60)
                          .toString()
                          .padStart(2, '0')}`
                      : '01:20'}
                  </span>
                </div>

                {/* Response Time and Action Buttons - Only show when not playing */}
                {!isVideoPlaying && (
                  <div className="flex items-center justify-between w-[480px] mt-4">
                    {/* Response Time */}
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="w-4 h-4" />
                      <span className="text-gray-500 text-sm">Response Time:</span>
                      <span className="text-gray-700 text-sm font-semibold">4:48</span>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full flex justify-center items-center py-6 bg-white border-t">
        <div className="flex items-center gap-2">
          <StepCircle
            label="INTRO"
            active={currentStep !== 'initial'}
            checked={currentStep !== 'initial'}
          />
          <StepLine />
          <StepCircle label="1" active={currentStep !== 'initial'} />
          <StepLine />
          <StepCircle label="2" />
          <StepLine />
          <StepCircle label="3" />
          <StepLine />
          <StepCircle label="4" />
          <StepLine />
          <StepCircle label="5" />
          <StepLine />
          <StepCircle label="END" />
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-50">
        <FABVerify
          src="/svgs/signal.svg"
          alt="Signal"
          status={signalStatus}
          onClick={() => handleFABClick('signal')}
        />
        <FABVerify
          src="/svgs/camera.svg"
          alt="Camera"
          status={cameraStatus}
          onClick={() => handleFABClick('camera')}
        />
        <FABVerify
          src="/svgs/mic.svg"
          alt="Mic"
          status={micStatus}
          onClick={() => handleFABClick('mic')}
        />
      </div>

      {/* Modal for permission confirmation */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] flex flex-col items-center">
            <div className="mb-4 text-lg font-semibold text-[#364699]">
              {modalType === 'signal' && 'Allow access to signal?'}
              {modalType === 'camera' && 'Allow access to camera?'}
              {modalType === 'mic' && 'Allow access to microphone?'}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 rounded bg-[#00A59B] text-white font-semibold hover:bg-[#00897B]"
                onClick={handleModalAllow}
              >
                Allow
              </button>
              <button
                className="px-4 py-2 rounded bg-[#B71C1C] text-white font-semibold hover:bg-[#a31515]"
                onClick={handleModalDeny}
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepCircle({
  label,
  active,
  checked,
}: {
  label: string;
  active?: boolean;
  checked?: boolean;
}) {
  const isEdge = label === 'INTRO' || label === 'END';
  const isIntroChecked = label === 'INTRO' && checked;
  const showCornerCheck = checked && label === 'INTRO';

  return (
    <div
      className={
        isIntroChecked
          ? 'w-20 h-8 flex items-center justify-center rounded-full border border-[#364699] bg-[#364699] text-white font-semibold text-sm relative'
          : `${isEdge ? 'w-20 h-8' : 'w-8 h-8'} flex items-center justify-center rounded-full border ${active ? 'border-[#364699]  text-[#3b4cca]' : 'border-gray-300 bg-white text-gray-500'} font-semibold text-sm relative`
      }
    >
      {isIntroChecked ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#364699" className="mx-auto">
          <circle cx="10" cy="10" r="10" fill="#364699" />
          <path
            d="M3 6.5L5.2 8.7L9 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <>
          {showCornerCheck && (
            <span className="absolute left-1 top-1 w-4 h-4 bg-[#00A59B] rounded-full flex items-center justify-center border-2 border-white">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6.5L5.2 8.7L9 5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          <span className="z-10">{label}</span>
        </>
      )}
    </div>
  );
}

function StepLine() {
  return <div className="w-4 h-0.5 bg-gray-300" />;
}

function FABVerify({
  src,
  alt,
  status,
  onClick,
}: {
  src: string;
  alt: string;
  status: PermissionStatus;
  onClick?: () => void;
}) {
  return (
    <button
      className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-100 transition relative border border-gray-200"
      onClick={onClick}
      type="button"
    >
      <Image src={src || '/placeholder.svg'} alt={alt} width={16} height={16} />
      {status === 'allowed' ? (
        <span className="absolute top-6 -right-1 w-4 h-4 bg-[#00A59B] rounded-full flex items-center justify-center border-2 border-white">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6.5L5.2 8.7L9 5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : status === 'denied' ? (
        <span className="absolute top-6 -right-1 w-4 h-4 bg-[#B71C1C] rounded-full flex items-center justify-center border-2 border-white">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 2.5V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="5" cy="7" r="0.7" fill="white" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}

// Add this useEffect after the existing ones
