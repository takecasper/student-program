import React from 'react';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Plus, SendHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UserData = {
  id: string;
  username: string;
  role: string;
  status: string;
  email: string;
  image: string;
};

const initialTableData: UserData[] = [
  {
    id: '1',
    username: 'Isabella Ding',
    email: 'Isabellading@gmail.com',
    role: 'Learner',
    status: 'Active',
    image: '/images/avatar.png',
  },
  {
    id: '2',
    username: 'Isabella Ding',
    email: 'Isabellading@gmail.com',
    role: 'Learner',
    status: 'Active',
    image: '/images/avatar.png',
  },
  {
    id: '3',
    username: 'Isabella Ding',
    email: 'Isabellading@gmail.com',
    role: 'Learner',
    status: 'Active',
    image: '/images/avatar.png',
  },
];

const UserRole = () => {
  const headerCheckboxRef = useRef<HTMLButtonElement>(null);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tableData, setTableData] = useState<UserData[]>(initialTableData);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<UserData>({
    username: '',
    role: '',
    status: '',
    email: '',
    image: '',
    id: crypto.randomUUID(),
  });

  const allIds = tableData.map(row => row.id);
  const allSelected = selectedRows.size === tableData.length;
  const partiallySelected = selectedRows.size > 0 && !allSelected;

  const toggleAll = (checked: boolean) => {
    setSelectedRows(checked ? new Set(allIds) : new Set());
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRemoveUser = (id: string) => {
    setTableData(prev => prev.filter(user => user.id !== id));
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  useEffect(() => {
    const input = headerCheckboxRef.current?.querySelector('input');
    if (input) {
      input.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  return (
    <div className='w-full'>
      <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-4">USER & ROLE</h4>

      <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[50px] bg-[#fbfbfb] border-[#f5f5f5]">
                <div className="w-full flex items-center justify-center">
                  <Checkbox
                    checked={allSelected}
                    ref={headerCheckboxRef}
                    className="cursor-pointer"
                    onCheckedChange={checked => toggleAll(Boolean(checked))}
                  />
                </div>
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Name
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Email
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((program, index) => (
              <TableRow
                key={index}
                className="border-b border-[#f5f5f5] relative"
                onMouseEnter={() => setHoveredRow(program.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="w-[50px]">
                  <div className="w-full flex items-center justify-center">
                    <Checkbox
                      className="cursor-pointer"
                      checked={selectedRows.has(program.id)}
                      onCheckedChange={() => toggleRow(program.id)}
                    />
                  </div>
                </TableCell>
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
                  <p className="m-0 text-[14px] font-normal">{program.email}</p>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium">
                  <div className="flex items-center justify-between w-full">
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

                    {hoveredRow === program.id && (
                      <Button
                        onClick={() => handleRemoveUser(program.id)}
                        className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-full h-[24px] px-2 flex items-center gap-1 text-black text-xs"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {isAdding ? (
              <TableRow>
                <TableCell
                  colSpan={4}
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

                    <Input
                      type="text"
                      value={newUser.email}
                      placeholder="Type Email"
                      onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                      className="flex-2 h-[52px] w-[5rem] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />

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
                          email: '',
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
