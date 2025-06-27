/* VIDEO INTERVIEW CONFIGURATION PAGE */
'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';

const steps = [
  {
    title: 'Step 1: Test Content & Flow',
    description: 'Define how test results are categorized and distributed',
  },
  {
    title: 'Step 2: Introductory Material',
    description: 'Configure the introductory messages for your interview test.',
  },
  {
    title: 'Step 3: Question Bank',
    description: 'Manage settings for French language test support',
  },
  {
    title: 'Step 4: Concluding Material (Optional)',
    description: 'Configure the concluding messages for your interview test.',
  },
  { title: 'Step 5: Scheduling', description: 'Configure rules and options for fee waivers' },
  {
    title: 'Step 6: Score Delivery Settings',
    description: 'Configure rules and options for fee waivers',
  },
  {
    title: 'Step 7: Fee Waiver Configuration',
    description: 'Configure rules and options for fee waivers',
  },
];

function Step1({
  testName,
  setTestName,
  numQuestions,
  setNumQuestions,
  timeBetween,
  setTimeBetween,
  thinkingTime,
  setThinkingTime,
  responseTime,
  setResponseTime,
  breakOption,
  setBreakOption,
}: {
  testName: string;
  setTestName: (v: string) => void;
  numQuestions: string;
  setNumQuestions: (v: string) => void;
  timeBetween: string;
  setTimeBetween: (v: string) => void;
  thinkingTime: string;
  setThinkingTime: (v: string) => void;
  responseTime: string;
  setResponseTime: (v: string) => void;
  breakOption: boolean;
  setBreakOption: (v: boolean) => void;
}) {
  const numOptions = ['3', '4', '5', '6', '7', '8', '9', '10'];
  const timeOptions = ['0:00 min', '0:30 min', '1:00 min', '2:00 min', '3:00 min'];
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Test Naming & Basic Settings</h3>
      <p className="text-gray-500 mb-6">Provide basic information to create your program</p>
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1">TEST NAME</label>
        <input
          className="w-full border rounded-[12px] px-3 py-2 text-sm"
          value={testName}
          onChange={e => setTestName(e.target.value)}
          placeholder="Interview Cycle 1"
        />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">NUMBER OF QUESTIONS</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={numQuestions}
            onChange={e => setNumQuestions(e.target.value)}
          >
            {numOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">TIME BETWEEN EACH QUESTION</label>
          <input
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={timeBetween}
            onChange={e => setTimeBetween(e.target.value)}
            placeholder="0:00 min"
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">THINKING TIME PER QUESTION</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={thinkingTime}
            onChange={e => setThinkingTime(e.target.value)}
          >
            {timeOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">RESPONSE TIME PER QUESTION</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={responseTime}
            onChange={e => setResponseTime(e.target.value)}
          >
            {timeOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <label className="block text-xs font-semibold mb-1">BREAK OPTIONS</label>
        <button
          type="button"
          onClick={() => setBreakOption(!breakOption)}
          className={`w-10 h-6 rounded-full border transition-colors duration-200 ${breakOption ? 'bg-[#364699] border-[#364699]' : 'bg-gray-200 border-gray-300'}`}
        >
          {' '}
          <span
            className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${breakOption ? 'translate-x-4' : 'translate-x-1'}`}
          ></span>
        </button>
      </div>
    </div>
  );
}

export default function VideoInterviewConfigPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [testName, setTestName] = useState('Interview Cycle 1');
  const [numQuestions, setNumQuestions] = useState('5');
  const [timeBetween, setTimeBetween] = useState('0:00 min');
  const [thinkingTime, setThinkingTime] = useState('0:00 min');
  const [responseTime, setResponseTime] = useState('0:00 min');
  const [breakOption, setBreakOption] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(0);
  const cycles = [
    { name: 'Interview Cycle 1', status: 'Incomplete' },
    { name: 'Interview Cycle 2', status: 'Incomplete' },
  ];

  let stepContent = null;
  if (currentStep === 0)
    stepContent = (
      <Step1
        testName={testName}
        setTestName={setTestName}
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
        timeBetween={timeBetween}
        setTimeBetween={setTimeBetween}
        thinkingTime={thinkingTime}
        setThinkingTime={setThinkingTime}
        responseTime={responseTime}
        setResponseTime={setResponseTime}
        breakOption={breakOption}
        setBreakOption={setBreakOption}
      />
    );
  else
    stepContent = (
      <div className="text-center text-gray-400">Step {currentStep + 1} content goes here.</div>
    );

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      <h2 className="text-[#364699] text-lg font-semibold pt-16 px-8 mb-8">VIDEO INETRVIEW</h2>
      <div className="px-8">
        <div className="flex gap-4 mb-8">
          {cycles.map((cycle, idx) => (
            <button
              key={cycle.name}
              type="button"
              className={`px-6 py-3 rounded-lg border text-left ${selectedCycle === idx ? 'bg-[#364699] text-white border-[#364699] font-semibold' : 'bg-white text-[#333] border-[#e5e7eb]'} flex flex-col items-start min-w-[180px]`}
              onClick={() => setSelectedCycle(idx)}
            >
              <span>{cycle.name}</span>
              <span className="text-xs font-normal opacity-70">{cycle.status}</span>
            </button>
          ))}
          <button
            type="button"
            className="px-6 py-3 rounded-lg border-2 border-dashed border-[#e5e7eb] text-[#bdbdbd] flex items-center justify-center min-w-[60px]"
          >
            <span className="text-2xl font-bold">+</span>
          </button>
        </div>
        <div className="flex items-start">
          {/* Left Stepper */}
          <div className="w-[470px] border-r border-[#e5e7eb] pb-8 flex flex-col">
            <ol className="space-y-0">
              {steps.map((step, idx) => (
                <li key={idx} className="flex flex-row items-start mb-2">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center w-12 relative">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full z-10
                        ${
                          idx < currentStep
                            ? 'bg-[#70C0B8] text-white border-2 border-[#70C0B8]'
                            : idx === currentStep
                              ? 'bg-[#70C0B8] text-white border-2 border-[#70C0B8]'
                              : 'bg-white text-[#70C0B8] border-2 border-[#70C0B8]'
                        }
                      `}
                    >
                      {idx < currentStep ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <span className="font-bold text-base">{idx + 1}</span>
                      )}
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-1 h-12 mx-auto
                          ${idx < currentStep ? 'bg-[#70C0B8]' : 'bg-[#e5e7eb]'}
                        `}
                      />
                    )}
                  </div>
                  {/* Text column */}
                  <div className="flex-1 min-w-0 pl-2 pt-1">
                    <div
                      className={`font-semibold text-[15px] ${idx === currentStep ? 'text-[#364699]' : 'text-[#6b7280]'}`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-[#9ca3af]">{step.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* Right Form */}
          <div className="px-20 flex flex-col items-start justify-center">
            {stepContent}
            {currentStep < steps.length - 1 && (
              <button
                className="mt-8 bg-[#364699] text-white rounded-full py-2 font-semibold w-[100px]"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
