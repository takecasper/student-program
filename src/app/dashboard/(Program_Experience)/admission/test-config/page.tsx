'use client';
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

function Step1() {
  return (
    <>
      <h3 className="text-xl font-bold mb-2">Program Setup</h3>
      <p className="text-gray-500 mb-6">Provide basic information to create your program</p>
      <form className="space-y-5">
        <div>
          <label className="block text-xs font-semibold mb-1">PROGRAM NAME</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="CASPER Cycle 1 - Spring Cohort"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">PROGRAM DESCRIPTION</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Standard admission process for 2025 entry"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">PROGRAM TYPE</label>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="border rounded-full px-5 py-2 flex items-center gap-2 text-sm bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold"
            >
              Casper
            </button>
            <button
              type="button"
              className="border rounded-full px-5 py-2 flex items-center gap-2 text-sm text-[#6b7280] border-[#e5e7eb]"
            >
              Interview
            </button>
            <button
              type="button"
              className="border rounded-full px-5 py-2 flex items-center gap-2 text-sm text-[#6b7280] border-[#e5e7eb]"
            >
              Formative
            </button>
          </div>
        </div>
      </form>
    </>
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
          className={`border rounded px-5 py-3 flex items-center gap-2 text-base ${selectedOption === 'display' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setSelectedOption('display')}
        >
          Display All Test Options
        </button>
        <button
          type="button"
          className={`border rounded px-5 py-3 flex items-center gap-2 text-base ${selectedOption === 'custom' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setSelectedOption('custom')}
        >
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
                className={`border rounded px-5 py-2 flex items-center gap-2 text-sm ${deliveryFormat === opt.value ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
                onClick={() => setDeliveryFormat(opt.value)}
              >
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
          className={`border rounded px-5 py-3 flex items-center gap-2 text-base ${frenchSupport === 'yes' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setFrenchSupport('yes')}
        >
          Yes
        </button>
        <button
          type="button"
          className={`border rounded px-5 py-3 flex items-center gap-2 text-base ${frenchSupport === 'no' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
          onClick={() => setFrenchSupport('no')}
        >
          No
        </button>
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

  let stepContent = null;
  if (currentStep === 0) stepContent = <Step1 />;
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
  else stepContent = <StepPlaceholder step={currentStep} />;

  return (
    <div className="flex min-h-screen bg-[#fafbfc]">
      {/* Left Stepper */}
      <div className="w-[350px] border-r border-[#e5e7eb] py-16 px-10">
        <h2 className="text-[#364699] text-lg font-semibold mb-8">PROGRAM CONFIGURATION</h2>
        <ol className="space-y-6">
          {steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold mb-1
                    ${idx < currentStep ? 'bg-[#364699]' : idx === currentStep ? 'bg-[#3b82f6]' : 'bg-[#e5e7eb] text-[#364699]'}
                  `}
                >
                  {idx < currentStep ? <span className="text-lg">✓</span> : idx + 1}
                </div>
                {idx < steps.length - 1 && <div className="w-px flex-1 bg-[#e5e7eb]" />}
              </div>
              <div>
                <div
                  className={`font-semibold text-[15px] ${idx === currentStep ? 'text-[#364699]' : 'text-[#6b7280]'}`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-[#9ca3af]">{step.description}</div>
                {idx === 0 && currentStep > 0 && (
                  <div className="mt-2 bg-white border rounded px-3 py-2 text-[#364699] text-sm font-semibold flex items-center gap-2">
                    ✓ CASPER Cycle 1 - Spring Cohort
                  </div>
                )}
                {idx === 1 && currentStep > 1 && selectedOption === 'custom' && (
                  <div className="mt-2 bg-white border rounded px-3 py-2 text-[#364699] text-sm font-semibold">
                    {selectedTestTypes.length > 0 && (
                      <div className="mb-1">{selectedTestTypes.join(', ')}</div>
                    )}
                    {selectedDate && <div>Date: {selectedDate}</div>}
                  </div>
                )}
                {idx === 2 && currentStep > 2 && (
                  <div className="mt-2 bg-white border rounded px-3 py-2 text-[#364699] text-sm font-semibold">
                    {idName && <div className="mb-1">{idName}</div>}
                    {deliveryFormat && (
                      <div className="mb-1">
                        Delivery:{' '}
                        {deliveryFormat === 'api'
                          ? 'API Delivery'
                          : deliveryFormat === 'csv'
                            ? 'Manual CSV Export'
                            : 'Email PDF'}
                      </div>
                    )}
                    {authMethods.length > 0 && (
                      <div>
                        Auth:{' '}
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
                )}
                {idx === 3 && currentStep > 3 && (
                  <div className="mt-2 bg-white border rounded px-3 py-2 text-[#364699] text-sm font-semibold">
                    {frenchSupport === 'yes' ? 'French Support: Yes' : 'French Support: No'}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Right Form */}
      <div className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="bg-white rounded-lg shadow p-10 w-[500px] min-h-[350px] flex flex-col justify-between">
          {stepContent}
          {currentStep < steps.length - 1 && (
            <button
              className="mt-8 w-full bg-[#364699] text-white rounded-full py-2 font-semibold"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <div className="mt-8 text-center text-[#364699] font-semibold">
              Configuration Complete!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
