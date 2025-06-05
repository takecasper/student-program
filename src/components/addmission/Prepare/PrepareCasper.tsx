interface PrepareCasperProps {
  setState: (state: 'prepare' | 'check') => void;
}

export default function PrepareCasper({ setState }: PrepareCasperProps) {
  return (
    <div className=" bg-white space-y-6 text-gray-800 shrink-0 pt-[60px]">
      <h1 className="text-xl font-semibold">How to Prepare for Casper</h1>
      <p className="text-sm text-gray-600">
        Please use the items listed below as guidance to help you prepare for your Casper test, we
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
              <h3 className="font-medium">Step 1: Review Test Tips</h3>
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
              <h3 className="font-medium">Step 2: System Requirement Check</h3>
              <p className="text-sm text-gray-600">
                Perform a mandatory system requirements check in your intended test environment in
                the days leading up to your test.
              </p>
              <button
                onClick={() => setState('check')}
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
              <h3 className="font-medium">Step 3: Start Casper Practice Test</h3>
              <p className="text-sm text-gray-600">
                Try the Casper Practice Test in your test format
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
