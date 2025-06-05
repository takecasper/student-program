'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import FormBuilder from './FormBuilder';

type AddEvaluationFormProps = {
  setIsSettingUpEvaluationForms: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEvaluationForm({
  setIsSettingUpEvaluationForms,
}: AddEvaluationFormProps) {
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
      </div>

      <FormBuilder />
    </div>
  );
}
