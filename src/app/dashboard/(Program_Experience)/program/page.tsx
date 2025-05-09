'use client';

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

import { useProgram } from '@/store/program';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

import { ProgramData } from '@/types/program';

const initialTableData: ProgramData[] = [
  { id: '1', name: 'Medicine', year: '2017 / 08' },
  { id: '2', name: 'Law', year: '2017 / 08' },
  { id: '3', name: 'Art', year: '2017 / 08' },
];

export default function ProgramPage() {
  const router = useRouter();

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ProgramData[]>(initialTableData);
  const [newProgram, setNewProgram] = useState<ProgramData>({
    name: '',
    year: '',
    id: crypto.randomUUID(),
  });

  const setData = useProgram(state => state.setData);
  const setTitle  = useBreadcrumbStore(state => state.setTitle);

  setTitle?.('Program');

  const handleRedirect = (program: ProgramData) => {
    setData(program);
    router.push(`/dashboard/program/${program.id}`);
  };

  return (
    <div className="p-6 px-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-sm font-medium text-[#333333]">MY PROGRAM</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 border-[#d9d9d9]">
            <AlignLeft className="h-4 w-4 text-[#6c6c6c]" />
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#f5f5f5]">
              <TableHead className="text-[#6c6c6c] font-medium">Program Name</TableHead>
              <TableHead className="text-[#6c6c6c] font-medium">Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((program, index) => (
              <TableRow
                onClick={() => handleRedirect(program)}
                key={index}
                className="border-b border-[#f5f5f5] cursor-pointer"
              >
                <TableCell className="text-[#333333DE] font-medium flex items-center gap-3">
                  <div className=" flex items-center gap-3">
                    <div className="bg-[#F5F5F5] rounded-[10px] w-[50px] h-[50px] flex items-center justify-center">
                      <Image src="/svgs/golf_course.svg" width={16} height={16} alt="Program" />
                    </div>
                    {program.name}
                  </div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium">
                  <div className=" flex items-center gap-3">
                    <div className="bg-[#fff] border border-[#333] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center">
                      <Image src="/svgs/clarify.svg" width={13} height={12} alt="Program" />
                    </div>

                    {program.year}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {isAdding ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-left bg-[#fcfcfc] text-[#333333] font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      value={newProgram.name}
                      placeholder="Type Program Name"
                      onChange={e => setNewProgram({ ...newProgram, name: e.target.value })}
                      className="flex-2 h-[52px] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />
                    <Input
                      type="text"
                      placeholder="Year"
                      value={newProgram.year}
                      onChange={e => setNewProgram({ ...newProgram, year: e.target.value })}
                      className="flex-1 h-[52px] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                    />
                    <Button
                      onClick={() => {
                        setTableData([...tableData, newProgram]);
                        setIsAdding(false);
                        setNewProgram({ name: '', year: '', id: crypto.randomUUID() });
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
                  colSpan={2}
                  className="text-left bg-[#fcfcfc] text-[#333333] font-medium"
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
}
