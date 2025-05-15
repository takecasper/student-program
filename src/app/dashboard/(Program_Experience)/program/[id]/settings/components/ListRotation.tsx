import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

type RotationListProps = {
  setIsSettingUpRotation: React.Dispatch<React.SetStateAction<boolean>>;
};

const RotationList = ({ setIsSettingUpRotation }: RotationListProps) => {
  return (
    <div className="h-[50vh] bg-[#D9D9D91A] flex flex-col items-center justify-center">
      <Button
        onClick={() => setIsSettingUpRotation(true)}
        className="bg-[#F1F1F1] hover:bg-[#cecece] cursor-pointer rounded-[10px] mb-2 border-[2px] overflow-hidden border-[#F1F1F1] w-[76px] h-[76px] flex items-center justify-center"
      >
        <Image width={24} height={24} alt="Program" className="object-fit" src={`/svgs/add.svg`} />
      </Button>

      <h5 className="text-[#000] text-[16px] font-medium">You don’t have rotation set up yet</h5>
      <p className="text-[#949494] text-[14px] font-medium">Click on ‘add’ to start</p>
    </div>
  );
};

export default RotationList;
