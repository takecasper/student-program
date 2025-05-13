'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const dummyTemplates = Array.from({ length: 5 });

type AddEvaluationFormProps = {
  setIsSettingUpEvaluationForms: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEvaluationForm({
  setIsSettingUpEvaluationForms,
}: AddEvaluationFormProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

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
          <Button className="border-2 border-[#364699] rounded-[20px] bg-white text-[#364699] cursor-pointer hover:bg-[#364699] hover:text-white">
            Review
          </Button>
          <Button
            className="border-2 Cborder-[#D9D9D9] rounded-[20px] bg-[#364799] text-white cursor-pointer hover:bg-[#D9D9D9] hover:text-white"
            onClick={() => setIsSettingUpEvaluationForms(false)}
          >
            Done
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-[200px] border-r h-full bg-white p-2 flex flex-col gap-2">
          <Accordion type="multiple" className="w-full" defaultValue={['template']}>
            {/* TEMPLATE Panel */}
            <AccordionItem value="template">
              <AccordionTrigger className="cursor-pointer text-xs font-semibold">TEMPLATE</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 mt-2">
                {dummyTemplates.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full aspect-[3/4] rounded-xl border p-1 relative cursor-pointer transition',
                      selectedIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-400',
                    )}
                  >
                    {/* Radio dot */}
                    {selectedIndex === index && (
                      <span className="absolute top-1 left-1 w-3 h-3 rounded-full bg-blue-700" />
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
              <AccordionTrigger className="cursor-pointer text-xs font-semibold">ELEMENTS</AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-muted-foreground">Add any content here...</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>{/* Main Content */}</div>
      </div>
    </div>
  );
}
