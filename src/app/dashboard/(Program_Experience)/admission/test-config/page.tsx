'use client';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

const steps = [
  {
    title: 'Step 1: Program Setup',
    description: 'Provide basic information to create your program',
  },
  {
    title: 'Step 2: Distribution Classification',
    description: 'Define how test results are categorized and distributed',
  },
  {
    title: 'Step 3: Score Delivery Settings',
    description: 'Manage the delivery options for applicant scores',
  },
  {
    title: 'Step 4: French Language Support',
    description: 'Manage settings for French language test support',
  },
  {
    title: 'Step 5: Fee Waiver Configuration',
    description: 'Configure rules and options for fee waivers',
  },
];

const TEST_TYPES = ['SAT', 'ACT', 'AP Exams', 'GRE'];

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
      <h3 className="text-xl font-bold mb-2">Program Setup</h3>
      <p className="text-gray-500 mb-6">Provide basic information to create your program</p>
      <form className="space-y-5">
        <div>
          <label className="block text-xs font-semibold mb-1">PROGRAM NAME</label>
          <input
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            placeholder="CASPER Cycle 1 - Spring Cohort"
            value={programName}
            onChange={e => setProgramName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">PROGRAM DESCRIPTION</label>
          <input
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            placeholder="Standard admission process for 2025 entry"
            value={programDescription}
            onChange={e => setProgramDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">PROGRAM TYPE</label>
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
  selectedOption,
  setSelectedOption,
  selectedTestTypes,
  setSelectedTestTypes,
  selectedDate,
  setSelectedDate,
}: {
  selectedOption: string;
  setSelectedOption: (v: string) => void;
  selectedTestTypes: string[];
  setSelectedTestTypes: (v: string[]) => void;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
}) {
  const handleCheckbox = (test: string) => {
    if (selectedTestTypes.includes(test)) {
      setSelectedTestTypes(selectedTestTypes.filter(t => t !== test));
    } else {
      setSelectedTestTypes([...selectedTestTypes, test]);
    }
  };
  return (
    <>
      <h3 className="text-xl font-bold mb-2">Distribution Classification</h3>
      <p className="text-gray-500 mb-6">Define how test results are categorized and distributed</p>
      <div className="flex flex-col gap-3 mb-4">
        <button
          type="button"
          className={`border rounded-[12px] w-[309px] px-5 py-3 flex items-center gap-2 text-base ${selectedOption === 'display' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setSelectedOption('display')}
        >
          {selectedOption === 'display' ? (
            <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </span>
          ) : (
            <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
          )}
          Display All Test Options
        </button>
        <button
          type="button"
          className={`border rounded-[12px] w-[309px] px-5 py-3 flex items-center gap-2 text-base ${selectedOption === 'custom' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setSelectedOption('custom')}
        >
          {selectedOption === 'custom' ? (
            <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </span>
          ) : (
            <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
          )}
          Set Custom Visibility Rules
        </button>
      </div>
      {selectedOption === 'custom' && (
        <div className="mt-4">
          <div className="mb-4">
            <div className="text-xs font-semibold mb-2 text-[#6b7280]">FILTER BY TEST TYPE</div>
            <div className="flex flex-col gap-2">
              {TEST_TYPES.map(test => (
                <label key={test} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedTestTypes.includes(test)}
                    onChange={() => handleCheckbox(test)}
                  />
                  {test}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs font-semibold mb-2 text-[#6b7280]">FILTER BY DATE</div>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              placeholder="Date Picker"
            />
          </div>
        </div>
      )}
    </>
  );
}

function Step3({
  idName,
  setIdName,
  idFormat,
  setIdFormat,
  deliveryFormat,
  setDeliveryFormat,
  apiUrl,
  setApiUrl,
  authMethods,
  setAuthMethods,
}: {
  idName: string;
  setIdName: (v: string) => void;
  idFormat: string;
  setIdFormat: (v: string) => void;
  deliveryFormat: string;
  setDeliveryFormat: (v: string) => void;
  apiUrl: string;
  setApiUrl: (v: string) => void;
  authMethods: string[];
  setAuthMethods: (v: string[]) => void;
}) {
  const DELIVERY_FORMATS = [
    { label: 'API Delivery', value: 'api' },
    { label: 'Manual CSV Export', value: 'csv' },
    { label: 'Email PDF', value: 'pdf' },
  ];
  const AUTH_OPTIONS = [
    { label: 'Bearer Token', value: 'bearer' },
    { label: 'OAuth 2.0', value: 'oauth' },
    { label: 'API Key', value: 'apikey' },
  ];
  const handleAuth = (val: string) => {
    if (authMethods.includes(val)) {
      setAuthMethods(authMethods.filter(a => a !== val));
    } else {
      setAuthMethods([...authMethods, val]);
    }
  };
  return (
    <>
      <h3 className="text-xl font-bold mb-2">Score Delivery Settings</h3>
      <p className="text-gray-500 mb-6">Set up the testing schedule and flow</p>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">ID NAME</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="CASPER Cycle 1 - Spring Cohort"
            value={idName}
            onChange={e => setIdName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">ID FORMAT (REGEX)</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="^[A-Z]{2}\d{5}"
            value={idFormat}
            onChange={e => setIdFormat(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">DELIVERY FORMAT</label>
          <div className="flex flex-col gap-2 mt-2">
            {DELIVERY_FORMATS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`border rounded-[12px] w-[309px] px-5 py-2 flex items-center gap-2 text-sm ${deliveryFormat === opt.value ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
                onClick={() => setDeliveryFormat(opt.value)}
              >
                {deliveryFormat === opt.value ? (
                  <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                ) : (
                  <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
                )}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">API DELIVERY SET UP</label>
          <div className="flex gap-2 items-center mb-2">
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="https://api.yourschool.edu/scores"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
            />
            <button
              type="button"
              className="text-[#364699] text-xs font-semibold border border-[#364699] rounded px-2 py-1 ml-2"
            >
              Test
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1"></div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">AUTHENTICATION METHOD</label>
          <div className="flex flex-col gap-2 mt-2">
            {AUTH_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={authMethods.includes(opt.value)}
                  onChange={() => handleAuth(opt.value)}
                />
                {opt.label}
                {opt.value === 'bearer' && (
                  <span className="ml-2 text-[#6b7280] text-xs font-mono">••••••••</span>
                )}
                {opt.value === 'bearer' && (
                  <button type="button" className="ml-2 text-xs text-[#364699] underline">
                    Regenerate
                  </button>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Step4({
  frenchSupport,
  setFrenchSupport,
}: {
  frenchSupport: string;
  setFrenchSupport: (v: string) => void;
}) {
  return (
    <>
      <h3 className="text-xl font-bold mb-2">French Language Support</h3>
      <p className="text-gray-500 mb-6">Manage settings for French language test support</p>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className={`border rounded-[12px] w-[309px] px-5 py-3 flex items-center gap-2 text-base ${frenchSupport === 'yes' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setFrenchSupport('yes')}
        >
          {frenchSupport === 'yes' ? (
            <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </span>
          ) : (
            <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
          )}
          Yes
        </button>
        <button
          type="button"
          className={`border rounded-[12px] w-[309px] px-5 py-3 flex items-center gap-2 text-base ${frenchSupport === 'no' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setFrenchSupport('no')}
        >
          {frenchSupport === 'no' ? (
            <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </span>
          ) : (
            <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
          )}
          No
        </button>
      </div>
    </>
  );
}

function Step5({
  waiverIdName,
  setWaiverIdName,
  waiverStartDate,
  setWaiverStartDate,
  waiverEndDate,
  setWaiverEndDate,
  waiverMaxUses,
  setWaiverMaxUses,
  eligibleType,
  setEligibleType,
  eligibleGroups,
  setEligibleGroups,
  testType,
  setTestType,
  testGroups,
  setTestGroups,
}: {
  waiverIdName: string;
  setWaiverIdName: (v: string) => void;
  waiverStartDate: string;
  setWaiverStartDate: (v: string) => void;
  waiverEndDate: string;
  setWaiverEndDate: (v: string) => void;
  waiverMaxUses: string;
  setWaiverMaxUses: (v: string) => void;
  eligibleType: string;
  setEligibleType: (v: string) => void;
  eligibleGroups: string[];
  setEligibleGroups: (v: string[]) => void;
  testType: string;
  setTestType: (v: string) => void;
  testGroups: string[];
  setTestGroups: (v: string[]) => void;
}) {
  const groupOptions = ['Group 1', 'Group 2'];
  const testOptions = ['SAT', 'ACT', 'AP ENGLISH'];
  const handleGroup = (g: string) => {
    if (eligibleGroups.includes(g)) setEligibleGroups(eligibleGroups.filter(x => x !== g));
    else setEligibleGroups([...eligibleGroups, g]);
  };
  const handleTest = (t: string) => {
    if (testGroups.includes(t)) setTestGroups(testGroups.filter(x => x !== t));
    else setTestGroups([...testGroups, t]);
  };
  return (
    <>
      <h3 className="text-xl font-bold mb-2">Fee Waiver Configuration</h3>
      <p className="text-gray-500 mb-6">Configure rules and options for fee waivers</p>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">ID NAME</label>
          <div className="flex gap-2 items-center">
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={waiverIdName}
              onChange={e => setWaiverIdName(e.target.value)}
              placeholder="SUMMER2025"
            />
            <button
              type="button"
              className="text-[#364699] text-xs font-semibold border border-[#364699] rounded px-2 py-1 ml-2"
            >
              Generate
            </button>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">VALIDITY PERIOD</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="border rounded px-3 py-2 text-sm w-full"
              value={waiverStartDate}
              onChange={e => setWaiverStartDate(e.target.value)}
            />
            <span className="text-[#6b7280] px-1">-</span>
            <input
              type="date"
              className="border rounded px-3 py-2 text-sm w-full"
              value={waiverEndDate}
              onChange={e => setWaiverEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1">MAX USES</label>
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={waiverMaxUses}
          onChange={e => setWaiverMaxUses(e.target.value)}
          placeholder="250"
        />
      </div>
      <hr className="my-4" />
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">ELIGIBLE STUDENTS</label>
          <div className="flex flex-col gap-2 mt-2">
            <button
              type="button"
              className={`border rounded-[12px] w-[309px] px-5 py-2 flex items-center gap-2 text-sm ${eligibleType === 'all' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setEligibleType('all')}
            >
              {eligibleType === 'all' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              All Applicants
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-[309px] px-5 py-2 flex items-center gap-2 text-sm ${eligibleType === 'group' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setEligibleType('group')}
            >
              {eligibleType === 'group' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              Specific Group
            </button>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">SPECIFIC GROUP</label>
          <div className="flex flex-col gap-2 mt-2">
            {groupOptions.map(g => (
              <label key={g} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={eligibleGroups.includes(g)}
                  onChange={() => handleGroup(g)}
                  disabled={eligibleType !== 'group'}
                />
                {g}
              </label>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">APPLICABLE TEST</label>
          <div className="flex flex-col gap-2 mt-2">
            <button
              type="button"
              className={`border rounded-[12px] w-[309px] px-5 py-2 flex items-center gap-2 text-sm ${testType === 'all' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setTestType('all')}
            >
              {testType === 'all' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              All TEST
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-[309px] px-5 py-2 flex items-center gap-2 text-sm ${testType === 'specific' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setTestType('specific')}
            >
              {testType === 'specific' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              Specific TEST
            </button>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">SPECIFIC TEST</label>
          <div className="flex flex-col gap-2 mt-2">
            {testOptions.map(t => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={testGroups.includes(t)}
                  onChange={() => handleTest(t)}
                  disabled={testType !== 'specific'}
                />
                {t}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function StepPlaceholder({ step }: { step: number }) {
  return <div className="text-center text-gray-400">Step {step + 1} content goes here.</div>;
}

export default function TestConfigPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState('display');
  const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  // Step 3 state
  const [idName, setIdName] = useState('CASPER Cycle 1 - Spring Cohort');
  const [idFormat, setIdFormat] = useState('^[A-Z]{2}\d{5}');
  const [deliveryFormat, setDeliveryFormat] = useState('api');
  const [apiUrl, setApiUrl] = useState('https://api.yourschool.edu/scores');
  const [authMethods, setAuthMethods] = useState<string[]>([]);
  const [frenchSupport, setFrenchSupport] = useState('yes');
  // Step 1 state
  const [programName, setProgramName] = useState('CASPER Cycle 1 - Spring Cohort');
  const [programDescription, setProgramDescription] = useState(
    'Standard admission process for 2025 entry',
  );
  const [programType, setProgramType] = useState('Casper');
  const [waiverIdName, setWaiverIdName] = useState('SUMMER2025');
  const [waiverStartDate, setWaiverStartDate] = useState('');
  const [waiverEndDate, setWaiverEndDate] = useState('');
  const [waiverMaxUses, setWaiverMaxUses] = useState('250');
  const [eligibleType, setEligibleType] = useState('all');
  const [eligibleGroups, setEligibleGroups] = useState<string[]>([]);
  const [testType, setTestType] = useState('all');
  const [testGroups, setTestGroups] = useState<string[]>([]);

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
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedTestTypes={selectedTestTypes}
        setSelectedTestTypes={setSelectedTestTypes}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    );
  else if (currentStep === 2)
    stepContent = (
      <Step3
        idName={idName}
        setIdName={setIdName}
        idFormat={idFormat}
        setIdFormat={setIdFormat}
        deliveryFormat={deliveryFormat}
        setDeliveryFormat={setDeliveryFormat}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        authMethods={authMethods}
        setAuthMethods={setAuthMethods}
      />
    );
  else if (currentStep === 3)
    stepContent = <Step4 frenchSupport={frenchSupport} setFrenchSupport={setFrenchSupport} />;
  else if (currentStep === 4)
    stepContent = (
      <Step5
        waiverIdName={waiverIdName}
        setWaiverIdName={setWaiverIdName}
        waiverStartDate={waiverStartDate}
        setWaiverStartDate={setWaiverStartDate}
        waiverEndDate={waiverEndDate}
        setWaiverEndDate={setWaiverEndDate}
        waiverMaxUses={waiverMaxUses}
        setWaiverMaxUses={setWaiverMaxUses}
        eligibleType={eligibleType}
        setEligibleType={setEligibleType}
        eligibleGroups={eligibleGroups}
        setEligibleGroups={setEligibleGroups}
        testType={testType}
        setTestType={setTestType}
        testGroups={testGroups}
        setTestGroups={setTestGroups}
      />
    );
  else stepContent = <StepPlaceholder step={currentStep} />;

  return (
    <div className="flex min-h-screen bg-[#fafbfc]">
      {/* Left Stepper */}
      <div className="w-[450px] border-r border-[#e5e7eb] py-16 px-10">
        <h2 className="text-[#364699] text-lg font-semibold mb-8">PROGRAM CONFIGURATION</h2>
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
                      {selectedOption === 'display'
                        ? 'Display All Test Options'
                        : 'Custom Visibility Rules'}
                      {selectedOption === 'custom' && selectedTestTypes.length > 0 && (
                        <div className="text-[#6b7280] font-normal mt-1">
                          {selectedTestTypes.join(', ')}
                        </div>
                      )}
                      {selectedOption === 'custom' && selectedDate && (
                        <div className="text-[#6b7280] font-normal">Date: {selectedDate}</div>
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
                      <div>{idFormat}</div>
                      <div className="text-[#6b7280] font-normal">
                        {deliveryFormat === 'api'
                          ? 'API Delivery'
                          : deliveryFormat === 'csv'
                            ? 'Manual CSV Export'
                            : 'Email PDF'}
                      </div>
                      {authMethods.length > 0 && (
                        <div className="text-[#6b7280] font-normal">
                          {authMethods
                            .map(a =>
                              a === 'bearer'
                                ? 'Bearer Token'
                                : a === 'oauth'
                                  ? 'OAuth 2.0'
                                  : 'API Key',
                            )
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {idx === 3 && currentStep > 3 && (
                  <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                    <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    {frenchSupport === 'yes' ? 'Yes' : 'No'}
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
        {/* {currentStep === steps.length - 1 && (
          <div className="mt-8 text-center text-[#364699] font-semibold">
            Configuration Complete!
          </div>
        )} */}
      </div>
    </div>
  );
}
