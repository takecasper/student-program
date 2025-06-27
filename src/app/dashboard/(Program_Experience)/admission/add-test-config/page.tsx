/* Copied from test-config/page.tsx */
'use client';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

const steps = [
  {
    title: 'Step 1: Program Setup',
    description: 'Provide basic information to create your program',
  },
  {
    title: 'Step 2: Question Setup',
    description: 'Define or customize questions for your program',
  },
  {
    title: 'Step 3: Time and Flow',
    description: 'Set up the testing schedule and flow',
  },
  {
    title: 'Step 4: Rating System',
    description: 'Configure how applicant responses will be rated',
  },
  {
    title: 'Step 5: Schedule Test Dates & Slots',
    description: 'View, export, and publish test results.',
  },
  {
    title: 'Step 6: Send Target Invitations',
    description: 'Send invitations to specific groups ',
  },
];

function Step1({
  programName,
  setProgramName,
  programDescription,
  setProgramDescription,
  programType,
  setProgramType,
}: {
  programName: string;
  setProgramName: (v: string) => void;
  programDescription: string;
  setProgramDescription: (v: string) => void;
  programType: string;
  setProgramType: (v: string) => void;
}) {
  return (
    <div className="flex flex-col ">
      <h3 className="text-xl font-bold mb-2">Test Details</h3>
      <p className="text-gray-500 mb-6">Provide basic information to create your test</p>
      <form className="space-y-5">
        <div>
          <label className="block text-xs font-semibold mb-1">TEST NAME</label>
          <input
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            placeholder="CASPER Cycle 1 - Spring Cohort"
            value={programName}
            onChange={e => setProgramName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">TEST DESCRIPTION</label>
          <input
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            placeholder="Standard admission process for 2025 entry"
            value={programDescription}
            onChange={e => setProgramDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">TEST TYPE</label>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className={`border rounded-[12px] w-[150px] px-5 py-2 flex items-center gap-2 text-sm ${programType === 'Casper' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setProgramType('Casper')}
            >
              {programType === 'Casper' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              Casper
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-[150px] px-5 py-2 flex items-center gap-2 text-sm ${programType === 'Interview' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setProgramType('Interview')}
            >
              {programType === 'Interview' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              Interview
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-[150px] px-5 py-2 flex items-center gap-2 text-sm ${programType === 'Formative' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setProgramType('Formative')}
            >
              {programType === 'Formative' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              Formative
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Step2({
  source,
  setSource,
  questionType,
  setQuestionType,
  tagInput,
  setTagInput,
  tags,
  setTags,
}: {
  source: string;
  setSource: (v: string) => void;
  questionType: string;
  setQuestionType: (v: string) => void;
  tagInput: string;
  setTagInput: (v: string) => void;
  tags: string[];
  setTags: (v: string[]) => void;
}) {
  const questionTypes = ['Behavioral', 'Technical', 'Situational'];
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xl font-bold mb-2">Question Setup</h3>
      <p className="text-gray-500 mb-6">Define or customize questions for your program</p>
      <div className="flex gap-8">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-2">SELECT SOURCE</label>
          <div className="flex flex-col gap-3">
            {['Internal Questions Bank', 'Mixed', 'Custom Questions'].map(opt => (
              <button
                key={opt}
                type="button"
                className={`border rounded-[12px] px-5 py-3 flex items-center gap-2 text-base text-left ${source === opt ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
                onClick={() => setSource(opt)}
              >
                {source === opt ? (
                  <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                ) : (
                  <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
                )}
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-2">QUESTION TYPE</label>
            <select
              className="w-full border rounded-[12px] px-3 py-2 text-sm"
              value={questionType}
              onChange={e => setQuestionType(e.target.value)}
            >
              {questionTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2">TAGS</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 border rounded-[12px] px-3 py-2 text-sm"
                placeholder="tags"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button type="button" className="text-[#364699] font-semibold" onClick={handleAddTag}>
                Add
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="bg-[#6366f1] text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    className="ml-1 text-white"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({
  timePerQuestion,
  setTimePerQuestion,
  questionOrder,
  setQuestionOrder,
}: {
  timePerQuestion: string;
  setTimePerQuestion: (v: string) => void;
  questionOrder: string;
  setQuestionOrder: (v: string) => void;
}) {
  const timeOptions = ['1 Minute', '2 Minutes', '3 Minutes', '5 Minutes'];
  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-bold mb-2">Time and Flow</h3>
      <p className="text-gray-500 mb-6">Set up the testing schedule and flow for</p>
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">DEFAULT TIME PER QUESTION</label>
        <select
          className="w-full border rounded-[12px] px-3 py-2 text-sm"
          value={timePerQuestion}
          onChange={e => setTimePerQuestion(e.target.value)}
        >
          {timeOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">QUESTION ORDER</label>
        <div className="flex flex-col gap-3">
          {['Linear', 'Randomize'].map(opt => (
            <button
              key={opt}
              type="button"
              className={`border rounded-[12px] px-5 py-3 flex items-center gap-2 text-base text-left ${questionOrder === opt ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setQuestionOrder(opt)}
            >
              {questionOrder === opt ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({
  ratingOption,
  setRatingOption,
  ratingOverride,
  setRatingOverride,
}: {
  ratingOption: string;
  setRatingOption: (v: string) => void;
  ratingOverride: boolean;
  setRatingOverride: (v: boolean) => void;
}) {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-bold mb-2">Rating System</h3>
      <p className="text-gray-500 mb-6">Configure how applicant responses will be rated</p>
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">QUESTION ORDER</label>
        <div className="flex flex-col gap-3">
          {['Enable Ratings', 'Disable Ratings'].map(opt => (
            <button
              key={opt}
              type="button"
              className={`border rounded-[12px] px-5 py-3 flex items-center gap-2 text-base text-left ${ratingOption === opt ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setRatingOption(opt)}
            >
              {ratingOption === opt ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="ratingOverride"
          checked={ratingOverride}
          onChange={e => setRatingOverride(e.target.checked)}
        />
        <label htmlFor="ratingOverride" className="text-sm">
          Enable Rating Overrides
        </label>
      </div>
    </div>
  );
}

function Step5({
  selectedMonth,
  setSelectedMonth,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
}: {
  selectedMonth: string;
  setSelectedMonth: (v: string) => void;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  selectedSlot: string;
  setSelectedSlot: (v: string) => void;
}) {
  const months = ['March 2025', 'April 2025'];
  const dates = [
    { day: 'Mon', date: '11' },
    { day: 'Tue', date: '12' },
    { day: 'Wed', date: '13' },
    { day: 'Thur', date: '15' },
    { day: 'Fri', date: '16' },
    { day: 'Mon', date: '19' },
    { day: 'Tue', date: '20' },
  ];
  const slots = ['7:00 AM - 8:00 AM', '9:00 AM - 10:00 AM', '11:00 AM - 12 PM'];
  return (
    <div className="w-full max-w-xl">
      <h3 className="text-xl font-bold mb-2">Schedule Test Dates & Slots</h3>
      <p className="text-gray-500 mb-6">Set and manage available test dates and time slots</p>
      <div className="mb-6">
        <label className="block text-xs font-semibold mb-2">DATE AND TIME</label>
        <select
          className="border rounded-[12px] px-3 py-2 text-sm mb-4"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mb-4">
          {dates.map(({ day, date }) => (
            <button
              key={date}
              type="button"
              className={`flex flex-col items-center justify-center h-[117px] w-[93px] px-4 py-2 rounded-lg border ${selectedDate === date ? 'border-[#364699] bg-[#f3f4f6] text-[#364699] font-semibold' : 'border-[#e5e7eb] text-[#6b7280]'}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-xs">{day}</span>
              <span className="text-lg font-bold">{date}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-4 mb-4">
          {slots.map(slot => (
            <button
              key={slot}
              type="button"
              className={`px-4 py-2 rounded-[12px] border ${selectedSlot === slot ? 'border-[#364699] bg-[#f3f4f6] text-[#364699] font-semibold' : 'border-[#e5e7eb] text-[#6b7280]'}`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step6({
  inviteType,
  setInviteType,
  group,
  setGroup,
  sendDate,
  setSendDate,
}: {
  inviteType: string;
  setInviteType: (v: string) => void;
  group: string;
  setGroup: (v: string) => void;
  sendDate: string;
  setSendDate: (v: string) => void;
}) {
  const groups = ['Group A', 'Group B', 'Group C'];
  const sendDates = ['Now', 'Tomorrow', 'Next Week'];
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Send Targeted Invitations</h3>
      <p className="text-gray-500 mb-6">Send invitations to specific groups</p>
      <div className="flex gap-8">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-2">INVITE STUDENTS</label>
          <div className="flex flex-col gap-3">
            {['All Students', 'Select Group'].map(opt => (
              <button
                key={opt}
                type="button"
                className={`border rounded-[12px] px-5 py-3 flex items-center gap-2 text-base text-left ${inviteType === opt ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
                onClick={() => setInviteType(opt)}
              >
                {inviteType === opt ? (
                  <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                ) : (
                  <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
                )}
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-2">GROUP</label>
            <select
              className="w-full border rounded-[12px] px-3 py-2 text-sm"
              value={group}
              onChange={e => setGroup(e.target.value)}
              disabled={inviteType !== 'Select Group'}
            >
              {groups.map(g => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2">SEND DATE</label>
            <select
              className="w-full border rounded-[12px] px-3 py-2 text-sm"
              value={sendDate}
              onChange={e => setSendDate(e.target.value)}
            >
              {sendDates.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="bg-[#364699] text-white rounded-full py-2 px-8 font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function AddTestConfigPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [programType, setProgramType] = useState('Casper');
  const [source, setSource] = useState('Internal Questions Bank');
  const [questionType, setQuestionType] = useState('Behavioral');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['tag1', 'tag2']);
  const [timePerQuestion, setTimePerQuestion] = useState('1 Minute');
  const [questionOrder, setQuestionOrder] = useState('Linear');
  const [ratingOption, setRatingOption] = useState('Enable Ratings');
  const [ratingOverride, setRatingOverride] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('March 2025');
  const [selectedDate, setSelectedDate] = useState('11');
  const [selectedSlot, setSelectedSlot] = useState('7:00 AM - 8:00 AM');
  const [inviteType, setInviteType] = useState('All Students');
  const [group, setGroup] = useState('Group A');
  const [sendDate, setSendDate] = useState('Now');

  let stepContent = null;
  if (currentStep === 0)
    stepContent = (
      <Step1
        programName={programName}
        setProgramName={setProgramName}
        programDescription={programDescription}
        setProgramDescription={setProgramDescription}
        programType={programType}
        setProgramType={setProgramType}
      />
    );
  else if (currentStep === 1)
    stepContent = (
      <Step2
        source={source}
        setSource={setSource}
        questionType={questionType}
        setQuestionType={setQuestionType}
        tagInput={tagInput}
        setTagInput={setTagInput}
        tags={tags}
        setTags={setTags}
      />
    );
  else if (currentStep === 2)
    stepContent = (
      <Step3
        timePerQuestion={timePerQuestion}
        setTimePerQuestion={setTimePerQuestion}
        questionOrder={questionOrder}
        setQuestionOrder={setQuestionOrder}
      />
    );
  else if (currentStep === 3)
    stepContent = (
      <Step4
        ratingOption={ratingOption}
        setRatingOption={setRatingOption}
        ratingOverride={ratingOverride}
        setRatingOverride={setRatingOverride}
      />
    );
  else if (currentStep === 4)
    stepContent = (
      <Step5
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />
    );
  else if (currentStep === 5)
    stepContent = (
      <Step6
        inviteType={inviteType}
        setInviteType={setInviteType}
        group={group}
        setGroup={setGroup}
        sendDate={sendDate}
        setSendDate={setSendDate}
      />
    );
  else
    stepContent = (
      <div className="text-center text-gray-400">Step {currentStep + 1} content goes here.</div>
    );

  return (
    <div className="flex min-h-screen bg-[#fafbfc]">
      {/* Left Stepper */}
      <div className="w-[450px] border-r border-[#e5e7eb] py-16 px-10">
        <h2 className="text-[#364699] text-lg font-semibold mb-8">TEST CONFIGURATION</h2>
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
                {idx === 0 && currentStep > 0 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div>{programName}</div>
                      <div className="text-[#6b7280] font-normal">{programType}</div>
                    </div>
                  </div>
                )}
                {idx === 1 && currentStep > 1 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div>{source}</div>
                      <div className="text-[#6b7280] font-normal">{questionType}</div>
                      {tags.length > 0 && (
                        <div className="text-[#6b7280] font-normal mt-1">
                          {tags.map(tag => `#${tag}`).join(' ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {idx === 2 && currentStep > 2 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div>{timePerQuestion}</div>
                      <div className="text-[#6b7280] font-normal">{questionOrder}</div>
                    </div>
                  </div>
                )}
                {idx === 3 && currentStep > 3 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div>{ratingOption}</div>
                      {ratingOverride && (
                        <div className="text-[#6b7280] font-normal">Override Enabled</div>
                      )}
                    </div>
                  </div>
                )}
                {idx === 4 && currentStep > 4 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div>
                        {selectedMonth} {selectedDate}
                      </div>
                      <div className="text-[#6b7280] font-normal">{selectedSlot}</div>
                    </div>
                  </div>
                )}
                {idx === 5 && currentStep > 5 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div>{inviteType}</div>
                      <div className="text-[#6b7280] font-normal">
                        {group} • {sendDate}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Right Form */}
      <div className="flex-1 flex flex-col items-start justify-center w-full px-20">
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
  );
}
