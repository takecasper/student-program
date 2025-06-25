import React from 'react';

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

export default function TestConfigPage() {
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold mb-1 ${idx === 0 ? 'bg-[#3b82f6]' : 'bg-[#e5e7eb] text-[#364699]'}`}
                >
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && <div className="w-px flex-1 bg-[#e5e7eb]" />}
              </div>
              <div>
                <div
                  className={`font-semibold text-[15px] ${idx === 0 ? 'text-[#364699]' : 'text-[#6b7280]'}`}
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
      <div className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="bg-white rounded-lg shadow p-10 w-[500px]">
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
            <button
              type="submit"
              className="mt-6 w-full bg-[#364699] text-white rounded-full py-2 font-semibold"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
