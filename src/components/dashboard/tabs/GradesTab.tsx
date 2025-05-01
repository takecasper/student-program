import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function GradesTab() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        {/* Grades Table with ScrollArea */}
        <Card className="border-none shadow-none bg-white">
          <CardContent className="p-0">
            <div className="w-full">
              {/* Fixed Table Header */}
              <div className="grid grid-cols-5 border-b border-[#f5f5f5] py-3 sticky top-0 bg-white z-10">
                <div className="text-[#333333] font-medium pl-4">Subjects</div>
                <div className="text-[#333333] font-medium text-center">1st Year</div>
                <div className="text-[#333333] font-medium text-center">2nd Year</div>
                <div className="text-[#333333] font-medium text-center">3rd Year</div>
                <div className="text-[#333333] font-medium text-center">4th Year</div>
              </div>

              {/* Scrollable Table Body */}
              <ScrollArea className="h-[400px]">
                <div className="min-w-full">
                  {/* Table Rows */}
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-5 border-b border-[#f5f5f5] py-4">
                      <div className="flex items-center gap-3 pl-4">
                        <div className="w-8 h-8 rounded-full bg-[#f5f5f5]"></div>
                        <div>
                          <p className="text-sm font-medium text-[#333333]">Women&apos;s Health</p>
                          <p className="text-xs text-[#6c6c6c]">January 10, 2025</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">88.00</span>
                          <button className="text-[#6c6c6c]">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">82.00</span>
                          <button className="text-[#6c6c6c]">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">88.00</span>
                          <button className="text-[#6c6c6c]">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">88.00</span>
                          <button className="text-[#6c6c6c]">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Overall Grade Row */}
                  <div className="grid grid-cols-5 py-4 sticky bottom-0 bg-white border-t border-[#f5f5f5]">
                    <div className="flex items-center pl-4">
                      <p className="text-sm font-medium text-[#333333]">Overall Grade</p>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">88.00</span>
                        <button className="text-[#6c6c6c]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">82.00</span>
                        <button className="text-[#6c6c6c]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">88.00</span>
                        <button className="text-[#6c6c6c]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">88.00</span>
                        <button className="text-[#6c6c6c]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Character Traits Card */}
        <Card className="border border-[#f5f5f5] shadow-none h-fit">
          <CardContent className="p-6">
            <h3 className="text-[#333333] font-medium mb-6">Character Traits</h3>

            <div className="space-y-6">
              {/* Leadership */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#333333]">Leadership</span>
                </div>
                <div className="h-2 w-full bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ffd87c] rounded-full" style={{ width: '70%' }}>
                    <span className="sr-only">70%</span>
                  </div>
                </div>
              </div>

              {/* Self-Awareness */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#333333]">Self-Awareness</span>
                </div>
                <div className="h-2 w-full bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00a59b] rounded-full" style={{ width: '90%' }}>
                    <span className="sr-only">90%</span>
                  </div>
                </div>
              </div>

              {/* Collaboration */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#333333]">Collaboration</span>
                </div>
                <div className="h-2 w-full bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#fa8d8f] rounded-full" style={{ width: '40%' }}>
                    <span className="sr-only">40%</span>
                  </div>
                </div>
              </div>

              {/* Communication */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#333333]">Communication</span>
                </div>
                <div className="h-2 w-full bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00a59b] rounded-full" style={{ width: '90%' }}>
                    <span className="sr-only">90%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
