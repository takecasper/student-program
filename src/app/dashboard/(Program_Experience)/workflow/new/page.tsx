/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import PlusIcon from '../../../../../../public/svgs/add-workflow.svg';
import SplitIcon from '../../../../../../public/svgs/select-workflow.svg';
import ToggleIcon from '../../../../../../public/svgs/toggle-workflow.svg';

const maxChars = 2000;

const whenOptions = ['Patient', 'Appointment Status', 'Operation', 'Study'];
const changedToOptions = [
  'Arrived',
  'No Show',
  'Requested',
  'Scheduled',
  'Confirmed',
  'Cancelled',
  'Ready  for Scan',
];
const actionOptions = [
  'Change Study',
  'Send Message',
  'Send Notification',
  'Send Email',
  'Assign',
  'Unassign',
  'Send Reminder',
];

const NewWorkFlowPage = () => {
  const [action, setAction] = useState('');
  const [formValues, setFormValues] = useState({
    when: '',
    changedTo: '',
    action: '',
    userType: '',
    description: '',
  });

  const handleValuesChange = (value: string, name: string) => {
    setFormValues(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="p-6 px-20 relative h-full max-w-full m-auto ">
      <div className="flex items-start gap-5 mb-15">
        <div className="flex gap-4 items-center">
          <Link
            href="/dashboard/workflow"
            className="shadow-none h-[36px] flex items-center gap-3 p-0 bg-transparent hover:bg-transparent cursor-pointer text-[#4e4e4e]"
          >
            <Image
              width={20}
              height={20}
              alt="Program"
              className="object-cover"
              src={`/svgs/left-arrow-new.svg`}
            />
          </Link>
        </div>

        <div className="border-b-[#D9D9D9] border-b-[1px] w-full flex items-center justify-between pb-3">
          <span className="text-[#858585] text-[12px] font-bold">NEW WORKFLOW AUTOMATION</span>

          <div className="flex items-center gap-3">
            <Button className="text-[#333333DE] cursor-pointer w-[95px] text-[12px] bg-transparent hover:bg-transparent border border-[#D9D9D9] rounded-[20px]">
              CANCEL
            </Button>
            <Button className="text-[#fff] cursor-pointer w-[95px] text-[12px] bg-[#364699] hover:bg-[#364699] border border-[#D9D9D9] rounded-[20px]">
              SAVE
            </Button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full items-center">
        <div className="relative flex flex-col items-center space-y-6">
          <Card className="w-full max-w-2xl border rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm font-medium mb-4 flex items-center space-x-2">
                <div className="border-[2px] rounded-full border-[#333333DE] p-[1px]">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[#333333DE] text-[12px] font-bold">Trigger</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-[#333333DE] text-[12px] font-bold">When</span>

                <Select
                  name="when"
                  value={formValues.when}
                  onValueChange={value => handleValuesChange(value, 'when')}
                >
                  <SelectTrigger className="text-[#333333DE] text-[12px] w-[200px] font-bold cursor-pointer">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {whenOptions.map(option => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="text-[#333333DE] text-[12px] font-bold"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {formValues.when !== '' && (
                  <>
                    <span className="text-[#333333DE] text-[12px] font-bold">changed to</span>

                    <Select
                      name="changedTo"
                      value={formValues.changedTo}
                      onValueChange={value => handleValuesChange(value, 'changedTo')}
                    >
                      <SelectTrigger className="text-[#333333DE] text-[12px] w-[200px] font-bold cursor-pointer">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {changedToOptions.map(option => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="text-[#333333DE] text-[12px] font-bold"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {action === '' && formValues.when !== '' && formValues.changedTo !== '' && (
            <div className="flex items-center space-x-6 w-full">
              <div className="flex-1 border-t border-dotted border-[#858585]" />
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer w-[24px] h-[24px] p-0 border-none bg-transparent hover:bg-transparent"
                >
                  <PlusIcon className="!w-[24px] !h-[24px] object-fit" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer w-[24px] h-[24px] p-0 border-none bg-transparent hover:bg-transparent"
                >
                  <SplitIcon className="!w-[24px] !h-[24px] object-fit" />
                </Button>
                <Button
                  onClick={() => setAction('Play')}
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer w-[24px] h-[24px] p-0 border-none bg-transparent hover:bg-transparent"
                >
                  <ToggleIcon className="!w-[24px] !h-[24px] object-fit" />
                </Button>
              </div>
              <div className="flex-1 border-t border-dotted border-[#858585]" />
            </div>
          )}

          {action === 'Play' && (
            <>
              <div className="relative w-full h-[100px]">
                {/* Vertical dotted line from top to play button */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[40px] border-l border-dotted border-gray-400" />

                {/* Play button at the corner */}
                <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 z-10">
                  <ToggleIcon className="!w-[24px] !h-[24px] object-fit" />
                </div>

                {/* Horizontal dotted line to the left */}
                <div className="absolute top-[53px] left-[120px] w-[160px] border-t border-dotted border-gray-400" />

                {/* Downward arrow at end of line */}
                <div className="absolute top-[53px] left-[180px] w-[1px] h-[60px] border-l border-dotted border-gray-400 transform translate-x-[-60px]">
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
                    ▼
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Card
                  className={`${formValues.action !== '' ? 'w-full' : 'w-max'} mb-5 min-w-[233px] py-0 border rounded-xl shadow-sm`}
                >
                  <CardContent className="p-6">
                    <div className="text-sm font-medium mb-4 flex items-center space-x-2">
                      <ToggleIcon className="!w-[24px] !h-[24px] object-fit" />
                      <span>Action</span>
                    </div>

                    <div className="mb-4 flex w-full gap-10 items-center">
                      <Select
                        name="action"
                        value={formValues.action}
                        onValueChange={value => handleValuesChange(value, 'action')}
                      >
                        <SelectTrigger className="text-[#333333DE] text-[12px] w-[200px] font-bold cursor-pointer">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {actionOptions.map(option => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="text-[#333333DE] text-[12px] font-bold"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {formValues.action !== '' && (
                        <div className="flex items-center gap-5">
                          <span className="text-[#333333DE] text-[12px] font-bold">to</span>

                          <Select
                            name="userType"
                            value={formValues.userType}
                            onValueChange={value => handleValuesChange(value, 'userType')}
                          >
                            <SelectTrigger className="text-[#333333DE] text-[12px] w-[240px] font-bold cursor-pointer">
                              <SelectValue placeholder="Select User Type / Organization" />
                            </SelectTrigger>
                            <SelectContent>
                              {changedToOptions.map(option => (
                                <SelectItem
                                  key={option}
                                  value={option}
                                  className="text-[#333333DE] text-[12px] font-bold"
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {formValues.action !== '' && (
                      <div className="relative w-full">
                        <Textarea
                          value={formValues.description}
                          onChange={e => {
                            if (e.target.value.length <= maxChars) {
                              setFormValues(prev => ({
                                ...prev,
                                description: e.target.value,
                              }));
                            }
                          }}
                          placeholder="Enter @Patient Name to mention"
                          className="min-h-[150px] resize-none text-sm pr-16"
                        />
                        <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                          {formValues.description.length}/{maxChars}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewWorkFlowPage;
