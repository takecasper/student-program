import React, { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import MainLevel from './MainLevel';
import GeneralLevel from './GeneralLevel';
import TertiaryLevel from './TertiaryLevel';
import SecondaryLevel from './SecondaryLevel';

type AddRoleProps = {
  setScreenView: React.Dispatch<React.SetStateAction<number>>;
};

const AddRole = ({ setScreenView }: AddRoleProps) => {
  const [settingsColumns, setSettingsColumns] = useState({
    mainLevel: true,
    secondaryLevel: false,
    tertiaryLevel: false,
  });

  return (
    <>
      <div className="p-6 px-20 relative h-full max-w-full m-auto ">
        <div className="flex items-start gap-10 mb-15">
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => setScreenView(0)}
              className="shadow-none flex items-center gap-3 p-0 bg-transparent hover:bg-transparent cursor-pointer text-[#4e4e4e]"
            >
              <Image
                width={20}
                height={20}
                alt="Program"
                className="object-cover"
                src={`/svgs/left-arrow-new.svg`}
              />
            </Button>

            <Button className="shadow-none flex items-center gap-3 p-0 bg-transparent hover:bg-transparent cursor-pointer text-[#4e4e4e]">
              <Image
                width={20}
                height={20}
                alt="Program"
                className="object-cover"
                src={`/svgs/arrow-right-new.svg`}
              />
            </Button>
          </div>

          <div className="border-b-[#D9D9D9] border-b-[1px] w-full flex items-center justify-between pb-3">
            <span className="text-[#858585] text-[12px] font-bold">Add New Role</span>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setScreenView(0)}
                className="text-[#333333DE] cursor-pointer w-[95px] text-[12px] bg-transparent hover:bg-transparent border border-[#D9D9D9] rounded-[20px]"
              >
                CANCEL
              </Button>
              <Button
                onClick={() => setScreenView(0)}
                className="text-[#fff] cursor-pointer w-[95px] text-[12px] bg-[#364699] hover:bg-[#364699] border border-[#D9D9D9] rounded-[20px]"
              >
                SAVE
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[25%_25%_50%] w-full gap-6">
          <div>
            <h4 className="text-[#4e4e4e] text-[12px] font-bold mb-3">MAIN LEVEL</h4>

            <MainLevel settingsColumns={settingsColumns} setSettingsColumns={setSettingsColumns} />
          </div>
          <div>
            {settingsColumns.secondaryLevel && (
              <>
                <h4 className="text-[#4e4e4e] text-[12px] font-bold mb-3">SECONDARY LEVEL</h4>

                <SecondaryLevel
                  settingsColumns={settingsColumns}
                  setSettingsColumns={setSettingsColumns}
                />
              </>
            )}
          </div>
          <div>
            {settingsColumns.tertiaryLevel && (
              <>
                <div className="mb-5">
                  <h4 className="text-[#4e4e4e] text-[12px] font-bold mb-3">TERTIARY LEVEL</h4>
                  <TertiaryLevel />
                </div>
                <div className="mb-5">
                  <h4 className="text-[#4e4e4e] text-[12px] font-bold mb-3">GENERAL LEVEL</h4>
                  <GeneralLevel />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
