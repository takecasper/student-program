import React from 'react';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlignLeft, Plus, SendHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useProgram } from '@/store/program';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

type UserData = {
  id: string;
  username: string;
  role: string;
  status: string;
  image: string;
};

const initialTableData: UserData[] = [
  { id: '1', username: 'Medicine', role: 'Learner', status: 'Active', image: '/images/avatar.png' },
  { id: '2', username: 'Medicine', role: 'Learner', status: 'Active', image: '/images/avatar.png' },
  { id: '3', username: 'Medicine', role: 'Learner', status: 'Active', image: '/images/avatar.png' },
];

const UserRole = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tableData, setTableData] = useState<UserData[]>(initialTableData);
  const [newUser, setNewUser] = useState<UserData>({
    username: '',
    role: '',
    status: '',
    image: '',
    id: crypto.randomUUID(),
  });

  return (
    <div>
      <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-4">USER & ROLE</h4>

      <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                User Name
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Role
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((program, index) => (
              <TableRow key={index} className="border-b border-[#f5f5f5]">
                <TableCell className="text-[#333333DE] font-medium flex items-center gap-3">
                  <div className=" flex items-center gap-2">
                    <div className="bg-[#F5F5F5] rounded-full border-[2px] overflow-hidden border-[#F5F5F5] w-[24px] h-[24px] flex items-center justify-center">
                      <Image
                        src={program.image}
                        width={25}
                        height={25}
                        className="object-fit"
                        alt="Program"
                      />
                    </div>
                    {program.username}
                  </div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium">
                  <div className="bg-[#fff] border border-[#333] rounded-[20px] w-min h-[30px] px-3 flex items-center justify-center">
                    <p className="m-0  text-[14px] font-normal">{program.role}</p>
                  </div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium">
                  <div className="px-3 flex items-center justify-start gap-2">
                    <div
                      className={`w-[6px] h-[6px] rounded-full ${program.status === 'Active' ? 'bg-[#70C0B8]' : 'bg-[#b40e0e]'}`}
                    ></div>
                    <p
                      className={`m-0 text-[14px] font-normal ${program.status === 'Active' ? 'text-[#70C0B8]' : 'text-[#b40e0e]'}`}
                    >
                      {program.status}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {isAdding ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-left bg-[#fcfcfc] text-[#333333] font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      value={newUser.username}
                      placeholder="Type Program Name"
                      onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                      className="flex-2 h-[52px] w-[12rem] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />

                    <Select onValueChange={value => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger className="w-[8rem] !h-[52px] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Learner">Learner</SelectItem>
                          <SelectItem value="Program">Program</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select onValueChange={value => setNewUser({ ...newUser, status: value })}>
                      <SelectTrigger className="w-[8rem] !h-[52px] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => {
                        setIsAdding(false);
                        setTableData([...tableData, newUser]);
                        setNewUser({
                          username: '',
                          role: '',
                          status: '',
                          image: '',
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
                  colSpan={3}
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

export default UserRole;
