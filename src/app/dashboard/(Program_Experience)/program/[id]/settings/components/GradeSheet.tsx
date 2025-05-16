/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, SendHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

import { UserData } from '../types';

type GradeSheetData = {
  id: string;
  status?: string;
  attachTo?: string;
  gradesheet: string;
  attachType?: string;
  noOfAttached?: UserData[];
};

const initialTableData: GradeSheetData[] = [
  {
    id: '1',
    status: 'Active',
    attachType: 'Rotation',
    gradesheet: 'Int Med 24/25 (EPO)',
    attachTo: 'Internal Medicine - Hospital A',
    noOfAttached: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
  },
  {
    id: '2',
    status: 'Active',
    attachType: 'Rotation',
    gradesheet: 'Int Med 24/25 (EPO)',
    attachTo: 'Internal Medicine - Hospital A',
    noOfAttached: [
      {
        id: '1',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '2',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
      {
        id: '3',
        username: 'Medicine',
        role: 'Learner',
        status: 'Active',
        image: '/images/avatar.png',
      },
    ],
  },
];

const GradeSheet = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tableData, setTableData] = useState<GradeSheetData[]>(initialTableData);
  const [newGradeSheet, setNewGradeSheet] = useState<GradeSheetData>({
    attachTo: '',
    status: 'New',
    gradesheet: '',
    attachType: '',
    id: crypto.randomUUID(),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-4">GRADE-SHEET</h4>

        <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
          <Image width={16} height={16} src={'/svgs/system_update_alt.svg'} alt="update" />
        </Button>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Gradesheet
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Attach Type
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Attach To
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                # Attached
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index} className="border-b border-[#f5f5f5]">
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className=" flex items-center gap-2">{item.gradesheet}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="block rounded-[20px] border border-[#d9d9d9] text-[#4e4e4e] px-3 py-[6px]">
                      {item.attachType}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className=" flex items-center gap-2">{item.attachTo}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className=" rounded-[20px] border border-[#d9d9d9] w-max flex py-1 px-[4px] pr-2 items-center">
                    <div className="flex -space-x-2 pr-1">
                      {item.noOfAttached?.slice(0, 2).map(user => (
                        <Avatar key={user.id} className="w-6 h-6 border-2 border-white">
                          <AvatarImage src={user.image} alt={user.username} />
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-[#858585] text-[14px]">+{item.noOfAttached?.length}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="px-3 flex items-center justify-start gap-2">
                      <div
                        className={`w-[6px] h-[6px] rounded-full ${item.status === 'Active' ? 'bg-[#70C0B8]' : 'bg-[#b40e0e]'}`}
                      ></div>
                      <p
                        className={`m-0 text-[14px] font-bold ${item.status === 'Active' ? 'text-[#70C0B8]' : 'text-[#b40e0e]'}`}
                      >
                        {item.status}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/delete.svg'} alt="delete" />
                      </Button>

                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/edit.svg'} alt="edit" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {isAdding ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-left bg-[#fcfcfc] text-[#333333] font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      value={newGradeSheet.gradesheet}
                      placeholder="Type Gradesheet"
                      onChange={e =>
                        setNewGradeSheet({ ...newGradeSheet, gradesheet: e.target.value })
                      }
                      className="flex-2 h-[52px] !w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />

                    <Select
                      onValueChange={value =>
                        setNewGradeSheet({ ...newGradeSheet, attachType: value })
                      }
                    >
                      <SelectTrigger className="w-[20%] !h-[52px] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium">
                        <SelectValue placeholder="Select Attached Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Rotation">Rotation</SelectItem>
                          <SelectItem value="Course">Course</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Input
                      type="text"
                      value={newGradeSheet.attachTo}
                      placeholder="Attach To"
                      onChange={e =>
                        setNewGradeSheet({ ...newGradeSheet, attachTo: e.target.value })
                      }
                      className="flex-2 h-[52px] w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />

                    <Input
                      type="text"
                      placeholder="Attachment #"
                      className="flex-2 h-[52px] w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />

                    <Select
                      onValueChange={value =>
                        setNewGradeSheet({ ...newGradeSheet, status: value })
                      }
                    >
                      <SelectTrigger className="w-[20%] !h-[52px] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => {
                        setIsAdding(false);
                        setTableData([...tableData, newGradeSheet]);
                        setNewGradeSheet({
                          attachTo: '',
                          status: 'New',
                          gradesheet: '',
                          attachType: '',
                          id: crypto.randomUUID(),
                        });
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
                  colSpan={5}
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
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GradeSheet;
