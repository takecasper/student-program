'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { Header } from './components/header';
import { ThinkingTimer } from './components/ThinkingTimer';
import WaveSurferPlayer from '@wavesurfer/react';

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
    | 'playback'
  >('intro-video');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  // const [isRecording, setIsRecording] = useState(false);
  // const [recordingTime, setRecordingTime] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  // Removed countdownTime state to prevent re-renders

  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);

  // Header and footer state
  const [stepIndex, setStepIndex] = useState(0);
  const [signalStatus, setSignalStatus] = useState<PermissionStatus>('pending');
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>('pending');
  const [micStatus, setMicStatus] = useState<PermissionStatus>('pending');

  // const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
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
    } else if (currentScreen === 'playback') {
      setStepIndex(5 + currentQuestion);
    }
  }, [currentScreen, currentQuestion]);

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

  // Cleanup effect for media stream and recorded video
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (recordedVideo) {
        URL.revokeObjectURL(recordedVideo);
      }
    };
  }, [mediaStream, recordedVideo]);

  const goToIntroText = () => {
    setCurrentScreen('intro-text');
  };

  const goToIntroImage = () => {
    setCurrentScreen('intro-image');
  };

  const goToInterview = () => {
    setCurrentScreen('interview');
    setIsThinking(false);
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
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
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

    // Go to playback screen to show the recorded video
    setCurrentScreen('playback');
  };

  const continueToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentScreen('interview');
      setIsThinking(false);
    } else {
      setCurrentScreen('welcome');
      setCurrentQuestion(0);
    }
    // Clean up the recorded video URL
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
      setRecordedVideo(null);
    }
  };

  const retakeRecording = () => {
    // Clean up the recorded video URL
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
      setRecordedVideo(null);
    }
    // Go back to recording screen
    startAnswer();
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
    setModalOpen(false);
  };

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
          <ThinkingTimer
            isActive={isThinking}
            initialTime={5}
            onComplete={() => setIsThinking(false)}
          />
          <div className="text-center">
            <Button
              onClick={startAnswer}
              className="bg-[#364699] hover:bg-[#364699] text-white px-8 py-3 rounded-full"
              disabled={isThinking}
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
          <div className="flex w-full max-w-md h-12 border rounded-xl items-center px-4">
            <div className="flex space-x-1 items-center w-full">
              {/* Static bars for now to test */}
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="w-1 bg-[#364699] rounded-full h-4" />
              ))}
              <span className="text-lg font-mono text-gray-600 pl-4">{formattedTime}</span>
            </div>
          </div>
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
              <span className="text-sm font-medium text-indigo-600">Transcript:</span>
              <span className="text-sm text-gray-700">{questions[currentQuestion]}</span>
            </div>
          </div>

          <RecordingTimeDisplay />

          <div className="text-center space-y-2">
            <Button
              onClick={stopRecording}
              className="bg-[#B22234] hover:bg-red-700 text-white px-8 py-3 rounded-xl"
            >
              Stop Recording
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const PlaybackScreen = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [waveSurfer, setWaveSurfer] = useState<any>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Sync waveform with video
    useEffect(() => {
      if (!videoRef.current || !waveSurfer) return;
      const video = videoRef.current;
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        if (waveSurfer && Math.abs(waveSurfer.getCurrentTime() - video.currentTime) > 0.1) {
          waveSurfer.setTime(video.currentTime);
        }
      };
      const handleSeek = () => {
        if (waveSurfer) {
          waveSurfer.setTime(video.currentTime);
        }
      };
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('seeked', handleSeek);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('seeked', handleSeek);
      };
    }, [waveSurfer]);

    // When waveform is ready, set duration
    // TODO: Replace 'any' with proper WaveSurfer type if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleWaveSurferReady = (ws: any) => {
      setWaveSurfer(ws);
      setDuration(ws.getDuration());
    };

    // Format time MM:SS
    const formatTime = (s: number) => {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8">
        <div className="w-full max-w-2xl space-y-6">
          <div className="relative w-full max-w-md mx-auto">
            <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
              {recordedVideo ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay={false}
                  style={{
                    transform: 'scaleX(-1)',
                    backgroundColor: '#000',
                  }}
                >
                  <source src={recordedVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                  <div className="text-white text-center">
                    <div className="text-lg font-semibold mb-2">Loading Recording...</div>
                    <div className="text-sm">Please wait while we prepare your video</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Waveform visualization */}

          <div className="p-4 bg-white border-l-2 border-gray-200">
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-indigo-600">Transcript:</span>
              <span className="text-sm text-gray-700">{questions[currentQuestion]}</span>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto mt-2 flex items-center gap-2 border border-gray-200 p-2 rounded-lg">
            <div className="flex-1 rounded-lg overflow-hidden  bg-white">
              {recordedVideo && (
                <WaveSurferPlayer
                  height={48}
                  barWidth={2}
                  barRadius={2}
                  waveColor="#e0e0e0"
                  progressColor="#364699"
                  cursorColor="#364699"
                  url={recordedVideo}
                  onReady={handleWaveSurferReady}
                  hideScrollbar={true}
                  normalize={true}
                />
              )}
            </div>
            <span className="text-xs font-mono text-gray-600 min-w-[40px] text-right">
              {formatTime(duration - currentTime > 0 ? duration - currentTime : 0)}
            </span>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={retakeRecording}
              variant="outline"
              className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Retake Recording
            </Button>
            <Button
              onClick={continueToNextQuestion}
              className="bg-[#364699] hover:bg-[#364699] text-white px-6 py-3"
            >
              {currentQuestion < questions.length - 1
                ? 'Continue to Next Question'
                : 'Finish Interview'}
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
        <StepCircle
          label="INTRO"
          active={stepIndex > 0 && stepIndex <= 2}
          checked={stepIndex > 0 && stepIndex <= 2}
        />
        <StepLine />
        <StepCircle
          label="1"
          active={stepIndex > 1 && stepIndex <= 2}
          checked={stepIndex > 1 && stepIndex <= 2}
        />
        <StepLine />
        <StepCircle
          label="2"
          active={stepIndex > 2 && stepIndex <= 2}
          checked={stepIndex > 2 && stepIndex <= 2}
        />
        <StepLine />
        <StepCircle label="3" active={false} checked={false} />
        <StepLine />
        <StepCircle label="4" active={false} checked={false} />
        <StepLine />
        <StepCircle label="5" active={false} checked={false} />
        <StepLine />
        <StepCircle label="END" active={false} checked={false} />
      </div>
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
      <Header initialTime={3600} />
      <div className="pt-20 pb-32">
        {currentScreen === 'intro-video' && <IntroVideo />}
        {currentScreen === 'intro-text' && <IntroText />}
        {currentScreen === 'intro-image' && <IntroImage />}
        {currentScreen === 'interview' && <InterviewScreen />}
        {currentScreen === 'recording' && <RecordingScreen />}
        {currentScreen === 'playback' && <PlaybackScreen />}
      </div>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
}
