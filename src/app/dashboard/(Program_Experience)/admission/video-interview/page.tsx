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

function Step2({
  useDefaultIntro,
  setUseDefaultIntro,
  customIntro,
  setCustomIntro,
}: {
  useDefaultIntro: boolean;
  setUseDefaultIntro: (v: boolean) => void;
  customIntro: File | null;
  setCustomIntro: (f: File | null) => void;
}) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Introductory Material</h3>
      <p className="text-gray-500 mb-6">
        Configure the introductory messages for your interview test.
      </p>
      <div className="flex gap-8">
        {/* Default Intro */}
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-xs mb-1">DEFAULT INTRO</div>
          <div className="text-xs mb-2 flex items-center justify-between">
            <p>Introductory Video</p>
            <button
              type="button"
              onClick={() => setUseDefaultIntro(true)}
              className={`w-10 h-6 rounded-full border transition-colors duration-200 ${useDefaultIntro ? 'bg-[#364699] border-[#364699]' : 'bg-gray-200 border-gray-300'}`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${useDefaultIntro ? 'translate-x-4' : 'translate-x-1'}`}
              ></span>
            </button>
          </div>
          <div className="flex items-center mb-2"></div>
          <div className="relative h-48">
            <img
              src="/video.jpg"
              alt="Default Intro"
              className="rounded-lg w-full h-48 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white rounded-full p-2 shadow">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="#364699" />
                </svg>
              </span>
            </button>
            <div className="absolute top-2 left-2 bg-white rounded-[8px] px-3 py-1 text-xs font-semibold flex items-center ">
              Set as 1st
              {useDefaultIntro && (
                <span className="ml-2 w-3 h-3 bg-[#70C0B8] rounded-full inline-block"></span>
              )}
            </div>
          </div>
        </div>
        {/* Custom Intro */}
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-xs mb-1">CUSTOM INTRO</div>
          <div className="text-xs mb-2">Upload/Add your own intro</div>
          <div className="flex-grow flex items-center">
            <label className="block border-2 border-dashed border-gray-300 rounded-lg w-full h-48 flex flex-col items-center justify-center cursor-pointer">
              {customIntro ? (
                <span className="text-xs">{customIntro.name}</span>
              ) : (
                <>
                  <span className="text-4xl text-gray-300">+</span>
                  <span className="text-xs text-gray-400 mt-2">Upload/Add your own intro</span>
                </>
              )}
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={e => setCustomIntro(e.target.files?.[0] || null)}
                disabled={useDefaultIntro}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({
  questions,
  setQuestions,
}: {
  questions: string[];
  setQuestions: (q: string[]) => void;
}) {
  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xl font-bold mb-2">Question Bank</h3>
      <p className="text-gray-500 mb-6">Add and arrange the questions for your interview test.</p>
      <div className="font-semibold text-xs mb-2">ADD QUESTION</div>
      <div className="grid grid-cols-2 gap-6">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            className="border-2 border-dashed border-gray-300 rounded-lg h-24 w-[320px] flex items-center justify-center text-4xl text-gray-300 focus:outline-none"
            onClick={() => {
              const newQ = prompt('Enter your question:', q);
              if (newQ !== null) {
                const updated = [...questions];
                updated[idx] = newQ;
                setQuestions(updated);
              }
            }}
          >
            {q ? <span className="text-base text-gray-700">{q}</span> : <span>+</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step4({
  concludingMaterial,
  setConcludingMaterial,
}: {
  concludingMaterial: string | null;
  setConcludingMaterial: (v: string | null) => void;
}) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Concluding Material</h3>
      <p className="text-gray-500 mb-6">Configure the messages for your interview test.</p>
      <button
        type="button"
        className="border-2 border-dashed border-gray-300 rounded-lg w-64 h-64 flex flex-col items-center justify-center bg-gray-50"
        onClick={() => {
          const msg = prompt('Enter your concluding message:', concludingMaterial || '');
          if (msg !== null) setConcludingMaterial(msg);
        }}
      >
        {concludingMaterial ? (
          <span className="text-base text-gray-700 text-center">{concludingMaterial}</span>
        ) : (
          <span className="text-5xl text-gray-300">+</span>
        )}
      </button>
    </div>
  );
}

function Step5({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  capacity,
  setCapacity,
  slotDuration,
  setSlotDuration,
}: {
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  startTime: string;
  setStartTime: (v: string) => void;
  endTime: string;
  setEndTime: (v: string) => void;
  capacity: string;
  setCapacity: (v: string) => void;
  slotDuration: string;
  setSlotDuration: (v: string) => void;
  previewTest: boolean;
  setPreviewTest: (v: boolean) => void;
}) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Schedule Test Dates & Slots</h3>
      <p className="text-gray-500 mb-6">Set and manage available test dates and time slots</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Start Date</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          >
            <option value="">Select Date</option>
            <option value="2024-07-01">July 1, 2024</option>
            <option value="2024-07-02">July 2, 2024</option>
            <option value="2024-07-03">July 3, 2024</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">End Date</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          >
            <option value="">Select Date</option>
            <option value="2024-07-01">July 1, 2024</option>
            <option value="2024-07-02">July 2, 2024</option>
            <option value="2024-07-03">July 3, 2024</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Start Time</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="08:00">08:00 AM</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="13:00">01:00 PM</option>
            <option value="15:00">03:00 PM</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">End Time</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">02:00 PM</option>
            <option value="16:00">04:00 PM</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1">CAPACITY</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
          >
            <option>Unlimited</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">SLOT DURATION</label>
          <select
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            value={slotDuration}
            onChange={e => setSlotDuration(e.target.value)}
          >
            <option>60 Min</option>
            <option>30 Min</option>
            <option>90 Min</option>
            <option>120 Min</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6 justify-end">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2">
          <span className="text-sm">Preview Test</span>

          <span>
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                stroke="#364699"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="#364699" strokeWidth="2" />
            </svg>
          </span>
        </div>
        <button className="bg-[#364699] text-white rounded-full py-2 font-semibold w-[100px] ml-4">
          Done
        </button>
      </div>
    </div>
  );
}

function Step6({
  ratingsEnabled,
  setRatingsEnabled,
  overrideRule,
  setOverrideRule,
  ratingOverrides,
  setRatingOverrides,
  previewTest6,
  setPreviewTest6,
}: {
  ratingsEnabled: boolean;
  setRatingsEnabled: (v: boolean) => void;
  overrideRule: string;
  setOverrideRule: (v: string) => void;
  ratingOverrides: boolean;
  setRatingOverrides: (v: boolean) => void;
  previewTest6: boolean;
  setPreviewTest6: (v: boolean) => void;
}) {
  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xl font-bold mb-2">Rating System</h3>
      <p className="text-gray-500 mb-6">Configure how applicant responses will be rated</p>
      <div className="flex gap-8 mb-6">
        {/* Question Order */}
        <div className="flex-1">
          <div className="font-semibold text-xs mb-2">QUESTION ORDER</div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${ratingsEnabled ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setRatingsEnabled(true)}
            >
              {ratingsEnabled ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Enable Ratings</span>
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${!ratingsEnabled ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setRatingsEnabled(false)}
            >
              {!ratingsEnabled ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Disable Ratings</span>
            </button>
          </div>
          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={ratingOverrides}
              onChange={e => setRatingOverrides(e.target.checked)}
              className="accent-[#364699] w-4 h-4"
            />
            <span className="text-sm">Enable Rating Overrides</span>
          </label>
        </div>
        {/* Override Rules */}
        <div className="flex-1">
          <div className="font-semibold text-xs mb-2">OVERRIDE RULES</div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${overrideRule === 'full-edit' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setOverrideRule('full-edit')}
            >
              {overrideRule === 'full-edit' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Full Edit Permission</span>
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${overrideRule === 'admin-approval' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setOverrideRule('admin-approval')}
            >
              {overrideRule === 'admin-approval' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Require Admin Approval</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8 justify-end">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2">
          <span className="text-sm">Preview Test</span>
          <button
            type="button"
            onClick={() => setPreviewTest6(!previewTest6)}
            className={`w-10 h-6 rounded-full border transition-colors duration-200 ${previewTest6 ? 'bg-[#364699] border-[#364699]' : 'bg-gray-200 border-gray-300'}`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${previewTest6 ? 'translate-x-4' : 'translate-x-1'}`}
            ></span>
          </button>
          <span>
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                stroke="#364699"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="#364699" strokeWidth="2" />
            </svg>
          </span>
        </div>
        <button className="bg-[#364699] text-white rounded-full py-2 font-semibold w-[100px] ml-4">
          Next
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
  const [useDefaultIntro, setUseDefaultIntro] = useState<boolean>(true);
  const [customIntro, setCustomIntro] = useState<File | null>(null);
  const [questions, setQuestions] = useState<string[]>(Array(5).fill(''));
  const [concludingMaterial, setConcludingMaterial] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [capacity, setCapacity] = useState('Unlimited');
  const [slotDuration, setSlotDuration] = useState('60 Min');
  const [previewTest, setPreviewTest] = useState(false);
  const [ratingsEnabled, setRatingsEnabled] = useState(false);
  const [overrideRule, setOverrideRule] = useState('full-edit');
  const [ratingOverrides, setRatingOverrides] = useState(false);
  const [previewTest6, setPreviewTest6] = useState(false);
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
  else if (currentStep === 1)
    stepContent = (
      <Step2
        useDefaultIntro={useDefaultIntro}
        setUseDefaultIntro={setUseDefaultIntro}
        customIntro={customIntro}
        setCustomIntro={setCustomIntro}
      />
    );
  else if (currentStep === 2)
    stepContent = <Step3 questions={questions} setQuestions={setQuestions} />;
  else if (currentStep === 3)
    stepContent = (
      <Step4
        concludingMaterial={concludingMaterial}
        setConcludingMaterial={setConcludingMaterial}
      />
    );
  else if (currentStep === 4)
    stepContent = (
      <Step5
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        capacity={capacity}
        setCapacity={setCapacity}
        slotDuration={slotDuration}
        setSlotDuration={setSlotDuration}
        previewTest={previewTest}
        setPreviewTest={setPreviewTest}
      />
    );
  else if (currentStep === 5)
    stepContent = (
      <Step6
        ratingsEnabled={ratingsEnabled}
        setRatingsEnabled={setRatingsEnabled}
        overrideRule={overrideRule}
        setOverrideRule={setOverrideRule}
        ratingOverrides={ratingOverrides}
        setRatingOverrides={setRatingOverrides}
        previewTest6={previewTest6}
        setPreviewTest6={setPreviewTest6}
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
