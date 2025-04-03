"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";

export default function GradesTabContent() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Function to handle row click
  const handleRowClick = (courseName: string) => {
    setSelectedCourse(courseName);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="w-full">
      {/* Overall Grade Display */}
      <div className="mb-6 text-center">
        <span className="text-[#333333] mr-2">Overall Grade:</span>
        <span className="text-[#00a59b] font-bold">83.00</span>
      </div>

      <div
        className={`grid grid-cols-1 ${
          selectedCourse ? "md:grid-cols-[1fr_350px]" : "md:grid-cols-[1fr_300px]"
        } gap-6`}
      >
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
                    <div
                      key={index}
                      className={`grid grid-cols-5 border-b border-[#f5f5f5] py-4 cursor-pointer hover:bg-[#f5f5f5] transition-colors ${
                        index === 0 && selectedCourse === "Women's Health" ? "bg-[#f5f5f5]" : ""
                      }`}
                      onClick={() => (index === 0 ? handleRowClick("Women's Health") : null)}
                    >
                      <div className="flex items-center gap-3 pl-4">
                        <div className="w-8 h-8 rounded-full bg-[#f5f5f5]"></div>
                        <div>
                          <p className="text-sm font-medium text-[#333333]">
                            {index === 0 ? "Women's Health" : `Subject ${index + 1}`}
                          </p>
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

        {selectedCourse ? (
          <Card className="border border-[#f5f5f5] shadow-none h-fit">
            <CardContent className="p-0 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={closeSidebar}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="p-4 border-b border-[#f5f5f5]">
                <div className="flex items-center gap-2 text-xs text-[#6c6c6c] mb-1">
                  <Clock className="h-3 w-3" />
                  <span>Jan 28, 2025 - Feb 2, 2025</span>
                </div>
                <h2 className="text-lg font-medium text-[#333333]">Women&apos;s Health</h2>
              </div>

              <div className="relative h-[180px] bg-[#6a6eec] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="#6a6eec" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex border-b border-[#f5f5f5]">
                <Button variant="ghost" className="flex-1 py-3 rounded-none border-b-2 border-[#364699]">
                  INFO & OBJECTIVE
                </Button>
                <Button variant="ghost" className="flex-1 py-3 rounded-none">
                  SESSION
                </Button>
                <Button variant="ghost" className="flex-1 py-3 rounded-none">
                  GRADES
                </Button>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-[#333333] mb-4">GENERAL INFO</h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 items-center">
                    <p className="text-sm text-[#6c6c6c]">Runs From:</p>
                    <p className="text-sm">Jan 28, 2025 - Feb 2, 2025</p>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <p className="text-sm text-[#6c6c6c]">Facilitators:</p>
                    <p className="text-sm">None</p>
                  </div>

                  <div className="grid grid-cols-2 items-center">
                    <p className="text-sm text-[#6c6c6c]">Grad Year:</p>
                    <p className="text-sm">2026</p>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-[#333333] mt-6 mb-4">COURSE OBJECTIVE (5)</h3>

                <div className="flex items-start gap-2 text-sm">
                  <div className="min-w-5 h-5 rounded-full bg-[#00a59b] flex items-center justify-center mt-0.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p>
                    To perform a comprehensive history and physical examination with special emphasis on
                    mental status, mobility, medications and functional status.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
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
                    <div className="h-full bg-[#ffd87c] rounded-full" style={{ width: "70%" }}>
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
                    <div className="h-full bg-[#00a59b] rounded-full" style={{ width: "90%" }}>
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
                    <div className="h-full bg-[#fa8d8f] rounded-full" style={{ width: "40%" }}>
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
                    <div className="h-full bg-[#00a59b] rounded-full" style={{ width: "90%" }}>
                      <span className="sr-only">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
