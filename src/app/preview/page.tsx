'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const questions = [
  'Tell us about a time you faced a challenge...',
  'Describe your greatest professional achievement.',
  'How do you handle working under pressure?',
  'What motivates you in your work?',
  'Where do you see yourself in 5 years?',
];

type PermissionStatus = 'pending' | 'allowed' | 'denied';

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

export default function PreviewPage() {
  const [currentQuestion] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingTime, setThinkingTime] = useState(5);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Header and footer state
  const [stepIndex] = useState(5);
  const [signalStatus, setSignalStatus] = useState<PermissionStatus>('pending');
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>('pending');
  const [micStatus, setMicStatus] = useState<PermissionStatus>('pending');

  const thinkingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState<string | null>(null);

  // Permission handling functions
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePermission, setActivePermission] = useState<'signal' | 'camera' | 'mic' | null>(
    null,
  );

  useEffect(() => {
    if (isThinking && thinkingTime > 0) {
      thinkingTimerRef.current = setInterval(() => {
        setThinkingTime(prev => {
          if (prev <= 1) {
            clearInterval(thinkingTimerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (thinkingTimerRef.current) {
        clearInterval(thinkingTimerRef.current);
        thinkingTimerRef.current = null;
      }
    }
    return () => {
      if (thinkingTimerRef.current) {
        clearInterval(thinkingTimerRef.current);
        thinkingTimerRef.current = null;
      }
    };
  }, [isThinking]);

  // Cleanup effect for media stream
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  // Fetch microphones when mic dropdown is opened
  useEffect(() => {
    if (dropdownOpen && activePermission === 'mic') {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const mics = devices.filter((d: MediaDeviceInfo) => d.kind === 'audioinput');
        setMicrophones(mics);
        // Set default selected mic if not set
        if (!selectedMicId && mics.length > 0) {
          setSelectedMicId(mics[0].deviceId);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOpen, activePermission]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startAnswer = async () => {
    setIsThinking(false);

    try {
      console.log('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'user',
        },
        audio: true,
      });

      console.log('Camera access granted:', stream);
      setMediaStream(stream);
      setCameraStatus('allowed');

      // Wait a bit for the component to render
      setTimeout(() => {
        const videoElement = recordingVideoRef.current;
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
              });
          };

          videoElement.onerror = () => {
            console.error('Video element error');
          };

          // Fallback: try to play immediately
          videoElement.play().catch(() => {
            // Will try again when metadata loads
          });
        }
      }, 100);

      // Start recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        console.log('Recording completed, blob size:', blob.size);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      setCameraStatus('denied');

      // Try to continue without camera for testing
      console.log('Continuing without camera access...');
    }
  };

  // Permission handling functions
  const handlePermissionClick = (type: 'signal' | 'camera' | 'mic') => {
    if (dropdownOpen && activePermission === type) {
      setDropdownOpen(false);
      setActivePermission(null);
    } else {
      setActivePermission(type);
      setDropdownOpen(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.permission-dropdown')) {
        setDropdownOpen(false);
        setActivePermission(null);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handlePermissionAllow = (type: 'signal' | 'camera' | 'mic') => {
    switch (type) {
      case 'signal':
        setSignalStatus('allowed');
        break;
      case 'camera':
        setCameraStatus('allowed');
        break;
      case 'mic':
        setMicStatus('allowed');
        break;
    }
    setDropdownOpen(false);
    setActivePermission(null);
  };

  const handlePermissionDeny = (type: 'signal' | 'camera' | 'mic') => {
    switch (type) {
      case 'signal':
        setSignalStatus('denied');
        break;
      case 'camera':
        setCameraStatus('denied');
        break;
      case 'mic':
        setMicStatus('denied');
        break;
    }
    setDropdownOpen(false);
    setActivePermission(null);
  };

  // Header Component
  const Header = () => (
    <div className="fixed top-0 left-0 right-0 z-40 w-full flex justify-between items-center px-6 py-4 bg-white border-b">
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
        <span className="text-[#3b4cca] font-semibold">59:59</span>
      </div>
    </div>
  );

  const InterviewScreen = () => {
    const initialThinkingTime = 5;
    const progressPercentage = ((initialThinkingTime - thinkingTime) / initialThinkingTime) * 100;

    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8 relative">
        {/* Left Navigation */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
          <button className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronLeft className="w-12 h-12 text-[#364699]" />
            <span className="text-sm font-medium">Previous Question</span>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
          <button className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-700 transition-colors">
            <ChevronRight className="w-12 h-12 text-[#364699]" />
            <span className="text-sm font-medium">Next Question</span>
          </button>
        </div>

        <div className="w-full max-w-2xl space-y-6">
          <div className="relative w-full max-w-md mx-auto">
            <video
              ref={videoRef}
              width="640"
              height="360"
              controls
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }
                setIsThinking(true);
                setThinkingTime(5);
              }}
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full max-w-md mx-auto p-4 bg-white border-l-2 border-gray-200">
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-indigo-600">Transcript:</span>
              <span className="text-sm text-gray-700">{questions[currentQuestion]}</span>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto relative border rounded-[22px] p-4 overflow-hidden">
            <div
              className="absolute inset-0 bg-[#00A59B] transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="">
                  <Image src="/svgs/cloud.svg" alt="Thinking" width={16} height={16} />
                </div>
                <span className="text-sm text-gray-600">Thinking Time</span>
              </div>
              <span className="text-sm font-mono text-gray-600">{formatTime(thinkingTime)}</span>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={startAnswer}
              className="bg-[#364699] hover:bg-[#364699] text-white px-8 py-3 rounded-full"
              disabled={thinkingTime > 0}
            >
              Start Answer
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Footer Component
  const Footer = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 w-full flex justify-center items-center py-6 bg-white border-t">
      <div className="flex items-center gap-2">
        <StepCircle label="INTRO" active={stepIndex > 0} checked={stepIndex > 0} />
        <StepLine />
        <StepCircle label="1" active={stepIndex > 1} checked={stepIndex > 1} />
        <StepLine />
        <StepCircle label="2" active={stepIndex > 2} checked={stepIndex > 2} />
        <StepLine />
        <StepCircle label="3" active={stepIndex > 3} checked={stepIndex > 3} />
        <StepLine />
        <StepCircle label="4" active={stepIndex > 4} checked={stepIndex > 4} />
        <StepLine />
        <StepCircle label="5" active={stepIndex > 5} checked={stepIndex > 5} />
        <StepLine />
        <StepCircle label="END" active={false} checked={false} />
      </div>
    </div>
  );

  const Preview = () => (
    <div className="bg-[#FCEDCA] rounded-full p-2 w-full flex items-center justify-center">
      <p className="flex items-center gap-2 text-sm font-medium text-[#364699]">
        Test Preview <Eye className="w-4 h-4" />
      </p>
    </div>
  );

  // Floating Action Buttons with Dropdown
  const FloatingActionButtons = () => (
    <div className="fixed bottom-6 right-6 flex gap-3 z-50">
      <div className="relative">
        <FABVerify
          src="/svgs/signal.svg"
          alt="Signal"
          status={signalStatus}
          onClick={() => handlePermissionClick('signal')}
        />
        {dropdownOpen && activePermission === 'signal' && (
          <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg border p-2 min-w-[200px] permission-dropdown">
            <div className="text-sm font-medium text-gray-700 mb-2">Allow access to signal?</div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded bg-[#00A59B] text-white text-sm font-medium hover:bg-[#00897B]"
                onClick={() => handlePermissionAllow('signal')}
              >
                Allow
              </button>
              <button
                className="px-3 py-1 rounded bg-[#B71C1C] text-white text-sm font-medium hover:bg-[#a31515]"
                onClick={() => handlePermissionDeny('signal')}
              >
                Deny
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <FABVerify
          src="/svgs/camera.svg"
          alt="Camera"
          status={cameraStatus}
          onClick={() => handlePermissionClick('camera')}
        />
        {dropdownOpen && activePermission === 'camera' && (
          <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg border p-2 min-w-[200px] permission-dropdown">
            <div className="text-sm font-medium text-gray-700 mb-2">Allow access to camera?</div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded bg-[#00A59B] text-white text-sm font-medium hover:bg-[#00897B]"
                onClick={() => handlePermissionAllow('camera')}
              >
                Allow
              </button>
              <button
                className="px-3 py-1 rounded bg-[#B71C1C] text-white text-sm font-medium hover:bg-[#a31515]"
                onClick={() => handlePermissionDeny('camera')}
              >
                Deny
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <FABVerify
          src="/svgs/mic.svg"
          alt="Mic"
          status={micStatus}
          onClick={() => handlePermissionClick('mic')}
        />
        {dropdownOpen && activePermission === 'mic' && (
          <div className="absolute bottom-12 right-0 bg-white rounded-xl shadow-lg border p-0 min-w-[260px] permission-dropdown">
            {microphones.length === 0 ? (
              <div className="p-4 text-gray-500 text-sm">No microphones found</div>
            ) : (
              <div>
                {microphones.map((mic, idx) => (
                  <button
                    key={mic.deviceId}
                    className={`w-full flex items-center justify-between px-5 py-4 text-left text-base font-normal hover:bg-gray-50 focus:bg-gray-100 transition border-b last:border-b-0 ${selectedMicId === mic.deviceId ? 'bg-gray-50' : ''}`}
                    style={{
                      borderTopLeftRadius: idx === 0 ? '0.75rem' : undefined,
                      borderTopRightRadius: idx === 0 ? '0.75rem' : undefined,
                      borderBottomLeftRadius:
                        idx === microphones.length - 1 ? '0.75rem' : undefined,
                      borderBottomRightRadius:
                        idx === microphones.length - 1 ? '0.75rem' : undefined,
                    }}
                    onClick={() => setSelectedMicId(mic.deviceId)}
                  >
                    <span>{mic.label || `Microphone ${idx + 1}`}</span>
                    {selectedMicId === mic.deviceId && (
                      <span className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-teal-500">
                        <Check className="text-white w-5 h-5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="pt-20 pb-32">
        <InterviewScreen />
      </div>

      <Footer />
      <div className="fixed bottom-6 left-6 z-50">
        <Preview />
      </div>
      <FloatingActionButtons />
    </div>
  );
}
