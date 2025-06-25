'use client';
import { MessageSquareText } from 'lucide-react';
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
  const [started, setStarted] = useState(false);
  const [thinkingTime, setThinkingTime] = useState(80); // 1:20 in seconds
  const [answering, setAnswering] = useState(false);
  const [recording, setRecording] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Permission states: 'allowed' | 'denied'
  const [signalStatus, setSignalStatus] = useState<PermissionStatus>(PERMISSION_PENDING);
  const [cameraStatus, setCameraStatus] = useState<PermissionStatus>(PERMISSION_PENDING);
  const [micStatus, setMicStatus] = useState<PermissionStatus>(PERMISSION_PENDING);

  // Animated waveform state
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(30).fill(12));
  const waveAnimRef = useRef<NodeJS.Timeout | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'signal' | 'camera' | 'mic' | null>(null);

  // Animate waveform when recording
  useEffect(() => {
    if (recording) {
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
  }, [recording]);

  // Start timer when started and not answering
  useEffect(() => {
    if (started && !answering && thinkingTime > 0) {
      timerRef.current = setInterval(() => {
        setThinkingTime(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, answering]);

  // Stop timer when time runs out
  useEffect(() => {
    if (thinkingTime === 0 && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [thinkingTime]);

  // When answering starts, set recording to true
  useEffect(() => {
    if (answering) setRecording(true);
  }, [answering]);

  // Format time as mm:ss
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Progress bar width (percentage)
  const progress = ((80 - thinkingTime) / 80) * 100;

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
        <div className="flex-1 flex justify-center">
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
            <span className="text-[#3b4cca] font-semibold">10:00</span>
          </div>
        </div>
        <div className="text-sm text-gray-700 font-medium">Question 1 of 5</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Video Player */}
        <div className="w-[480px] h-[270px] bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
          <Image
            src="/video.jpg"
            alt="Video Placeholder"
            fill
            style={{ objectFit: 'cover', opacity: 0.7 }}
          />
          {/* Recording badge */}
          {recording && (
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow text-xs font-semibold">
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse" />
              <span className="text-red-500">Recording</span>
            </div>
          )}
          {!started && (
            <button
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg"
              onClick={() => setStarted(true)}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#fff" />
                <polygon points="16,13 28,20 16,27" fill="#3b4cca" />
              </svg>
            </button>
          )}
        </div>
        {/* Transcript and Thinking Time or Recording UI */}
        {started && (
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
            {/* If recording, show waveform UI, else show thinking time */}
            {!recording ? (
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
                  className={`mt-6 px-8 py-2 rounded-full bg-[#364699] text-white font-semibold transition ${thinkingTime === 0 || answering ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00897B]'}`}
                  disabled={thinkingTime === 0 || answering}
                  onClick={() => setAnswering(true)}
                >
                  Start Answer
                </button>
              </>
            ) : (
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
                    onClick={() => setRecording(false)}
                  >
                    Stop Recording
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full flex justify-center items-center py-6 bg-white border-t">
        <div className="flex items-center gap-2">
          <StepCircle label="INTRO" active={started} checked={started} />
          <StepLine />
          <StepCircle label="1" active={started} />
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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mx-auto">
          <circle cx="10" cy="10" r="10" fill="#364699" />
          <path
            d="M6 10.5L9 13.5L14 8.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <>
          {showCornerCheck && (
            <span className="absolute left-1 top-1 w-4 h-4 bg-[#00A59B] rounded-full flex items-center justify-center">
              <svg
                width="10"
                height="10"
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
      <Image src={src} alt={alt} width={16} height={16} />
      {status === PERMISSION_ALLOWED ? (
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
      ) : status === PERMISSION_DENIED ? (
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
