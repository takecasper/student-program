/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Plus, SendHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CourseConfigure from './courseConfigure';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';

import { programCards } from '@/data/programCards';

type CourseData = {
  id: string;
  courseName: string;
  location: string;
  from: string;
  to: string;
};

type CurriculumRotationProps = {
  isConfiguring: boolean;
  currentSelection: number;
  setIsConfiguring: React.Dispatch<React.SetStateAction<boolean>>;
};

const CurriculumRotation = ({
  isConfiguring,
  currentSelection,
  setIsConfiguring,
}: CurriculumRotationProps) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tableData, setTableData] = useState<CourseData[]>([]);
  const [newCourse, setNewCourse] = useState<CourseData>({
    to: '',
    from: '',
    location: '',
    courseName: '',
    id: crypto.randomUUID(),
  });

  const [currentState, setCurrentState] = useState<number>(0);

  const selectedData = useMemo(() => {
    if (programCards) {
      return programCards?.[currentSelection];
    }

    return null;
  }, [currentSelection]);

  console.log('selectedData', selectedData);

  return (
    <div>
      {isConfiguring ? (
        <CourseConfigure setIsConfiguring={setIsConfiguring} />
      ) : (
        <>
          <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-4">CURRICULUM & ROTATION </h4>

          <div className="mb-5 p-[2px] rounded-[20px] bg-gradient-to-r from-[rgba(210,210,255,0.4)] to-[rgba(221,153,246,0.4)] w-full">
            <div className="flex flex-col items-start justify-end h-[107px] w-full bg-gradient-to-r from-white to-[#e6e4ff] rounded-[20px] px-5 py-4">
              <p className="text-[#636363] font-semibold mb-2">{selectedData?.year}</p>
              <div className="flex items-center gap-2">
                {selectedData?.content?.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentState(index)}
                    className={`text-[#333333DE] cursor-pointer hover:bg-[#3C4DBD] hover:text-white px-3 py-1 rounded-[10px] font-medium border border-[#E0E0E0] ${
                      currentState === index ? 'bg-[#3C4DBD] text-white' : 'bg-white'
                    }`}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-[#6c6c6c] w-[50%] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                    Course Name
                  </TableHead>
                  <TableHead className="text-[#6c6c6c] w-[20%] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                    Location
                  </TableHead>
                  <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                    From
                  </TableHead>
                  <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                    To
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tableData.map((program, index) => (
                  <TableRow key={index} className="border-b border-[#f5f5f5] bg-[#fbfbfb]">
                    <TableCell className="text-[#4d4d4d] font-bold flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#F5F5F5] rounded-[20px] border-[2px] overflow-hidden border-[#F5F5F5] w-[50px] h-[50px] flex items-center justify-center">
                          <Image
                            width={16}
                            height={16}
                            alt="Program"
                            className="object-fit"
                            src={`/svgs/stars.svg`}
                          />
                        </div>
                        {program.courseName}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#4d4d4d] font-medium">
                      <p className="m-0  text-[14px] font-normal">{program.location}</p>
                    </TableCell>
                    <TableCell className="text-[#4d4d4d] font-medium">
                      <p className="m-0  text-[14px] font-normal">{program.from}</p>
                    </TableCell>
                    <TableCell className="text-[#4d4d4d] font-medium">
                      <div className="flex items-center gap-2">
                        <p className="m-0  text-[14px] font-normal">{program.to}</p>
                        <Button
                          onClick={() => setIsConfiguring(true)}
                          className="bg-[#364699] hover:bg-[#364699] text-white cursor-pointer rounded-[20px] text-[10px] font-medium"
                        >
                          Configure Course
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {tableData.length === 0 && !isAdding && (
                  <TableRow>
                    <TableCell colSpan={4} className=" bg-[#fcfcfc] text-[#333333] font-medium">
                      <div className="h-[50vh] flex flex-col items-center justify-center">
                        <Button
                          onClick={() => setIsAdding(true)}
                          className="bg-[#F1F1F1] hover:bg-[#cecece] cursor-pointer rounded-[10px] border-[2px] overflow-hidden border-[#F1F1F1] w-[94px] h-[94px] flex items-center justify-center"
                        >
                          <Image
                            width={16}
                            height={16}
                            alt="Program"
                            className="object-fit"
                            src={`/svgs/add.svg`}
                          />
                        </Button>

                        <h5 className="text-[#000] text-[16px] font-medium">
                          You don’t have any course set up yet{' '}
                        </h5>
                        <p className="text-[#949494] text-[14px] font-medium">
                          Click on ‘add’ to start to add new course
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {isAdding && (
                  <TableRow>
                    <TableCell className="text-left bg-[#fcfcfc] text-[#333333] font-medium">
                      <Input
                        type="text"
                        value={newCourse.courseName}
                        placeholder="Type Course Name"
                        onChange={e => setNewCourse({ ...newCourse, courseName: e.target.value })}
                        className="flex-2 h-[36px] w-full rounded-[10px] active:border-[#364699] focus:border-[#364699] placeholder:text-[#858585] placeholder:font-medium"
                      />
                    </TableCell>
                    <TableCell className="text-left bg-[#fcfcfc] text-[#333333] font-medium">
                      <Input
                        type="text"
                        value={newCourse.location}
                        placeholder="Type Location"
                        onChange={e => setNewCourse({ ...newCourse, location: e.target.value })}
                        className="flex-2 h-[36px] w-full rounded-[10px] placeholder:text-[#858585] placeholder:font-medium"
                      />
                    </TableCell>
                    <TableCell className="text-left bg-[#fcfcfc] text-[#333333] font-medium">
                      <Input
                        type="date"
                        value={newCourse.from}
                        placeholder="Select date"
                        onChange={e => setNewCourse({ ...newCourse, from: e.target.value })}
                        className="flex-2 h-[36px] w-full rounded-[10px] placeholder:text-[#858585] placeholder:font-medium"
                      />
                    </TableCell>
                    <TableCell className="text-left bg-[#fcfcfc] text-[#333333] font-medium">
                      <div className="flex items-center gap-2">
                        <Input
                          type="date"
                          value={newCourse.to}
                          placeholder="Select date"
                          onChange={e => setNewCourse({ ...newCourse, to: e.target.value })}
                          className="flex-2 h-[36px] w-full rounded-[10px] placeholder:text-[#858585] placeholder:font-medium"
                        />

                        <Button
                          onClick={() => {
                            setIsAdding(false);
                            setTableData([...tableData, newCourse]);
                            setNewCourse({
                              courseName: '',
                              location: '',
                              from: '',
                              to: '',
                              id: crypto.randomUUID(),
                            });
                          }}
                          className="bg-transparent hover:bg-transparent cursor-pointer text-white rounded-[4px] h-[30px] px-2"
                        >
                          <SendHorizontal
                            width={24}
                            height={24}
                            className="bg-none text-[#334599]"
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {tableData.length > 0 || isAdding && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-left bg-[#F5F5F5] text-[#333333] font-medium"
                    >
                      <Button
                        onClick={() => setIsAdding(true)}
                        className="text-[14px] hover:bg-transparent text-[#364699] font-bold hover:bg-[] cursor-pointer bg-transparent shadow-none"
                      >
                        <div className="bg-[#6069aa] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center mr-2">
                          <Plus className="w-[9px] h-[9px] text-white" />
                        </div>
                        Add New Course
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default CurriculumRotation;
