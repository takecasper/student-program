import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ThinkingTimerProps {
  initialTime?: number;
  isActive?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
}

export const ThinkingTimer = ({
  initialTime = 5,
  isActive = false,
  onComplete,
  onStart,
}: ThinkingTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start timer when isActive becomes true
  useEffect(() => {
    if (isActive && !isRunning) {
      setTimeLeft(initialTime);
      setIsRunning(true);
      onStart?.();

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && isRunning) {
      // Stop timer when isActive becomes false
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsRunning(false);
    }
  }, [isActive, isRunning, initialTime, onComplete, onStart]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const progressPercentage = ((initialTime - timeLeft) / initialTime) * 100;

  return (
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
        <span className="text-sm font-mono text-gray-600">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};
