'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

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

export default function InterviewApp() {
  const [currentScreen, setCurrentScreen] = useState<
    | 'intro-video'
    | 'intro-text'
    | 'intro-image'
    | 'video-plays'
    | 'welcome'
    | 'interview'
    | 'recording'
  >('intro-video');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  // const [isRecording, setIsRecording] = useState(false);
  const [thinkingTime, setThinkingTime] = useState(5);
  // const [recordingTime, setRecordingTime] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Header and footer state
  const [stepIndex, setStepIndex] = useState(0);
  const [signalStatus, setSignalStatus] = useState<PermissionStatus>('pending');
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>('pending');
  const [micStatus, setMicStatus] = useState<PermissionStatus>('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'signal' | 'camera' | 'mic'>('signal');

  const thinkingTimerRef = useRef<NodeJS.Timeout | null>(null);
  // const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Update step index based on current screen and question
  useEffect(() => {
    if (currentScreen === 'intro-video') {
      setStepIndex(0);
    } else if (currentScreen === 'intro-text') {
      setStepIndex(1);
    } else if (currentScreen === 'intro-image') {
      setStepIndex(2);
    } else if (currentScreen === 'video-plays') {
      setStepIndex(3);
    } else if (currentScreen === 'welcome') {
      setStepIndex(4);
    } else if (currentScreen === 'interview') {
      setStepIndex(5 + currentQuestion);
    } else if (currentScreen === 'recording') {
      setStepIndex(5 + currentQuestion);
    }
  }, [currentScreen, currentQuestion]);

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

  // Temporarily disable recording timer to test if it's causing the flash
  // useEffect(() => {
  //   if (isRecording) {
  //     recordingTimerRef.current = setInterval(() => {
  //       setRecordingTime(prev => prev + 1);
  //     }, 1000);
  //   } else {
  //     if (recordingTimerRef.current) {
  //       clearInterval(recordingTimerRef.current);
  //       recordingTimerRef.current = null;
  //     }
  //   }
  //   return () => {
  //     if (recordingTimerRef.current) {
  //       clearInterval(recordingTimerRef.current);
  //       recordingTimerRef.current = null;
  //     }
  //   };
  // }, [isRecording]);

  // Cleanup effect for media stream
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goToIntroText = () => {
    setCurrentScreen('intro-text');
  };

  const goToIntroImage = () => {
    setCurrentScreen('intro-image');
  };

  const goToInterview = () => {
    setCurrentScreen('interview');
    setIsThinking(false);
    setThinkingTime(5);
  };

  const startAnswer = async () => {
    setIsThinking(false);
    setCurrentScreen('recording');
    // setIsRecording(true);
    // setRecordingTime(0);
    setCameraError(null);

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
      setCameraError('Unable to access camera/microphone. Please check permissions.');

      // Try to continue without camera for testing
      console.log('Continuing without camera access...');
    }
  };

  const stopRecording = () => {
    // setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }

    if (recordingVideoRef.current) {
      recordingVideoRef.current.srcObject = null;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentScreen('interview');
      setIsThinking(false);
      setThinkingTime(5);
    } else {
      setCurrentScreen('welcome');
      setCurrentQuestion(0);
    }
  };

  const testCamera = async () => {
    try {
      console.log('Testing camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      console.log('Camera test successful:', stream);
      stream.getTracks().forEach(track => track.stop());
      alert('Camera is working!');
    } catch (error) {
      console.error('Camera test failed:', error);
      alert('Camera test failed: ' + error);
    }
  };

  // Permission handling functions
  const handleFABClick = (type: 'signal' | 'camera' | 'mic') => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleModalAllow = () => {
    switch (modalType) {
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
    setModalOpen(false);
  };

  const handleModalDeny = () => {
    switch (modalType) {
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
    setModalOpen(false);
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

  const IntroVideo = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white p-8">
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="relative">
          <div className="relative w-full max-w-md mx-auto">
            <img src="/videoposter.png" className="w-full rounded-lg" alt="Video poster" />
            <button
              onClick={() => {}}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all">
                <Play className="w-6 h-6 text-gray-700 ml-1" />
              </div>
            </button>
          </div>
        </div>
        <Button
          onClick={goToIntroText}
          className="bg-[#364699] hover:bg-[#364699] text-white px-8 py-3 rounded-full"
        >
          Start Interview
        </Button>
      </div>
    </div>
  );

  const IntroText = () => (
    <div className="flex flex-col items-center justify-center bg-white p-8">
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-[50px] font-bold text-[#333333]">WELCOME!</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Mauris pretium lacus vitae orci sollicitudin viverra. Quisque blandit tempus urna,
            mollis molestie odio fringilla et.
          </p>
          <div className="space-y-3 text-sm text-gray-500 max-w-md mx-auto text-justify pt-10">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices leo in molestie
              malesuada. Maecenas vitae suscipit lectus. Aliquam tempor metus nec semper interdum.
              Maecenas vitae suscipit lectus. Aliquam tempor metus nec semper interdum.
            </p>
            <p>
              Mauris pretium lacus vitae orci sollicitudin viverra. Quisque blandit tempus urna,
              mollis molestie odio fringilla et.
            </p>
          </div>
        </div>
        <Button
          onClick={goToIntroImage}
          className="bg-[#364699] hover:bg-[#364699] text-white px-8 py-3 rounded-full"
        >
          Next
        </Button>
      </div>
    </div>
  );

  const IntroImage = () => (
    <div className="flex flex-col items-center justify-center bg-white p-8">
      <div className="w-full max-w-2xl text-center space-y-6">
        <img src="/introimage.png" alt="Intro Image" className="w-full max-w-md mx-auto rounded" />
      </div>
      <div className="flex justify-center pt-10">
        <Button
          onClick={goToInterview}
          className="bg-[#364699] hover:bg-[#364699] text-white px-8 py-3 rounded-full"
        >
          Next
        </Button>
      </div>
    </div>
  );

  const InterviewScreen = () => {
    const initialThinkingTime = 5;
    const progressPercentage = ((initialThinkingTime - thinkingTime) / initialThinkingTime) * 100;

    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8">
        <div className="w-full max-w-2xl space-y-6">
          <div className="relative">
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
          </div>
          <div className="p-4 bg-white border-l-2 border-gray-200">
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-indigo-600">Transcript:</span>
              <span className="text-sm text-gray-700">{questions[currentQuestion]}</span>
            </div>
          </div>
          <div className="relative border rounded-[22px] p-4 overflow-hidden">
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

  // Separate component for recording time display to prevent re-renders
  const RecordingTimeDisplay = () => {
    // Temporarily use static time to test if it's causing the flash
    const formattedTime = '00:00'; // Static for testing

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md h-12 bg-gray-100 rounded-lg flex items-center px-4">
            <div className="flex space-x-1 items-center w-full">
              {/* Static bars for now to test */}
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="w-1 bg-indigo-500 rounded-full h-4" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-lg font-mono text-gray-600">{formattedTime}</span>
        </div>
      </div>
    );
  };

  const RecordingScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8">
        <div className="w-full max-w-2xl space-y-6">
          <div className="relative w-full max-w-md mx-auto">
            <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
              {mediaStream ? (
                <>
                  <video
                    ref={recordingVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    style={{
                      transform: 'scaleX(-1)', // Mirror the video
                      backgroundColor: '#000',
                    }}
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white animate-pulse">
                    ● Recording
                  </Badge>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                  <div className="text-white text-center">
                    {cameraError ? (
                      <>
                        <div className="text-lg font-semibold mb-2">Camera Error</div>
                        <div className="text-sm mb-2">{cameraError}</div>
                        <button
                          onClick={() => startAnswer()}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Retry Camera
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <div className="text-lg font-semibold mb-2">Starting Camera...</div>
                        <div className="text-sm">Please wait while we access your camera</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-white border-l border-gray-200">
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-indigo-600">Question:</span>
              <span className="text-sm text-gray-700">{questions[currentQuestion]}</span>
            </div>
          </div>

          <RecordingTimeDisplay />

          <div className="text-center space-y-2">
            <Button
              onClick={stopRecording}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md"
            >
              Stop Recording
            </Button>
            {cameraError && (
              <Button
                onClick={startAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md"
              >
                Retry Camera
              </Button>
            )}
            <Button
              onClick={testCamera}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md"
            >
              Test Camera
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

  // Floating Action Buttons
  const FloatingActionButtons = () => (
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
  );

  // Modal for permission confirmation
  const PermissionModal = () =>
    modalOpen && (
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
    );

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="pt-20 pb-32">
        {currentScreen === 'intro-video' && <IntroVideo />}
        {currentScreen === 'intro-text' && <IntroText />}
        {currentScreen === 'intro-image' && <IntroImage />}
        {currentScreen === 'interview' && <InterviewScreen />}
        {currentScreen === 'recording' && <RecordingScreen />}
      </div>
      <Footer />
      <FloatingActionButtons />
      <PermissionModal />
    </div>
  );
}
