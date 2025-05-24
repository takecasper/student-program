import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const EnrollForm = () => {
  const [selectedTest, setSelectedTest] = useState<'CASPER' | 'SNAPSHOT'>('CASPER');

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
          <div className="mt-5 flex justify-end">
            <Button className="h-[40px] cursor-pointer text-[12px] text-white font-bold bg-[#364699] hover:bg-[#364699] rounded-[20px] border border-[#D9D9D9]">
              Take Formative Test
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrollForm;
