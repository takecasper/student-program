'use client';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import MSPEPanel from '../MSPEPanel';

export function MSPETab() {
  const [showPanel, setShowPanel] = useState<boolean>(false);

  return (
    <div className="space-y-6 p-6">
      <div className="relative w-fit">
        <span className="flex gap-2 absolute top-2 right-2 px-3 py-2 text-xs bg-[#FA8D8F] text-[#333333DE] font-semibold rounded-[10px] z-10">
          <Info className="w-4 h-4" /> Not Reviewed
        </span>
        <Card
          onClick={() => setShowPanel(true)}
          className="w-[308px] p-6 bg-white rounded-lg shadow-none hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="bg-[#F6F8FF] p-4 rounded-lg">
              <Image src="/mspe.png" alt="MSPE Form" width={267} height={100} />
            </div>
            <div className="flex-1 w-full">
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-[#333333]">MSPE Form</h3>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#6C6C6C]">Sent Date: Mar 20, 2023</p>
                <div className="h-[1px] w-full bg-[#E0E0E0]" />

                <div className="">
                  <div className="flex items-center gap-2 text-sm text-[#6C6C6C]">
                    <Image src="/hotel_class.svg" alt="MSPE Form" width={18} height={18} />
                    <span>Course Name</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {showPanel ? <MSPEPanel setShowPanel={setShowPanel} /> : <></>}
    </div>
  );
}
