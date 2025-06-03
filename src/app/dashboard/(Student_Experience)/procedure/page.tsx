'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
} from '@/components/ui/table';
import AddNewForm from './components/AddNew';
import { Button } from '@/components/ui/button';
import SearchInput from './components/SearchInput';

interface Procedure {
  id: string;
  icon: string;
  name: string;
  description: string;
  dateEntered: {
    date: string;
    time: string;
  };
  dateOfProcedure: {
    date: string;
    time: string;
  };
  supervisor: {
    name: string;
    avatar: string;
  };
  status: string;
}

interface CompetencyGroup {
  id: string;
  name: string;
  recordCount: number;
  procedures: Procedure[];
  supervisor?: string;
  status?: string;
}

const mockCompetencies: CompetencyGroup[] = [
  {
    id: 'abdominal',
    name: 'Clinical Skill: Abdominal Exam',
    recordCount: 3,
    procedures: [
      {
        id: 'proc1',
        icon: '/svgs/procedure.svg',
        name: 'Procedure 1',
        description: 'Collaborate as a member of an nterprofessional<br />iteam',
        dateEntered: {
          date: 'Jan 28, 2025',
          time: '1:00 PM',
        },
        dateOfProcedure: {
          date: 'Feb 2, 2025',
          time: '3:00 PM',
        },
        supervisor: {
          name: 'Isabella Ding',
          avatar: '/avatar.png',
        },
        status: 'Approved',
      },
      {
        id: 'proc2',
        icon: '/svgs/procedure.svg',
        name: 'Procedure 2',
        description:
          'Document clinical encounters to adequately convey<br />iclinical reasoning and the rationale for decisions',
        dateEntered: {
          date: 'Jan 20, 2024',
          time: '2:00 PM',
        },
        dateOfProcedure: {
          date: 'Jan 19, 2024',
          time: '4:00 PM',
        },
        supervisor: {
          name: 'Isabella Ding',
          avatar: '/avatar.png',
        },
        status: 'Approved',
      },
      {
        id: 'proc3',
        icon: '/svgs/procedure.svg',
        name: 'Procedure 3',
        description: 'Enter and discuss orders/prescriptions',
        dateEntered: {
          date: 'Jan 25, 2024',
          time: '9:00 AM',
        },
        dateOfProcedure: {
          date: 'Jan 24, 2024',
          time: '11:00 AM',
        },
        supervisor: {
          name: 'Isabella Ding',
          avatar: '/avatar.png',
        },
        status: 'Approved',
      },
    ],
  },
  {
    id: 'anoscopy',
    name: 'Clinical Skill: Anoscopy',
    recordCount: 0,
    procedures: [],
    supervisor: '',
    status: '',
  },
  {
    id: 'behavior',
    name: 'Clinical Skill: Behavior, Normal or Abnormal',
    recordCount: 0,
    procedures: [],
    supervisor: '',
    status: '',
  },
];

export default function ProcedurePage() {
  const [open, setOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleRowClick = (competencyId: string) => {
    setExpandedRow(expandedRow === competencyId ? null : competencyId);
  };

  const handleAddNew = () => {
    setShowSidebar(true);
  };

  const handleHideSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="relative p-6  w-full min-h-[calc(100vh_-_103px)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-10">
        <h1 className="text-xl font-medium text-[#333333]">Procedure Log</h1>
        <Image src="/svgs/system_update.svg" alt="calendar" width={16} height={16} />
      </div>

      <div className="relative w-full px-10">
        {open && <SearchInput setOpen={setOpen} />}

        <Table>
          <TableHeader className="bg-[#D9D9D91A] cursor-pointer">
            <TableRow onClick={() => setOpen(true)} className="border-b border-[#f5f5f5]">
              <TableHead className="w-10 border-r border-[#f5f5f5]"></TableHead>
              <TableHead className="text-[#6c6c6c] font-medium border-r border-[#f5f5f5] px-2">
                Competency Name
              </TableHead>
              <TableHead className="text-[#6c6c6c] font-medium border-r border-[#f5f5f5] px-2 w-[140px]">
                Date Entered
              </TableHead>
              <TableHead className="text-[#6c6c6c] font-medium border-r border-[#f5f5f5] px-2 w-[140px]">
                Date of Procedure
              </TableHead>
              <TableHead className="text-[#6c6c6c] font-medium border-r border-[#f5f5f5] px-2 w-[140px]">
                Supervisor
              </TableHead>
              <TableHead className="text-[#6c6c6c] font-medium px-2 w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompetencies.map((competency, index) => (
              <>
                <TableRow
                  key={index}
                  className="border-b border-[#f5f5f5] cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(competency.id)}
                >
                  <TableCell className="py-4">
                    <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                      <Image src="/svgs/stars.svg" alt="clinical" width={16} height={16} />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {competency.name}
                    <div className="mt-2">
                      <Button variant="ghost" size="sm" className="text-xs text-[#364699]">
                        {competency.recordCount > 0
                          ? `${competency.recordCount} Recorded`
                          : 'View Details'}{' '}
                        {expandedRow === competency.id ? (
                          <ChevronUp className="h-3 w-3 ml-1" />
                        ) : (
                          <ChevronDown className="h-3 w-3 ml-1" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-[#f5f5f5] px-4 w-[140px]"></TableCell>
                  <TableCell className="border-r border-[#f5f5f5] px-4 w-[140px]"></TableCell>
                  <TableCell className="border-r border-[#f5f5f5] px-4">
                    {competency.supervisor && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src="/avatars/default.png"
                            alt={competency.supervisor}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span>{competency.supervisor}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-4">
                    {competency.status && <div className="text-[#00a59b]">{competency.status}</div>}
                  </TableCell>
                </TableRow>

                {/* Expanded Details */}
                {expandedRow === competency.id && (
                  <>
                    {competency.procedures.map(procedure => (
                      <TableRow key={procedure.id} className="bg-gray-50 border-b border-[#f5f5f5]">
                        <TableCell className="py-4"></TableCell>
                        <TableCell className="font-medium border-r border-[#f5f5f5] py-4 px-4">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-[8px] bg-[#f5f5f5] flex items-center justify-center">
                              <Image
                                src={procedure.icon || '/placeholder.svg'}
                                alt="procedure"
                                width={12}
                                height={12}
                              />
                            </div>
                            <div>
                              <div>{procedure.name}</div>
                              <div
                                className="text-sm text-gray-500 mt-1"
                                dangerouslySetInnerHTML={{ __html: procedure.description }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="border-r border-[#f5f5f5] py-4 px-4 w-[140px]">
                          <div>{procedure.dateEntered.date}</div>
                          <div className="text-sm text-gray-500">{procedure.dateEntered.time}</div>
                        </TableCell>
                        <TableCell className="border-r border-[#f5f5f5] py-4 px-4 w-[140px]">
                          <div>{procedure.dateOfProcedure.date}</div>
                          <div className="text-sm text-gray-500">
                            {procedure.dateOfProcedure.time}
                          </div>
                        </TableCell>
                        <TableCell className="border-r border-[#f5f5f5] py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <Image
                                src={procedure.supervisor.avatar || '/placeholder.svg'}
                                alt={procedure.supervisor.name}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                            <span>{procedure.supervisor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-4">
                          <div className="text-white bg-[#00A59B] font-semibold rounded-[10px] px-4 py-2 flex items-center gap-1">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="white"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_1770_27501"
                                style={{ maskType: 'alpha' }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="16"
                                height="16"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="15"
                                  height="15"
                                  fill="#D9D9D9"
                                  stroke="white"
                                />
                              </mask>
                              <g mask="url(#mask0_1770_27501)">
                                <path
                                  d="M6.66667 10.9327L4 8.26602L4.93333 7.33268L6.66667 9.06602L11.0667 4.66602L12 5.59935L6.66667 10.9327Z"
                                  fill="white"
                                  fill-opacity="1"
                                />
                                <path
                                  d="M11.9824 5.59961L6.66699 10.915L4.01758 8.26562L4.93262 7.34961L6.66699 9.08398L6.67578 9.0752L11.0664 4.68359L11.9824 5.59961Z"
                                  stroke="white"
                                  stroke-opacity="1"
                                  stroke-width="0.5"
                                />
                              </g>
                            </svg>
                            {procedure.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Add New Button inside expanded section */}
                    <TableRow className="bg-gray-50 border-b border-[#f5f5f5]">
                      <TableCell colSpan={6} className="py-4">
                        <Button
                          onClick={handleAddNew}
                          variant="link"
                          className="text-[#364699] hover:no-underline ml-12 cursor-pointer"
                        >
                          <div className="bg-[#364699] cursor-pointer p-2 rounded-[8px] mr-2">
                            <Plus className="w-4 h-4 text-white" />
                          </div>
                          Add New
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {showSidebar && (
        <div className="absolute top-0 right-0 bottom-0 z-40 flex justify-end h-full">
          <div className="bg-white w-[485px] py-[20px] px-[24px] h-full overflow-y-auto shadow-lg border-l border-[#f5f5f5] animate-in slide-in-from-right">
            <div className="mb-10 flex items-center justify-between">
              <h5 className="text-[16px] font-bold text-[#333333DE] p-0">
                CLINICAL EXPERIENCE LOGBOOK
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

            {/* Content here */}
            <AddNewForm />
          </div>
        </div>
      )}
    </div>
  );
}
