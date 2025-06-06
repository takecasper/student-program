import React from 'react';

import Image from 'next/image';
import { useState } from 'react';

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserRolesData } from '../types';
import AdminSidebar from './AdminSidebar';

import AddIcon from '../../../../../../public/svgs/add-white.svg';
import { ChevronDown } from 'lucide-react';

type ViewListProps = {
  setScreenView: React.Dispatch<React.SetStateAction<number>>;
};

type User = {
  name: string;
  avatar: string;
};

const initialTableData: (UserRolesData & { users: User[] })[] = [
  {
    id: '1',
    name: 'ADMINISTRATOR',
    numberOfUsers: 34,
    users: Array(3).fill({ name: 'Isabella Ding', avatar: '/avatar.png' }),
  },
  {
    id: '2',
    name: 'ADMINISTRATOR - BLUMETEST6',
    numberOfUsers: 1,
    users: [{ name: 'Isabella Ding', avatar: '/avatar.png' }],
  },
  {
    id: '3',
    name: 'ADMINISTRATOR - DUPLICATE - 2024-06-031t12:00:08',
    numberOfUsers: 1,
    users: [{ name: 'Isabella Ding', avatar: '/avatar.png' }],
  },
  {
    id: '4',
    name: 'BLUME ADMIN',
    numberOfUsers: 1,
    users: [{ name: 'Isabella Ding', avatar: '/avatar.png' }],
  },
];

const ViewList = ({ setScreenView }: ViewListProps) => {
  const [tableData] = useState(initialTableData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`relative h-[calc(100vh-103px)] w-full ${isSidebarOpen ? 'pr-[500px]' : ''}`}>
      <div className="p-6 h-full">
        {/* Header */}
        <div className="mt-4 flex justify-between items-center mb-8">
          <div>
            <h1 className="text-sm font-medium text-[#333333]">Users</h1>
          </div>

          <Button
            onClick={() => setScreenView(1)}
            className="h-[40px] flex items-center border cursor-pointer justify-between border-[#d9d9d9] bg-[#364699] rounded-[20px]"
          >
            Roles
            <AddIcon className="w-[14px] h-[14px]" />
          </Button>
        </div>

        <div className="w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#D9D9D91A] border-b border-[#f5f5f5]">
                <TableHead className="text-[#6c6c6c] font-medium w-[40%]">Role Name</TableHead>
                <TableHead className="text-[#6c6c6c] font-medium w-[40%]">
                  Number of Users
                </TableHead>
                <TableHead className="text-[#6c6c6c] font-medium w-[20%]">Default</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-b border-[#f5f5f5] cursor-pointer hover:bg-gray-50"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <TableCell className="text-[#333333DE] font-medium">
                    <div>{item.name}</div>
                  </TableCell>
                  <TableCell className="text-[#333333DE] font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {item.users.slice(0, 3).map((user, i) => (
                            <Image
                              key={i}
                              src={user.avatar}
                              alt={user.name}
                              width={24}
                              height={24}
                              className="rounded-full border-2 border-white"
                            />
                          ))}
                        </div>
                        <span className="bg-[#F5F5F5] px-2 py-1 rounded-full text-sm">
                          {item.numberOfUsers}
                        </span>
                        <ChevronDown className="w-[12px] h-[12px]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.users.map((user, i) => (
                          <div key={i} className="flex items-center gap-2 p-2">
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span>{user.name}</span>
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-[#333333DE] font-medium">
                    <div className="flex items-center gap-2">
                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/delete.svg'} alt="delete" />
                      </Button>

                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/edit.svg'} alt="edit" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default ViewList;
