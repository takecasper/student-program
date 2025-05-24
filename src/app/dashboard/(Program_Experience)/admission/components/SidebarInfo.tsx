import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { SidebarProps } from '../types';

type SidebarInfoProps = {
  showSidebar: SidebarProps;
  setSidebarScreen: Dispatch<SetStateAction<number>>;
};

const SidebarInfo = ({ showSidebar, setSidebarScreen }: SidebarInfoProps) => {
  return (
    <>
      <div className="mb-5 flex items-start gap-5">
        <Avatar className="h-[100px] w-[100px] border border-[#D9D9D9]">
          <AvatarImage src={showSidebar.student?.image} />
        </Avatar>

        <div className="flex flex-col items-start">
          <p className="text-[#333333DE] text-[16px] font-bold">{showSidebar.student?.name}</p>

          <span className="mb-4 text-[#333333DE] text-[14px] font-normal">
            {showSidebar.student?.email}
          </span>

          <Button
            onClick={() => setSidebarScreen(1)}
            className="cursor-pointer w-[96px] bg-[#364699] hover:bg-[#212a55] rounded-[20px] border border-[#D9D9D9] text-[#fff] font-bold text-[12px]"
          >
            Enroll
          </Button>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="border-b">
          <tr className="border border-[#F5F5F5] px-4 py-[13px] cursor-pointer bg-[#D9D9D91A] rounded-t-md">
            <th className="text-[#33333399] font-normal text-[12px] px-4 py-2">Course</th>
            <th className="text-[#33333399] font-normal text-[12px] px-4 py-2">Past Tests</th>
            <th className="text-[#33333399] font-normal text-[12px] px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {showSidebar?.student?.pastTest?.map((pastTest, index) => {
            return (
              <tr key={index} className="border-b">
                <td className="px-4 py-[10px] align-middle text-[#333333DE] text-[14px] font-normal">
                  {pastTest.course}
                </td>
                <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                  {pastTest.pastTest}
                </td>
                <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                  {pastTest.score}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SidebarInfo;
