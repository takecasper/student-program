'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { CalendarDays, Clock, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

const dummyTemplates = Array.from({ length: 5 });

type AddEvaluationFormProps = {
  setIsSettingUpEvaluationForms: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEvaluationForm({
  setIsSettingUpEvaluationForms,
}: AddEvaluationFormProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [showSendContent, setShowSendContent] = useState<boolean>(false);

  const [sendDate, setSendDate] = useState<Date | undefined>();
  const [dueDate, setDueDate] = useState<Date | undefined>();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Button
          onClick={() => setIsSettingUpEvaluationForms(false)}
          className="shadow-none flex items-center gap-3 bg-transparent hover:bg-transparent cursor-pointer text-[#4e4e4e]"
        >
          <Image
            width={16}
            height={16}
            alt="Program"
            className="object-fit"
            src={`/svgs/left arrow.svg`}
          />
          <h4 className="m-0 text-[12px] text-[#4f4f4f] font-medium">GO BACK </h4>
        </Button>

        <div className="flex items-center gap-3">
          {/* <Button className="border-2 border-[#364699] rounded-[20px] bg-white text-[#364699] cursor-pointer hover:bg-[#364699] hover:text-white">
            Review
          </Button>
          <Button
            className="border-2 Cborder-[#D9D9D9] rounded-[20px] bg-[#364799] text-white cursor-pointer hover:bg-[#D9D9D9] hover:text-white"
            onClick={() => setIsSettingUpEvaluationForms(false)}
          >
            Done
          </Button> */}
        </div>
      </div>

      <div className="flex items-start gap-2 relative min-h-[65vh]">
        {!showSendContent && (
          <div className="w-[200px] border-none h-full min-h-[65vh] bg-white p-0 flex flex-col gap-2">
            <Accordion type="multiple" className="w-full" defaultValue={['template']}>
              {/* TEMPLATE Panel */}
              <AccordionItem value="template">
                <AccordionTrigger className="bg-[#f4f4f4] h-[56px] rounded-b-none flex items-center px-7 cursor-pointer text-xs font-semibold">
                  TEMPLATE
                </AccordionTrigger>

                <AccordionContent className=" bg-[#fbfbfb] px-6 py-5 flex flex-col gap-3 mt-0">
                  {dummyTemplates.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        'w-full h-[150px] rounded-xl border p-1 relative cursor-pointer transition',
                        selectedIndex === index
                          ? 'border-blue-500 ring-1 ring-[#364799]'
                          : 'border-gray-200 hover:border-gray-400',
                      )}
                    >
                      {/* Radio dot */}
                      {selectedIndex === index && (
                        <span className="absolute top-2 left-2 w-[13px] h-[13px] rounded-full bg-[#364799]" />
                      )}

                      <div className="bg-gray-100 w-full h-full rounded-md flex flex-col justify-center items-center">
                        {/* placeholder lines */}
                        <div className="w-4/5 h-2 bg-gray-300 rounded mb-1" />
                        <div className="w-3/5 h-2 bg-gray-300 rounded" />
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* ELEMENTS Panel */}
              <AccordionItem value="elements">
                <AccordionTrigger className="bg-[#f4f4f4] rounded-t-none h-[56px] flex items-center px-7 cursor-pointer text-xs font-semibold">
                  ELEMENTS
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs text-muted-foreground">Add any content here...</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        <div className="absolute top-0 left-[185px] bottom-0 m-auto w-[30px] h-[30px] rounded-full shadow-md bg-white flex items-center justify-center">
          <Image src={'/svgs/arrow-right.svg'} width={16} height={16} alt="arrow right" />
        </div>

        <div className="flex-1 h-full min-h-[65vh]">
          {/* Main Content */}
          <div className="w-full h-[56px] px-5 bg-[#f4f4f4] rounded-t-[10px] flex items-center justify-between">
            <h4 className="text-[#616161] text-[14px] font-bold">FORM BUILDER</h4>
            <Button
              onClick={() => setShowSendContent(!showSendContent)}
              className="cursor-pointer border-[#ebebeb] bg-white hover:bg-white text-[#000]  rounded-[4px] w-[86px] h-[32px] flex items-center justify-between"
            >
              <Image
                width={16}
                alt="SEND"
                height={16}
                className="object-fit"
                src={`/svgs/send.svg`}
              />
              SEND
            </Button>
          </div>

          <div className="bg-[#fbfbfb] rounded-b-[10px] h-full min-h-[65vh]"></div>
        </div>

        {showSendContent && (
          <div className="w-[300px] border-none h-full min-h-[65vh] bg-white p-0 flex flex-col gap-2">
            <div className="w-full h-[56px] px-5 bg-[#f4f4f4] rounded-t-[10px] flex items-center justify-between">
              <h4 className="text-[#616161] text-[14px] font-bold">SEND</h4>
            </div>

            <div className="space-y-4 px-6 pt-7 bg-[#fbfbfb]  ">
              {/* Level */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Level</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Course/Session/Rotation"
                    className="pl-8 rounded-md border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Evaluator */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Evaluator</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Select evaluator" className="pl-8" />
                </div>
              </div>

              {/* Target */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Target</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Select Target" className="pl-8" />
                </div>
              </div>

              <hr className="my-4" />

              {/* Send Date */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Send Date/Time</label>

                <div className="flex flex-col gap-2">
                  {/* Date Picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
                        {sendDate ? format(sendDate, 'PPP') : <span>Select Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={sendDate} onSelect={setSendDate} />
                    </PopoverContent>
                  </Popover>

                  {/* Time Input */}
                  <div className="relative">
                    <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Select Time" className="pl-8" />
                  </div>
                </div>
              </div>

              {/* Completion Due Date */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Completion Due Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
                      {dueDate ? format(dueDate, 'PPP') : <span>Select Target</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Done Button */}
            <div className="px-6 bg-[#fbfbfb] ">
              <Button
                onClick={() => setShowSendContent(!showSendContent)}
                className="w-full cursor-pointer mt-6 bg-[#263DA4] hover:bg-[#1e3191] text-white rounded-full text-sm"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
