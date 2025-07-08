import { useState } from 'react';
import { Check } from 'lucide-react';
import SpeedTestCheck from './SpeedTestCheck';
import WebcamCheck from './WebcamCheck';
import MicrophoneCheck from './MicrophoneCheck';
import VideoPlayerCheck from './VideoPlayerCheck';
import VideoRecordingCheck from './VideoRecordingCheck';

interface VideoInterviewRightProps {
  setState?: (state: 'prepare' | 'check') => void;
}

export default function VideoInterviewRight({ setState }: VideoInterviewRightProps) {
  const [showSystemRequirements, setShowSystemRequirements] = useState(false);
  const [showCheckTab, setShowCheckTab] = useState(false);
  const [checkStage, setCheckStage] = useState(0);
  const [completedChecks, setCompletedChecks] = useState<(boolean | string)[]>([
    false, // Browser & Internet Speed Test
    false, // Webcam Check
    false, // Microphone Check
    false, // Video Player Check
    false, // Video Recording Check
  ]);

  const checkSteps = [
    'Internet Speed Check',
    'Webcam Check',
    'Microphone Check',
    'Video Player Check',
    'Video Recording Check',
  ];

  const handleSystemCheck = () => {
    if (setState) {
      // If setState is provided (used in main Prepare component), use it
      setState('check');
    } else {
      // If setState is not provided (used in Snapshot component), show system requirements inline
      setShowSystemRequirements(true);
    }
  };

  const handleProceed = () => {
    setShowSystemRequirements(false);
    setShowCheckTab(true);
  };

  const handleSpeedTestComplete = () => {
    const newChecks = [...completedChecks];
    newChecks[0] = true;
    setCompletedChecks(newChecks);
    // Automatically advance to the next step
    setCheckStage(1); // Move to next stage
  };

  // Show system check steps when Proceed is clicked
  if (showCheckTab) {
    return (
      <div className="h-screen w-full bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-xl font-semibold mb-6 text-[#333333DE]">System Check</h1>
          <div className="space-y-4">
            {checkSteps.map((title, i) => {
              const isCompleted = completedChecks[i] === true;
              return (
                <div key={i} className="flex flex-col">
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2  ${
                        isCompleted ? 'bg-[#00a59b] text-white' : 'bg-[#F5F5F5] text-[#00a59b]'
                      }`}
                    >
                      {isCompleted ? <Check className="h-5 w-5" /> : i + 1}
                    </div>
                    <span
                      className="text-lg font-bold cursor-pointer"
                      onClick={() => setCheckStage(i)}
                    >
                      {title}
                    </span>
                  </div>
                  <div
                    className={`pb-4 border-l-6 ml-[12px] my-2 pl-6 ${
                      checkSteps.length === i + 1
                        ? 'border-none'
                        : isCompleted
                          ? 'border-[#00a59b]'
                          : 'border-[#F5F5F5]'
                    }`}
                  >
                    {i === 0 && checkStage === 0 && (
                      <SpeedTestCheck onComplete={handleSpeedTestComplete} />
                    )}

                    {i === 0 && isCompleted && (
                      <p className="text-[#33333399] text-xs ml-2">
                        Your internet speed looks good!
                      </p>
                    )}

                    {i === 1 && checkStage === 1 && (
                      <div className="space-y-4">
                        {completedChecks[1] ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm">Webcam check completed successfully</span>
                          </div>
                        ) : (
                          <WebcamCheck
                            onComplete={() => {
                              const newChecks = [...completedChecks];
                              newChecks[1] = true;
                              setCompletedChecks(newChecks);
                            }}
                          />
                        )}
                      </div>
                    )}
                    {i === 1 && isCompleted && (
                      <p className="text-[#33333399] text-xs ml-2">Submitted Photo! </p>
                    )}

                    {i === 2 && checkStage === 2 && (
                      <div className="space-y-4">
                        {completedChecks[2] ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm">Microphone is functioning properly</span>
                          </div>
                        ) : (
                          <MicrophoneCheck
                            onComplete={() => {
                              const newChecks = [...completedChecks];
                              newChecks[2] = true;
                              setCompletedChecks(newChecks);
                            }}
                          />
                        )}
                      </div>
                    )}
                    {i === 2 && isCompleted && (
                      <p className="text-[#33333399] text-xs ml-2">
                        Microphone is functioning properly!
                      </p>
                    )}

                    {i === 3 && checkStage === 3 && (
                      <div className="space-y-4">
                        {completedChecks[3] === true ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm">Video player is working perfectly</span>
                          </div>
                        ) : (
                          <VideoPlayerCheck
                            onComplete={() => {
                              const newChecks = [...completedChecks];
                              newChecks[3] = true;
                              setCompletedChecks(newChecks);
                            }}
                          />
                        )}
                      </div>
                    )}
                    {i === 3 && isCompleted && (
                      <p className="text-[#33333399] text-xs ml-2">
                        Video player is working perfectly!
                      </p>
                    )}

                    {i === 4 && checkStage === 4 && (
                      <div className="space-y-4">
                        {completedChecks[4] === true ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm">Great! You look and sound clearly</span>
                          </div>
                        ) : (
                          <VideoRecordingCheck
                            onComplete={() => {
                              const newChecks = [...completedChecks];
                              newChecks[4] = true;
                              setCompletedChecks(newChecks);
                            }}
                            onRecordAgain={() => {
                              // Reset to initial state if needed
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show system requirements content when clicked
  if (showSystemRequirements) {
    return (
      <div className="h-screen w-full bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold mb-4 text-[#333333DE]">
              Welcome to the Casper System Requirements
            </h1>
            <p className="text-sm text-[#333333DE] mb-3">
              Before your test, you are required to do a System Requirements Check. Completing this
              check will help ensure that you have a smooth test experience on your actual test day.
            </p>
            <p className="text-sm text-[#333333DE] mb-3">
              This step-by-step guide will give you an indication of whether your computer and
              internet connection (the two main sources of technical issues) are able to run the
              Casper test smoothly.
            </p>
            <p className="text-sm text-[#333333DE] mb-4">
              In order to complete this System Requirements Check (and the actual Casper Test!), you
              will need:
            </p>

            <ul className="list-none pl-5 text-sm text-gray-800 space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>
                  <strong>Chrome or Firefox:</strong> Only these two web browsers are supported. An
                  updated Chrome browser is recommended. The latest version of Firefox is a good
                  back-up browser if you run into trouble.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>
                  Stable high speed internet connection with a bandwidth speed of at least 2 Mbps.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>Keyboard</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>Audio output (speakers or headphones)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>Webcam</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>Working microphone</div>
              </li>
            </ul>

            <p className="text-sm text-[#333333DE] mb-6">
              If you experience any technical difficulties during your test time, please contact us
              by clicking on the chat bubble in the bottom right-hand corner of your screen
              immediately to report and resolve the issue.
            </p>

            <div className="w-full flex justify-center">
              <button
                onClick={handleProceed}
                className="bg-[#364699] text-white py-4 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-semibold mb-4">System requirements Check</h1>
          <p className="text-sm text-gray-600 mb-6">
            Please use the items listed below as guidance to help you prepare for your test, we
            recommend you check off items as you go to keep track of your progress.
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] text-[#00A59B] flex items-center justify-center text-sm">
                    1
                  </div>
                  <div className="absolute top-6 left-1/2 w-1 h-[calc(100%+24px)] bg-gray-200 -translate-x-1/2"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Step 1: Review Test Tips</h3>
                  <p className="text-sm text-gray-600">
                    Review Casper Preparation Tips{' '}
                    <a href="#" className="text-[#364699] underline">
                      Here
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] text-[#00A59B] flex items-center justify-center text-sm">
                    2
                  </div>
                  <div className="absolute top-6 left-1/2 w-1 h-[calc(100%+24px)] bg-gray-200 -translate-x-1/2"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Step 2: System Requirement Check</h3>
                  <p className="text-sm text-gray-600">
                    Perform a mandatory system requirements check in your intended test environment
                    in the days leading up to your test.
                  </p>
                  <button
                    onClick={handleSystemCheck}
                    className="px-6 py-2 text-[#364699] text-sm border border-[#364699] rounded-full hover:bg-gray-50"
                  >
                    System Check
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] text-[#00A59B] flex items-center justify-center text-sm">
                    3
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Step 3: Start Casper Practice Test</h3>
                  <p className="text-sm text-gray-600">
                    Try the Casper Practice Test in your test format
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
