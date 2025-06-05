/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, SendHorizontal } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';

import GroupStarsIcon from '../../../../../../../public/svgs/group-stars.svg';

const womensHealthSessions = [
  {
    name: 'Lecture: Arm & Intro to Forearm',
    location: 'H&S 403',
    date: 'Jan 28, 2025',
    time: '1:00 PM - 3:00 PM',
  },
  {
    name: 'Lecture: Arm & Intro to Forearm',
    location: 'H&S 403',
    date: 'Jan 28, 2025',
    time: '1:00 PM - 3:00 PM',
  },
  {
    name: 'Lecture: Arm & Intro to Forearm',
    location: 'H&S 403',
    date: 'Jan 28, 2025',
    time: '1:00 PM - 3:00 PM',
  },
];

type ViewCourseProps = {
  selectedCourse: {
    year: string;
    course: string;
  } | null;
  setShowCourse: (show: boolean) => void;
  setSelectedCourse: (course: { year: string; course: string } | null) => void;
};

type CourseData = {
  id: string;
  courseName: string;
  location: string;
  from: string;
  to: string;
  form: string;
};

const ViewCourse = ({ selectedCourse, setShowCourse, setSelectedCourse }: ViewCourseProps) => {
  const [showSessions, setShowSessions] = useState(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState<CourseData>({
    to: '',
    from: '',
    form: '',
    location: '',
    courseName: '',
    id: crypto.randomUUID(),
  });

  const toggleSessions = () => {
    setShowSessions(!showSessions);
  };

  const handleBack = () => {
    setShowCourse(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={handleBack}
          className="shadow-none flex items-center gap-3 bg-transparent hover:bg-transparent cursor-pointer text-[#4e4e4e]"
        >
          <Image
            width={16}
            height={16}
            alt="Program"
            className="object-fit"
            src={`/svgs/left arrow.svg`}
          />
          <h4 className="m-0 text-[12px] text-[#4f4f4f] font-medium">{`${selectedCourse?.year} - ${selectedCourse?.course}`}</h4>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 p-0 border-[#d9d9d9] cursor-pointer">
            <Image src={'/svgs/calendar_month.svg'} width={16} height={16} alt="calendar" />
          </Button>
        </div>
      </div>

      <div>
        {/* Rotations Table */}
        <div className={'mb-10'}>
          <Table>
            <TableHeader className="bg-[#D9D9D91A]">
              <TableRow className="border-b border-[#f5f5f5]">
                <TableHead className="w-12"></TableHead>
                <TableHead className="text-[#6c6c6c] font-medium ">Course Name</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium ">Location</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium ">From</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium">To</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium">Evaluation Form</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-[#f5f5f5] cursor-pointer hover:bg-gray-50">
                <TableCell className="py-4">
                  <div className="w-[50px] h-[50px] rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                    <GroupStarsIcon className="h-[50px] w-[50px]" />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[#333333DE]">
                  Women&apos;s Health
                  <div className="mt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" text-xs text-[#364699] "
                      onClick={e => {
                        e.stopPropagation();
                        toggleSessions();
                      }}
                    >
                      3 Sessions{' '}
                      {showSessions ? (
                        <ChevronUp className="h-3 w-3 ml-1" />
                      ) : (
                        <ChevronDown className="h-3 w-3 ml-1" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Jan 28, 2025</TableCell>
                <TableCell>Feb 2, 2025</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                  >
                    <div className="border border-[#D9D9D9] rounded p-1">
                      <Image src="/clarify.svg" alt="form" width={14} height={14} />
                    </div>
                    Form Name
                  </Button>
                  {/* <div className="flex gap-6 items-center">
                    <Button
                      variant="ghost"
                      className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                    >
                      <div className="border border-[#D9D9D9] rounded p-1">
                        <Image src="/grade.svg" alt="form" width={14} height={14} />
                      </div>{' '}
                      Gradesheet
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/delete.svg'} alt="delete" />
                      </Button>

                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/edit.svg'} alt="edit" />
                      </Button>
                    </div>
                  </div> */}
                </TableCell>
              </TableRow>

              {/* Sessions as separate rows */}
              {showSessions &&
                womensHealthSessions.map((session, index) => (
                  <TableRow key={index} className="border-b border-[#f5f5f5] bg-white">
                    <TableCell className="py-4 "></TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-medium">{session.name}</span>

                        <div className="flex px-2 py-1 items-center justify-center gap-1 bg-[#F5CA66] rounded-[20px]">
                          <Image src="/svgs/books.svg" alt="form" width={10} height={10} />

                          <span className="text-[#333333DE] text-[12px] font-medium">Lecture</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-medium text-[#333333DE]">{session.date}</span>

                        <span className="font-medium text-[#33333399]">{session.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-medium text-[#333333DE]">{session.date}</span>

                        <span className="font-medium text-[#33333399]">{session.time}</span>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}

              <TableRow className="border-b border-[#f5f5f5]">
                <TableCell className="py-4">
                  <div className="w-[50px] h-[50px] rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                    <GroupStarsIcon className="h-[50px] w-[50px]" />
                  </div>
                </TableCell>

                <TableCell className="font-medium">Physiology</TableCell>

                <TableCell></TableCell>
                <TableCell>Nov 15, 2023</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                  >
                    <div className="border border-[#D9D9D9] rounded p-1">
                      <Image src="/clarify.svg" alt="form" width={14} height={14} />
                    </div>
                    Form Name
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                  >
                    <div className="border border-[#D9D9D9] rounded p-1">
                      <Image src="/grade.svg" alt="form" width={14} height={14} />
                    </div>{' '}
                    Gradesheet
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow className="border-b border-[#f5f5f5]">
                <TableCell className="py-4">
                  <div className="w-[50px] h-[50px] rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                    <GroupStarsIcon className="h-[50px] w-[50px]" />
                  </div>
                </TableCell>

                <TableCell className="font-medium">Death and Dying</TableCell>

                <TableCell></TableCell>
                <TableCell>Nov 15, 2023</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                  >
                    <div className="border border-[#D9D9D9] rounded p-1">
                      <Image src="/clarify.svg" alt="form" width={14} height={14} />
                    </div>
                    Form Name
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-[#333333DE] p-0 h-auto hover:bg-transparent hover:underline"
                  >
                    <div className="border border-[#D9D9D9] rounded p-1">
                      <Image src="/grade.svg" alt="form" width={14} height={14} />
                    </div>{' '}
                    Gradesheet
                  </Button>
                </TableCell>
              </TableRow>
{/* 
              {isAdding ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-left bg-[#fcfcfc] text-[#333333] font-medium"
                  >
                    <div className="flex items-center gap-3">
                      <Input
                        type="text"
                        value={newCourse.courseName}
                        placeholder="Course Name"
                        onChange={e => setNewCourse({ ...newCourse, courseName: e.target.value })}
                        className="flex-4 h-[52px] !w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      />

                      <Input
                        type="text"
                        value={newCourse.location}
                        placeholder="Location"
                        onChange={e => setNewCourse({ ...newCourse, location: e.target.value })}
                        className="flex-2 h-[52px] w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      />

                      <Input
                        type="text"
                        value={newCourse.from}
                        placeholder="Start Date"
                        onChange={e => setNewCourse({ ...newCourse, from: e.target.value })}
                        className="flex-2 h-[52px] w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      />

                      <Input
                        type="text"
                        value={newCourse.to}
                        placeholder="End Date"
                        onChange={e => setNewCourse({ ...newCourse, to: e.target.value })}
                        className="flex-2 h-[52px] w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      />

                      <Input
                        type="text"
                        value={newCourse.form}
                        placeholder="Form"
                        onChange={e => setNewCourse({ ...newCourse, form: e.target.value })}
                        className="flex-2 h-[52px] w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      />

                      <Button
                        onClick={() => {
                          setIsAdding(false);
                        }}
                        className="bg-transparent hover:bg-transparent cursor-pointer text-white rounded-[4px] h-[30px] px-2"
                      >
                        <SendHorizontal width={24} height={24} className="bg-none text-[#334599]" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-left bg-[#F5F5F5] text-[#333333] font-medium"
                  >
                    <Button
                      onClick={() => setIsAdding(true)}
                      className="text-[14px] hover:bg-transparent text-[#364699] font-bold hover:bg-[] cursor-pointer bg-transparent shadow-none"
                    >
                      <div className="bg-[#6069aa] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center mr-2">
                        <Plus className="w-[9px] h-[9px] text-white" />
                      </div>
                      Add New
                    </Button>
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
