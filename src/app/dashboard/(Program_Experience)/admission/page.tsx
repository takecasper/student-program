/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';
import { Settings, X, ChevronDownIcon } from 'lucide-react';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import EnrollForm from './components/EnrollForm';
import SidebarInfo from './components/SidebarInfo';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { AdmissionData, SidebarProps } from './types';

import { initialData } from './data';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import FileIcon from '@/../public/file.svg';
import AddIcon from '@/../public/svgs/add.svg';

export default function ProgramAdmissionPage() {
  const [showSidebar, setShowSidebar] = useState<SidebarProps>({ show: false, student: null });
  const [admissionList, setAdmissionList] = useState<AdmissionData[]>(initialData);
  const [sidebarScreen, setSidebarScreen] = useState(0);

  const handleHideSidebar = () => {
    setShowSidebar({
      show: false,
      student: null,
    });
    setSidebarScreen(0);
  };

  // If we're in configuration mode (sidebarScreen === 1), show EnrollForm in full screen
  if (sidebarScreen === 1) {
    return (
      <div className="">
        <EnrollForm />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh_-_103px)]">
      <div
        className={`p-6 w-full transition-all duration-300 ${showSidebar.show ? 'pr-[500px]' : ''}`}
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-sm font-medium text-[#333333]">PROGRAMS</h1>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {admissionList.map(item => {
            return (
              <AccordionItem key={item.id} value={item.name} className="mb-3 relative">
                <AccordionTrigger className="data-[state=open]:rounded-b-none !no-underline border border-[#F5F5F5] px-4 py-[13px] cursor-pointer bg-[#D9D9D91A] rounded-t-md pr-14">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[#4d4d4d] text-[12px]">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[12px] text-[#364699]">{item.applied} Applied</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <div className="absolute right-6 top-[13px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-[4px] cursor-pointer h-[24px] w-[24px] border-[#d9d9d9]"
                      >
                        <Settings className="h-4 w-4 text-[#6c6c6c]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left" className="w-[180px] p-0 mt-20 shadow-none">
                      <div className="flex flex-col">
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-[#F5F5F5] text-[#333333DE] text-[14px]"
                          onClick={() => {
                            window.location.href = `/dashboard/admission/test-config`;
                          }}
                        >
                          <FileIcon className="w-5 h-5" />
                          Test Configuration
                        </button>
                        <div className="border-t border-[#F5F5F5] my-1"></div>
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F5F5F5] text-[#333333DE] text-[14px]">
                          <AddIcon className="w-5 h-5" />
                          Add Test
                        </button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <AccordionContent className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border border-[#F5F5F5] px-4 py-[13px] cursor-pointer bg-[#D9D9D91A] rounded-t-md">
                        <th className="text-[#33333399] text-[12px] px-4 py-2">Student</th>
                        <th className="text-[#33333399] text-[12px] px-4 py-2">Program</th>
                        <th className="text-[#33333399] text-[12px] px-4 py-2">Score 1</th>
                        <th className="text-[#33333399] text-[12px] px-4 py-2">Score 2</th>
                        <th className="text-[#33333399] text-[12px] px-4 py-2">Score 3</th>
                        <th className="text-[#33333399] text-[12px] px-4 py-2">Score 4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.students.map((student, index) => (
                        <>
                          <tr key={`${index}-casper`}>
                            <td className="px-4 py-[10px] align-middle">
                              <div
                                onClick={() =>
                                  setShowSidebar({
                                    show: true,
                                    student: student,
                                  })
                                }
                                className="cursor-pointer flex items-center gap-4 text-[#333333DE] text-[14px] font-normal"
                              >
                                <Avatar className="h-[30px] w-[30px] border border-[#D9D9D9]">
                                  <AvatarImage src={student.image} />
                                </Avatar>
                                {student.name}
                              </div>
                            </td>
                            <td className="px-4 py-[10px] align-middle text-[#333333DE] text-[14px] font-bold">
                              Casper
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.score1}
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.score2}
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.score3}
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.score4}
                            </td>
                          </tr>
                          <tr key={`${index}-formative`} className="border-b bg-white">
                            <td className="px-4 py-[10px] align-middle"></td>
                            <td className="px-4 py-[10px] align-middle text-[#333333DE] text-[14px] font-bold">
                              Formative
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.formativeScore1}
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.formativeScore2}
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.formativeScore3}
                            </td>
                            <td className="text-[#333333DE] text-[14px] font-normal px-4 py-[10px] align-middle">
                              {student.formativeScore4}
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {showSidebar.show && sidebarScreen === 0 && (
        <div className="absolute top-0 right-0 bottom-0 z-40 flex justify-end h-full">
          <div className="bg-white w-[485px] py-[20px] px-[24px] h-full overflow-y-auto shadow-none border-l-2 border-[#f5f5f5] animate-in slide-in-from-right">
            <div className="mb-10 flex items-center justify-between">
              <h5 className="text-[16px] font-bold text-[#333333DE] p-0">STUDENT PROFILE</h5>
              <Button
                size="icon"
                variant="outline"
                onClick={handleHideSidebar}
                className="cursor-pointer rounded-[4px] h-[24px] w-[24px] border-[#d9d9d9]"
              >
                <X className="h-4 w-4 text-[#333333DE]" />
              </Button>
            </div>
            <SidebarInfo setSidebarScreen={setSidebarScreen} showSidebar={showSidebar} />
          </div>
        </div>
      )}
    </div>
  );
}
