'use client';
import Image from 'next/image';
import { useState } from 'react';
import CheckTab from './CheckTab';
import WebcamCheck from './WebcamCheck';
import MicrophoneCheck from './MicrophoneCheck';
import VideoPlayerCheck from './VideoPlayerCheck';
import VideoRecordingCheck from './VideoRecordingCheck';
import CasperTestInterface from './CasperTestInterface';
import CongratulationsScreen from './CongratulationsScreen';

import GolfCourseIcon from '../../../../public/svgs/golf_course.svg';
import { Check } from 'lucide-react';

export default function CasperPrepare() {
  const steps = [
    {
      number: '1',
      title: 'Make a Reservation',
      description: 'Please make a reservation first to start using your checklist',
      button: 'Reserve Test',
    },
    {
      number: '2',
      title: 'Review Test Tips',
      description: (
        <>
          Review Casper Preparation Tips{' '}
          <a href="#" className="text-blue-600 underline">
            Here
          </a>
          .
        </>
      ),
    },
    {
      number: '3',
      title: 'System Requirement Check',
      description:
        'Perform a mandatory system requirements check in your intended test environment in the days leading up to your test.',
      button: 'System Check',
    },
    {
      number: '4',
      title: 'Start Casper Practice Test',
      description: 'Try the Casper Practice Test in your test format',
    },
  ];
  const [state, setState] = useState('prepare');
  const [showCheckTab, setShowCheckTab] = useState<boolean>(false);
  const [showTestInterface, setShowTestInterface] = useState<boolean>(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [checkStage, setCheckStage] = useState(1);

  const [completedChecks, setCompletedChecks] = useState<(boolean | string)[]>([
    false, // Browser & Internet Speed Test
    false, // Webcam Check
    false, // Microphone Check
    false, // Video Player Check
    false, // Video Recording Check
  ]);

  const checkSteps = [
    'Browser & Internet Speed Test',
    'Webcam Check',
    'Microphone Check',
    'Video Player Check',
    'Video Recording Check',
  ];

  const isPrepareTab = state === 'prepare';
  const isCheckTab = state === 'check';

  // If showing test interface, render it instead
  if (showTestInterface) {
    return <CasperTestInterface onBack={() => setShowTestInterface(false)} />;
  }

  // If showing congratulations, show only that screen
  if (showCongratulations) {
    return (
      <div className="bg-white py-6 md:py-10 text-gray-800 flex flex-col md:flex-row gap-10">
        {/* Left Section - Same as main layout */}
        <div className="md:w-2/3 mx-auto mt-8 bg-white flex justify-center border-r">
          <div className="w-full max-w-[650px] space-y-6">
            {/* Header */}
            <div className="flex space-x-3">
              <div className="w-[60px] h-[60px] rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                <Image src="/svgs/stars.svg" alt="clinical" width={24} height={24} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm text-gray-500 font-medium">Recommended</span>
                <h1 className="text-2xl font-semibold">Casper Practice Test</h1>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-full">
              <Image
                src="/category1.png"
                alt="Casper Thumbnail"
                width={800}
                height={200}
                className="rounded-2xl object-cover w-full h-48"
              />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600">
              Applicants who complete the practice test generally perform better on Casper. The
              practice test can take 1 hour+ to complete. If your test is within this time frame,
              please proceed directly to your test instead.
            </p>

            {/* Practice Test Box */}
            <div className="border rounded-xl pl-12 pr-10 pt-6 pb-8 space-y-4 bg-white shadow">
              <h2 className="text-sm font-semibold text-[#333333DE] uppercase">Practice Tests</h2>
              <p className="text-sm text-gray-600">
                Try out our currently available Casper test formats.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">2024/25 Cycle</span>
                  <button
                    onClick={() => setShowTestInterface(true)}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm"
                  >
                    Start Test
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">
                    AUS Teachers Education <br /> (2024 - 2025 Cycle)
                  </span>
                  <button
                    onClick={() => setShowTestInterface(true)}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm"
                  >
                    Start Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Congratulations */}
        <CongratulationsScreen onStartTest={() => setShowTestInterface(true)} />
      </div>
    );
  }

  return (
    <div className="bg-white py-6 md:py-10 text-gray-800 flex flex-col md:flex-row gap-10">
      {/* Left Section */}
      <div className="md:w-2/3 mx-auto mt-8 bg-white flex justify-center border-r">
        <div className="w-full max-w-[650px] space-y-6">
          {/* Header */}
          <div className="flex space-x-3">
            <div className="w-[60px] h-[60px] rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
              <Image src="/svgs/stars.svg" alt="clinical" width={24} height={24} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-gray-500 font-medium">Recommended</span>
              <h1 className="text-2xl font-semibold">Casper Practice Test</h1>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="w-full">
            <Image
              src="/category1.png"
              alt="Casper Thumbnail"
              width={800}
              height={200}
              className="rounded-2xl object-cover w-full h-48"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600">
            Applicants who complete the practice test generally perform better on Casper. The
            practice test can take 1 hour+ to complete. If your test is within this time frame,
            please proceed directly to your test instead.
          </p>

          {/* Practice Test Box */}
          <div className="border rounded-xl pl-12 pr-10 pt-6 pb-8 space-y-4 bg-white shadow">
            <h2 className="text-sm font-semibold text-[#333333DE] uppercase">Practice Tests</h2>
            <p className="text-sm text-gray-600">
              Try out our currently available Casper test formats.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">2024/25 Cycle</span>
                <button
                  onClick={() => setShowTestInterface(true)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm"
                >
                  Start Test
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">
                  AUS Teachers Education <br /> (2024 - 2025 Cycle)
                </span>
                <button
                  onClick={() => setShowTestInterface(true)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Preparation Steps */}
      {state === 'prepare' && (
        <div className="w-full md:w-96 py-6 bg-white space-y-6 text-gray-800 shrink-0">
          {/* Top Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setState('prepare')}
              className={
                'flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-[#D9D9D9] cursor-pointer' +
                (isPrepareTab ? ' bg-[#364699] text-white' : ' bg-white text-[#333333DE]')
              }
            >
              <GolfCourseIcon
                className={`w-[15px] h-[15px] fill-current ${state === 'prepare' ? 'text-white' : 'text-[#333333DE]'}`}
              />{' '}
              HOW TO PREPARE
            </button>

            <button
              onClick={() => setState('check')}
              className={
                'flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-[#D9D9D9] cursor-pointer' +
                (isCheckTab ? ' bg-[#364699] text-white' : ' bg-white text-[#333333DE]')
              }
            >
              <GolfCourseIcon
                className={`w-[15px] h-[15px] fill-current ${state === 'prepare' ? 'text-[#333333DE]' : 'text-white'}`}
              />{' '}
              SYSTEM CHECK
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-semibold">How to Prepare for Casper</h2>
          <p className="text-sm text-gray-600">
            Please use the items listed below as guidance to help you prepare for your Casper test,
            we recommend you check off items as you go to keep track of your progress.
          </p>

          {/* Steps */}
          <div className="space-y-6 relative">
            <div className="absolute w-1.5 h-[384px] bg-[#F5F5F5] left-[9px]"></div>
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-4.5">
                {/* Step Circle */}
                <div className="shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] text-[#22C55E] text-sm flex items-center justify-center">
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-800">
                    Step {step.number}: {step.title}
                  </h3>
                  <p className="text-sm text-[#33333399]">{step.description}</p>
                  {step.button && (
                    <button className="mt-2 px-6 py-4 border border-[#364699] text-[#364699] rounded-full text-sm hover:bg-blue-50 cursor-pointer">
                      {step.button}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state === 'check' &&
        (showCheckTab ? (
          <>
            <div className="w-full md:w-96 py-6 bg-white text-gray-800 shrink-0 mr-5">
              <h1 className="mt-2  text-xl font-semibold mb-4 text-[#333333DE]">System Check</h1>
              {checkSteps.map((title, i) => {
                const isCompleted = i + 1 <= checkStage; // mark only first step as completed
                return (
                  <div key={i} className="flex flex-col">
                    <div className="flex gap-4.5 items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2  ${
                          isCompleted ? 'bg-[#00a59b] text-white' : 'bg-[#F5F5F5] text-[#00a59b]'
                        }`}
                      >
                        {isCompleted ? <Check className="h-5 w-5" /> : i + 1}
                      </div>
                      <span
                        className="text-xl font-bold cursor-pointer"
                        onClick={() => setCheckStage(i)}
                      >
                        {title}
                      </span>
                    </div>
                    <div
                      className={`pb-4 border-l-6 ml-[12px] my-2 pl-6.5 ${
                        checkSteps.length === i + 1
                          ? 'border-none'
                          : isCompleted
                            ? 'border-[#00a59b]'
                            : 'border-[#F5F5F5]'
                      }`}
                    >
                      {i === 0 && checkStage === 0 && <CheckTab />}

                      {i === 0 && isCompleted && checkStage !== 0 && (
                        <p className="text-[#33333399] text-xs ml-2">Download Bitrate Approved!</p>
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
                      {i === 1 && isCompleted && checkStage !== 1 && (
                        <p className="text-[#33333399] text-xs ml-2">
                          Webcam check completed successfully!
                        </p>
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
                      {i === 2 && isCompleted && checkStage !== 2 && (
                        <p className="text-[#33333399] text-xs ml-2">Download Bitrate Approved!</p>
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
                      {i === 3 && isCompleted && checkStage !== 3 && (
                        <p className="text-[#33333399] text-xs ml-2">Download Bitrate Approved!</p>
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
                                // Show congratulations screen immediately
                                setShowCongratulations(true);
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
          </>
        ) : (
          <div className="max-w-md w-full bg-white rounded-lg p-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setState('prepare')}
                className={
                  'flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-[#D9D9D9] cursor-pointer' +
                  (isPrepareTab ? ' bg-[#364699] text-white' : ' bg-white text-[#333333DE]')
                }
              >
                <GolfCourseIcon
                  className={`w-[15px] h-[15px] fill-current ${isPrepareTab ? 'text-white' : 'text-[#333333DE]'}`}
                />{' '}
                HOW TO PREPARE
              </button>

              <button
                onClick={() => setState('check')}
                className={
                  'flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-[#D9D9D9] cursor-pointer' +
                  (isCheckTab ? ' bg-[#364699] text-white' : ' bg-white text-[#333333DE]')
                }
              >
                <GolfCourseIcon
                  className={`w-[15px] h-[15px] fill-current ${isCheckTab ? 'text-white' : 'text-[#333333DE]'}`}
                />{' '}
                SYSTEM CHECK
              </button>
            </div>
            <h1 className="mt-2  text-xl font-semibold mb-4 text-[#333333DE]">
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

            <ul className="list-none pl-5 text-sm text-gray-800 space-y-2">
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

            <p className="text-sm text-[#333333DE] mt-4">
              If you experience any technical difficulties during your test time, please contact us
              by clicking on the chat bubble in the bottom right-hand corner of your screen
              immediately to report and resolve the issue.
            </p>

            <div className="w-full flex mt-6 justify-center">
              <button
                onClick={() => setShowCheckTab(true)}
                className="bg-[#364699] text-white py-4 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
              >
                Proceed
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
