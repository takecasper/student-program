/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import { useState } from 'react';
import CheckTab from './CheckTab';

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
  const [state, setState] = useState<string>('prepare');
  const [showCheckTab, setShowCheckTab] = useState<boolean>(false);

  // Change the type to allow string values
  const [completedChecks, setCompletedChecks] = useState<(boolean | string)[]>([
    false, // Browser & Internet Speed Test
    true, // Webcam Check - set to true by default
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

  return (
    <div className="bg-white py-6 px-16 md:px-26 md:py-10 text-gray-800 flex flex-col md:flex-row gap-10">
      {/* Left Section */}
      <div className="md:w-2/3 space-y-6 pr-[11.5rem] border-r border-[#CCCCCC]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
            <img
              alt="clinical"
              loading="lazy"
              width="16"
              height="16"
              decoding="async"
              data-nimg="1"
              src="/svgs/stars.svg"
              className=" text-transparent"
            />
          </div>
          <div className=" flex flex-col">
            <span className="text-sm text-gray-500 font-medium">Recommended</span>
            <h1 className="text-2xl font-semibold">Casper Practice Test</h1>
          </div>
        </div>

        <div className="w-full">
          <Image
            src="/category1.png"
            alt="Casper Thumbnail"
            width={800}
            height={200}
            className="rounded-lg object-cover w-full h-48"
          />
        </div>

        <p className="text-sm text-gray-600">
          Applicants who complete the practice test generally perform better on Casper. The practice
          test can take 1 hour+ to complete. If your test is within this time frame, please proceed
          directly to your test instead.
        </p>

        <div className="border rounded-xl pl-12 pr-10 pt-6 pb-8 space-y-4">
          <h2 className="text-sm font-semibold text-[#333333DE] uppercase">Practice Tests</h2>
          <p className="text-sm text-gray-600">
            Try out our currently available Casper test formats.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">2024/25 Cycle</span>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm text-nowrap cursor-pointer">
                Start Test
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">
                AUS Teachers Education <br /> (2024 - 2025 Cycle)
              </span>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm text-nowrap cursor-pointer">
                Start Test
              </button>
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
                (state === 'prepare' ? ' bg-[#364699] text-white' : ' bg-white text-[#333333DE]')
              }
            >
              <span>📘</span> HOW TO PREPARE
            </button>

            <button
              onClick={() => setState('check')}
              className={
                'flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-[#D9D9D9] cursor-pointer' +
                (state === 'prepare' ? ' text-[#333333DE] bg-white' : ' bg-[#364699] text-white')
              }
            >
              <span>🖥️</span> SYSTEM CHECK
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
            <div className="relative">
              {checkSteps.map((title, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex gap-4.5">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] text-[#22C55E] text-sm flex items-center justify-center">
                      {i + 1}
                    </div>
                    <span className="text-xl font-bold">{title}</span>
                  </div>
                  <div className="pb-4 border-l-6 border-[#F5F5F5] ml-[9px] my-2 pl-6.5">
                    {i === 0 && <CheckTab />}
                    {i === 1 && (
                      <div className="flex items-center gap-2 text-green-600">
                        <span>✅</span>
                        <span className="text-sm">Webcam check completed successfully</span>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="space-y-4">
                        {completedChecks[2] ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm">
                              Success! Your microphone is functioning properly
                            </span>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-gray-600">
                              Select your microphone. To minimize potential recording issues, we
                              recommend not using wireless inputs (like Air pods), if possible.
                            </p>

                            <div className="space-y-3">
                              <div>
                                <span className="text-sm font-medium">
                                  1. Select your microphone
                                </span>
                                <div className="mt-2">
                                  <select className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white">
                                    <option>Default - Macbook Pro Microphone(Built-in)</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <span className="text-sm font-medium">2. Say a few words</span>
                                <div className="mt-2 space-y-2">
                                  <div className="flex items-center gap-1">
                                    {Array.from({ length: 20 }, (_, index) => (
                                      <div
                                        key={index}
                                        className={`w-3 h-6 rounded-sm ${
                                          index < 15 ? 'bg-teal-500' : 'bg-gray-200'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">Input Level</span>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  const newChecks = [...completedChecks];
                                  newChecks[2] = true;
                                  setCompletedChecks(newChecks);
                                }}
                                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                              >
                                Complete Check
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {i === 3 && (
                      <div className="space-y-4">
                        {completedChecks[3] ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm">
                              Video player check completed successfully
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">
                                On the next page, we will play a short 10-second video to test your
                                browser&apos;s ability to display the Casper test video scenarios
                                without difficulties.
                              </p>

                              <p className="text-sm text-gray-600">
                                If you do not experience any technical issues with the audio or
                                video, your browser should be able to display the Casper test video
                                scenarios without difficulties.
                              </p>

                              <p className="text-sm text-gray-600">
                                Under the video, you will be able to indicate whether the video
                                played successfully after it ends. Instructions will be provided if
                                you experience any technical issues (e.g. no sound or no image).
                              </p>

                              <button
                                onClick={() => {
                                  const newChecks = [...completedChecks];
                                  newChecks[3] = 'playing';
                                  setCompletedChecks(newChecks);
                                }}
                                className="bg-[#364699] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#2538A8] transition cursor-pointer"
                              >
                                Proceed
                              </button>
                            </div>
                          </>
                        )}

                        {completedChecks[3] === 'playing' && (
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              If you don&apos;t hear audio with this video, please refresh your
                              browser. This clip is only 10 seconds long.
                            </p>

                            <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative">
                              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                                <svg
                                  className="w-6 h-6 ml-1"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </button>
                            </div>

                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">
                                Please answer the question below before proceeding:
                              </p>

                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Did the video and audio play properly?
                                </p>

                                <div className="space-y-2">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="videoCheck"
                                      value="yes"
                                      className="w-4 h-4 text-blue-600"
                                      onChange={() => {
                                        const newChecks = [...completedChecks];
                                        newChecks[3] = true;
                                        setCompletedChecks(newChecks);
                                      }}
                                    />
                                    <span className="text-sm">Yes, the video played properly.</span>
                                  </label>

                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="videoCheck"
                                      value="no"
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">
                                      No, I had trouble playing the video properly.
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-md w-full bg-white rounded-lg p-6">
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

            <ul className="list-disc pl-5 text-sm text-gray-800 space-y-2">
              <li>
                <strong>Chrome or Firefox:</strong> Only these two web browsers are supported. An
                updated Chrome browser is recommended. The latest version of Firefox is a good
                back-up browser if you run into trouble.
              </li>
              <li>
                Stable high speed internet connection with a bandwidth speed of at least 2 Mbps.
              </li>
              <li>Keyboard</li>
              <li>Audio output (speakers or headphones)</li>
              <li>Webcam</li>
              <li>Working microphone</li>
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
