'use client';

import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import Image from 'next/image';
import { useState } from 'react';

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

const ViewCourse = ({ selectedCourse, setShowCourse, setSelectedCourse }: ViewCourseProps) => {
  const [showSessions, setShowSessions] = useState(false);

  const toggleSessions = () => {
    setShowSessions(!showSessions);
  };

  const handleBack = () => {
    setShowCourse(false);
    setSelectedCourse(null);
  }

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
          <Button variant="outline" size="icon" className="h-9 w-9 border-[#d9d9d9] cursor-pointer">
            <Image src={'/svgs/calendar_month.svg'} width={12} height={13} alt="calendar" />
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
                <TableHead className="text-[#6c6c6c] font-medium ">Rotation</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium ">From</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium ">To</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium">Evaluation Form</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-[#f5f5f5] cursor-pointer hover:bg-gray-50">
                <TableCell className="py-4">
                  <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#00a59b]" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  Women&apos;s Health
                  <div className="mt-2">
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

              {/* Sessions as separate rows */}
              {showSessions &&
                womensHealthSessions.map((session, index) => (
                  <TableRow key={index} className="border-b border-[#f5f5f5] bg-gray-50 ">
                    <TableCell className="py-4 ">
                      <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                        <Image src="/lecture.svg" alt="form" width={14} height={14} />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{session.name}</TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}

              <TableRow className="border-b border-[#f5f5f5]">
                <TableCell className="py-4">
                  <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#00a59b]" />
                  </div>
                </TableCell>

                <TableCell className="font-medium">Physiology</TableCell>

                <TableCell>Oct 1, 2023</TableCell>
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
                  <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#00a59b]" />
                  </div>
                </TableCell>

                <TableCell className="font-medium">Death and Dying</TableCell>

                <TableCell>Oct 1, 2023</TableCell>
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
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
