import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

import { cn } from '@/lib/utils';

// Mock data for standard questions
const standardQuestions = [
  { id: 1, time: '2:00 min', question: 'How are you today?' },
  { id: 2, time: '2:00 min', question: 'How are you today?' },
  { id: 3, time: '2:00 min', question: 'How are you today?' },
  { id: 4, time: '2:00 min', question: 'How are you today?' },
  { id: 5, time: '2:00 min', question: 'How are you today?' },
  { id: 6, time: '2:00 min', question: 'How are you today?' },
  { id: 7, time: '2:00 min', question: 'How are you today?' },
  { id: 8, time: '2:00 min', question: 'How are you today?' },
];

const EnrollForm = () => {
  const [selectedTest, setSelectedTest] = useState<'CASPER' | 'SNAPSHOT'>('CASPER');
  const [selectedTab, setSelectedTab] = useState<'QUESTION_BANK' | 'TIMING_FLOW'>('QUESTION_BANK');

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <Button
          variant={selectedTest === 'CASPER' ? 'default' : 'outline'}
          className={cn(
            'h-[30px] hover:bg-[#364699] cursor-pointer hover:text-white rounded-full px-6',
            {
              'bg-[#364699] text-white': selectedTest === 'CASPER',
            },
          )}
          onClick={() => setSelectedTest('CASPER')}
        >
          CASPER
        </Button>
        <Button
          variant={selectedTest === 'SNAPSHOT' ? 'default' : 'outline'}
          className={cn(
            'h-[30px] hover:bg-[#364699] cursor-pointer hover:text-white rounded-full px-6',
            {
              'bg-[#364699] text-white': selectedTest === 'SNAPSHOT',
            },
          )}
          onClick={() => setSelectedTest('SNAPSHOT')}
        >
          SNAPSHOT
        </Button>
      </div>

      {selectedTest === 'CASPER' ? (
        <>
          {/* Program selection */}
          <div className="space-y-2 mb-5">
            <label className="mb-1 font-normat text-[#333333DE] ext-sm font-medium">
              Select program to have access to {selectedTest} Test
            </label>
            <Input className="h-[44px]" placeholder="Program name..." />
          </div>

          {/* Time restriction */}
          <div className="space-y-2">
            <label className="mb-1 font-normat text-[#333333DE] ext-sm font-medium">
              Set a time when applicant will stop apply
            </label>
            <Input className="h-[44px]" type="datetime-local" />
          </div>
        </>
      ) : (
        <div className="h-[calc(100vh-250px)] overflow-y-auto">
          {/* Snapshot Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setSelectedTab('QUESTION_BANK')}
              className={cn('px-4 py-2 text-sm font-medium', {
                'text-[#364699] border-b-2 border-[#364699]': selectedTab === 'QUESTION_BANK',
                'text-gray-500': selectedTab !== 'QUESTION_BANK',
              })}
            >
              Question Bank
            </button>
            <button
              onClick={() => setSelectedTab('TIMING_FLOW')}
              className={cn('px-4 py-2 text-sm font-medium', {
                'text-[#364699] border-b-2 border-[#364699]': selectedTab === 'TIMING_FLOW',
                'text-gray-500': selectedTab !== 'TIMING_FLOW',
              })}
            >
              Timing & Flow
            </button>
          </div>

          {selectedTab === 'QUESTION_BANK' ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#333333DE]">Question Source</h3>
                <RadioGroup defaultValue="standard" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-[#333333DE]">
                      Use Snapshot Standard Question Bank
                    </Label>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/svgs/pencil.svg"
                        alt="pencil"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                      <RadioGroupItem value="standard" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-[#333333DE]">
                      Upload Program-Specific Questions
                    </Label>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/svgs/pencil.svg"
                        alt="pencil"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                      <RadioGroupItem value="program" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-[#333333DE]">
                      Mix of Snapshot + Program Questions
                    </Label>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/svgs/pencil.svg"
                        alt="pencil"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                      <RadioGroupItem value="mix" />
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#333333DE]">Question Types</h3>
                <p className="text-xs text-gray-500">All answers will be video recordings</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#333333DE]">Video Scenario-Based</span>
                    <Button
                      variant="outline"
                      className="rounded-full px-6 bg-[#364699] text-white hover:bg-[#364699]/90"
                    >
                      Selected
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#333333DE]">Custom Prompt</span>
                    <Button variant="outline" className="rounded-full px-6">
                      Select
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#333333DE]">Question Randomization</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#333333DE]">Random</span>
                    <Button
                      variant="outline"
                      className="rounded-full px-6 bg-[#364699] text-white hover:bg-[#364699]/90"
                    >
                      Selected
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#333333DE]">Fixed</span>
                    <Button variant="outline" className="rounded-full px-6">
                      Select
                    </Button>
                  </div>
                </div>
              </div>

              {/* Standard Question Bank */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#333333DE]">STANDARD QUESTION BANK</h3>
                <div className="space-y-2">
                  {standardQuestions.map(q => (
                    <div key={q.id} className="border-b border-[#F5F5F5] pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[#364699] text-sm font-medium">Question {q.id}</h4>
                          <div className="text-xs text-gray-500">{q.time}</div>
                          <p className="text-sm text-[#333333DE] mt-1">{q.question}</p>
                        </div>
                        {[1, 2, 5, 8].includes(q.id) && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-1">
                            <Image
                              src="/svgs/warning.svg"
                              alt="warning"
                              width={18}
                              height={18}
                              className="text-red-500"
                            />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label className="text-sm text-[#333333DE]">Thinking Time per Question</Label>
                    <p className="text-xs text-gray-500">(0-2 min range)</p>
                  </div>
                  <Select defaultValue="0">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0:00 min</SelectItem>
                      <SelectItem value="30">0:30 min</SelectItem>
                      <SelectItem value="60">1:00 min</SelectItem>
                      <SelectItem value="90">1:30 min</SelectItem>
                      <SelectItem value="120">2:00 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label className="text-sm text-[#333333DE]">Response Time per Question</Label>
                    <p className="text-xs text-gray-500">(1-5 min range)</p>
                  </div>
                  <Select defaultValue="120">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">1:00 min</SelectItem>
                      <SelectItem value="120">2:00 min</SelectItem>
                      <SelectItem value="180">3:00 min</SelectItem>
                      <SelectItem value="240">4:00 min</SelectItem>
                      <SelectItem value="300">5:00 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label className="text-sm text-[#333333DE]">Time Between Questions</Label>
                    <p className="text-xs text-gray-500">(0-60 min range)</p>
                  </div>
                  <Select defaultValue="15">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 sec</SelectItem>
                      <SelectItem value="30">30 sec</SelectItem>
                      <SelectItem value="45">45 sec</SelectItem>
                      <SelectItem value="60">60 sec</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[#333333DE]">Pause/Break Options</h3>
                  <RadioGroup defaultValue="no_breaks" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-[#333333DE]">No Breaks</Label>
                      <RadioGroupItem value="no_breaks" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-[#333333DE]">
                        Optional short break between questions
                      </Label>
                      <RadioGroupItem value="short_breaks" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-[#333333DE]">
                        One-time mid-assessment pause
                      </Label>
                      <RadioGroupItem value="mid_pause" />
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrollForm;
