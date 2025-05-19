/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';

import { UserRolesData } from '../types';

import AddIcon from '../../../../../../public/svgs/add-white.svg';

type ViewListProps = {
  setScreenView: React.Dispatch<React.SetStateAction<number>>;
};

const initialTableData: UserRolesData[] = [
  { id: '1', name: 'ADMINISTRATOR', numberOfUsers: 33 },
  { id: '2', name: 'ADMINISTRATOR - BLUMETEST6', numberOfUsers: 33 },
  { id: '3', name: 'ADMINISTRATOR - DUPLICATE - 2024-06-031t12:00:08', numberOfUsers: 33 },
  { id: '4', name: 'BLUME ADMIN', numberOfUsers: 33 },
];

const ViewList = ({ setScreenView }: ViewListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tableData, setTableData] = useState<UserRolesData[]>(initialTableData);

  return (
    <div className="p-6 px-20 relative h-full max-w-[730px] m-auto">
      {/* Header */}
      <div className="mt-4  flex justify-between items-center mb-8">
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

      <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#f5f5f5]">
              <TableHead className="text-[#6c6c6c] font-medium">Role Name</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Number of Users</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index} className="border-b border-[#f5f5f5] cursor-pointer">
                <TableCell className="text-[#333333DE] font-medium gap-3">
                  <div className="gap-3">{item.name}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium gap-3">
                  <div className="gap-3">{item.numberOfUsers}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium gap-3">
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
  );
};

export default ViewList;
