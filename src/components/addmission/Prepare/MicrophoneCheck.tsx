'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface MicrophoneCheckProps {
  onComplete: () => void;
}

interface AudioDevice {
  deviceId: string;
  label: string;
}

const MicrophoneCheck = ({ onComplete }: MicrophoneCheckProps) => {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string>('');

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Request microphone permission and get devices
  useEffect(() => {
    const initializeMicrophone = async () => {
      try {
        // Request permission first
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);

        // Stop the initial stream
        stream.getTracks().forEach(track => track.stop());

        // Get available audio input devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices
          .filter(device => device.kind === 'audioinput')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
          }));

        setDevices(audioInputs);
        if (audioInputs.length > 0) {
          setSelectedDevice(audioInputs[0].deviceId);
        }
      } catch (err) {
        setError('Microphone access denied. Please allow microphone permissions.');
        console.error('Microphone initialization error:', err);
      }
    };

    initializeMicrophone();

    return () => {
      stopListening();
    };
  }, []);

  const startListening = useCallback(async () => {
    try {
      stopListening(); // Stop any existing stream

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;

      // Create audio context and analyser
      const audioContext = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setIsListening(true);
      monitorAudioLevel();
    } catch (err) {
      setError('Failed to access selected microphone.');
      console.error('Audio stream error:', err);
    }
  }, [selectedDevice]);

  // Start listening when device is selected
  useEffect(() => {
    if (selectedDevice && hasPermission) {
      startListening();
    }
    return () => stopListening();
  }, [selectedDevice, hasPermission, startListening]);

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    analyserRef.current = null;
    setIsListening(false);
    setAudioLevel(0);
  };

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateLevel = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average amplitude
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      const normalizedLevel = Math.min(average / 128, 1); // Normalize to 0-1

      setAudioLevel(normalizedLevel);
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };

    updateLevel();
  };

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId);
  };

  const renderAudioLevelBars = () => {
    const bars = Array.from({ length: 20 }, (_, index) => {
      const threshold = index / 20;
      const isActive = audioLevel > threshold;

      // Color coding: green for low, yellow for medium, red for high
      let bgColor = 'bg-gray-200';
      if (isActive) {
        if (index < 10) bgColor = 'bg-green-500';
        else if (index < 16) bgColor = 'bg-yellow-500';
        else bgColor = 'bg-red-500';
      }

      return (
        <div
          key={index}
          className={`w-3 h-6 rounded-sm transition-colors duration-100 ${bgColor}`}
        />
      );
    });

    return bars;
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800"
          >
            Refresh page to try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Select your microphone. To minimize potential recording issues, we recommend not using
        wireless inputs (like Air pods), if possible.
      </p>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium">1. Select your microphone</span>
          <div className="mt-2">
            <select
              className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white"
              value={selectedDevice}
              onChange={e => handleDeviceChange(e.target.value)}
              disabled={!hasPermission || devices.length === 0}
            >
              {devices.length === 0 ? (
                <option>Loading microphones...</option>
              ) : (
                devices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium">2. Say a few words</span>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-1">{renderAudioLevelBars()}</div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {isListening ? 'Listening...' : 'Not listening'}
              </span>
              <span className="text-xs text-gray-500">Level: {Math.round(audioLevel * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={!hasPermission || !selectedDevice}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isListening
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {isListening ? 'Stop Test' : 'Start Test'}
          </button>

          <button
            onClick={onComplete}
            disabled={!hasPermission}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Complete Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default MicrophoneCheck;
