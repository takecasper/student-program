/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';
import { Settings, X } from 'lucide-react';

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

  return (
    <div className="relative w-full min-h-[calc(100vh_-_103px)]">
      <div
        className={`p-6 w-full transition-all duration-300 ${showSidebar.show ? 'pr-[500px]' : ''}`}
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-sm font-medium text-[#333333]">PROGRAMS</h1>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-[4px] cursor-pointer h-[24px] w-[24px] border-[#d9d9d9]"
            >
              <Settings className="h-4 w-4 text-[#6c6c6c]" />
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {admissionList.map(item => {
            return (
              <AccordionItem key={item.id} value={item.name} className="mb-3">
                <AccordionTrigger className="data-[state=open]:rounded-b-none !no-underline border border-[#F5F5F5] px-4 py-[13px] cursor-pointer bg-[#D9D9D91A] rounded-t-md">
                  <div className="flex justify-between w-full">
                    <span className="text-[#4d4d4d] text-[12px]">{item.name}</span>
                    <span className="text-[12px] text-[#364699]">{item.applied} Applied</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="overflow-x-auto ">
                  <table className="w-full text-left text-sm">
                    <thead className="">
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
                      {item.students.map((student, index) => {
                        return (
                          <tr key={index} className="border-b">
                            <td className=" px-4 py-[10px] align-middle">
                              <div className="flex items-center gap-4 text-[#333333DE] text-[14px] font-normal">
                                <Avatar className="h-[30px] w-[30px] border border-[#D9D9D9]">
                                  <AvatarImage src={student.image} />
                                </Avatar>
                                {student.name}
                              </div>
                            </td>
                            <td className="px-4 py-[10px] align-middle text-[#333333DE] text-[14px] font-bold">
                              {student.program}
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
                            <td className=" px-4 py-[10px] align-middle">
                              <div className="flex items-center gap-4 text-[#333333DE] text-[14px] font-normal">
                                {student.score4}

                                {student.canEnroll && (
                                  <Button
                                    onClick={() =>
                                      setShowSidebar({
                                        show: true,
                                        student: student,
                                      })
                                    }
                                    className="p-0 bg-transparent hover:bg-transparent cursor-pointer text-[#364699] text-[14px] hover:underline ml-auto"
                                  >
                                    Enroll
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {showSidebar.show && (
        <div className="absolute top-0 right-0 bottom-0 z-40 flex justify-end h-full">
          <div className="bg-white w-[485px] py-[20px] px-[24px] h-full overflow-y-auto shadow-none border-l-2 border-[#f5f5f5] animate-in slide-in-from-right">
            <div className="mb-10 flex items-center justify-between">
              <h5 className="text-[16px] font-bold text-[#333333DE] p-0">
                {sidebarScreen === 0 ? 'STUDENT PROFILE' : 'CONFIGURATION'}
              </h5>

              <Button
                size="icon"
                variant="outline"
                onClick={handleHideSidebar}
                className="cursor-pointer rounded-[4px] h-[24px] w-[24px] border-[#d9d9d9]"
              >
                <X className="h-4 w-4 text-[#333333DE]" />
              </Button>
            </div>

            {sidebarScreen === 0 ? (
              <SidebarInfo setSidebarScreen={setSidebarScreen} showSidebar={showSidebar} />
            ) : (
              <EnrollForm />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
