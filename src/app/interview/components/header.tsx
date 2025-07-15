import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  timeLeft?: string;
  countdownSeconds?: number;
  initialTime?: number; // New prop for initial countdown time
}

export const Header = ({ timeLeft, countdownSeconds, initialTime }: HeaderProps) => {
  const [internalCountdown, setInternalCountdown] = useState(initialTime || 3600);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Internal countdown timer that doesn't affect parent component
  useEffect(() => {
    if (initialTime && initialTime > 0) {
      setInternalCountdown(initialTime);

      timerRef.current = setInterval(() => {
        setInternalCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [initialTime]);

  // Use external countdown if provided, otherwise use internal
  const displayTime =
    countdownSeconds !== undefined
      ? formatTime(countdownSeconds)
      : initialTime !== undefined
        ? formatTime(internalCountdown)
        : timeLeft || '00:00';

  // Determine if time is running low (less than 5 minutes)
  const currentTime = countdownSeconds !== undefined ? countdownSeconds : internalCountdown;
  const isTimeLow = currentTime < 300; // 5 minutes
  const isTimeCritical = currentTime < 60; // 1 minute

  const timerColor = isTimeCritical ? '#B71C1C' : isTimeLow ? '#FF9800' : '#3b4cca';
  const bgColor = isTimeCritical ? '#FEE2E2' : isTimeLow ? '#FFF3E0' : '#EDEEF6';

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full flex justify-between items-center px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#3b4cca] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <Image src="/toro.png" alt="UofT Logo" width={120} height={32} className="h-8 w-auto" />
      </div>
      <div
        className={`flex items-center gap-2 px-4 py-1 rounded-full transition-colors duration-300 ${isTimeCritical ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: bgColor }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke={timerColor} strokeWidth="2" />
          <path
            d="M12 6v6l4 2"
            stroke={timerColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-medium" style={{ color: timerColor }}>
          Time Left:
        </span>
        <span className="font-semibold" style={{ color: timerColor }}>
          {displayTime}
        </span>
      </div>
    </div>
  );
};
