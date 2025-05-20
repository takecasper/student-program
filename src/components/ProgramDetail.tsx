'use client';

import { FileText, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { useState } from 'react';
import CourseDetailSidebar from '@/components/CourseDetailSidebar';

interface ProgramDetailProps {
  selectedView: string;
  onBack: () => void;
}

export default function ProgramDetail({ selectedView, onBack }: ProgramDetailProps) {
  const [showSessions, setShowSessions] = useState(false);
  const [showWomensHealthDetails, setShowWomensHealthDetails] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Get title and breadcrumb based on selectedView
  const title = selectedView.toUpperCase().replace('-', ' - ');
  const breadcrumb = title;

  // Determine if this is a clinical phase view
  const isClinical = selectedView === 'year3-s3' || selectedView === 'year4-clinical';

  // Determine if we should show the academic sessions table
  const showAcademicSessions = !selectedView.startsWith('year2');

  const toggleSessions = () => {
    setShowSessions(!showSessions);
  };

  // Sessions data for Women's Health
  const womensHealthSessions = [
    {
      name: 'Arm & Intro to Forearm',
      location: 'H&S 403',
      date: 'Jan 28, 2025',
      time: '1:00 PM - 3:00 PM',
    },
    {
      name: 'Arm & Intro to Forearm',
      location: 'H&S 403',
      date: 'Jan 28, 2025',
      time: '1:00 PM - 3:00 PM',
    },
    {
      name: 'Arm & Intro to Forearm',
      location: 'H&S 403',
      date: 'Jan 28, 2025',
      time: '1:00 PM - 3:00 PM',
    },
  ];

  // Add this data for Women's Health
  const womensHealthData = {
    courseName: "Women's Health",
    startDate: 'Jan 28, 2025',
    endDate: 'Feb 2, 2025',
    gradYear: '2026',
    facilitators: 'None',
    objectives: [
      'To perform a comprehensive history and physical examination with special emphasis on mental status, mobility, medications and functional status.',
      'To understand the physiological changes associated with pregnancy and childbirth.',
      'To identify common gynecological conditions and their management.',
      'To develop skills in obstetric and gynecological examinations.',
      "To understand the psychosocial aspects of women's health.",
    ],
  };

  const handleWomensHealthClick = () => {
    setShowWomensHealthDetails(!showWomensHealthDetails);
  };

  // Add this to pass the expanded state between components
  const handleSidebarExpand = (expanded: boolean) => {
    setSidebarExpanded(expanded);
  };

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-[#364699]" onClick={onBack}>
              Medical Program
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="text-[#6c6c6c]">
              {breadcrumb}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-medium text-[#333333]">{title}</h1>
          {isClinical && <div className="text-sm text-[#364699] mt-1">Clinical Phase</div>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 border-[#d9d9d9]">
            <LayoutGrid className="h-4 w-4 text-[#6c6c6c]" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 border-[#d9d9d9]">
            <FileText className="h-4 w-4 text-[#6c6c6c]" />
          </Button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 ${
          showWomensHealthDetails
            ? sidebarExpanded
              ? 'lg:grid-cols-[25%_75%]'
              : 'lg:grid-cols-[60%_40%]'
            : 'lg:grid-cols-1'
        } gap-6`}
      >
        <div>
          {/* Rotations Table */}
          <div className={showAcademicSessions ? 'mb-10' : ''}>
            <Table>
              <TableHeader className="bg-[#D9D9D91A]">
                <TableRow className="border-b border-[#f5f5f5]">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="text-[#6c6c6c] font-medium ">Course Name</TableHead>
                  {!sidebarExpanded ? (
                    <>
                      <TableHead className="text-[#6c6c6c] font-medium ">Location</TableHead>
                      <TableHead className="text-[#6c6c6c] font-medium ">From</TableHead>
                      <TableHead className="text-[#6c6c6c] font-medium ">To</TableHead>
                      <TableHead className="text-[#6c6c6c] font-medium">Evaluation Form</TableHead>
                    </>
                  ) : (
                    <TableHead className="text-[#6c6c6c] font-medium" colSpan={4}></TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Year 2 Rotations */}
                {selectedView.startsWith('year2') && (
                  <>
                    <TableRow
                      className="border-b border-[#f5f5f5] cursor-pointer hover:bg-gray-50"
                      onClick={handleWomensHealthClick}
                    >
                      <TableCell className="py-4">
                        <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                          <Image src="/hotel_class.svg" alt="star" width={16} height={16} />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        Women&apos;s Health
                        {!sidebarExpanded ? (
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
                        ) : (
                          <div className="text-sm text-gray-500 mt-1">
                            Jan 28, 2025 - Feb 2, 2025
                          </div>
                        )}
                      </TableCell>
                      {!sidebarExpanded ? (
                        <>
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
                          </TableCell>
                          <TableCell></TableCell>
                        </>
                      ) : (
                        <TableCell></TableCell>
                      )}
                    </TableRow>

                    {/* Sessions as separate rows */}
                    {showSessions &&
                      womensHealthSessions.map((session, index) => (
                        <TableRow key={index} className="border-b border-[#f5f5f5] bg-gray-50 ">
                          <TableCell className="py-4 "></TableCell>
                          <TableCell className="flex flex-col font-medium text-sm">
                            {session.name}
                            <span className="bg-[#F5CA66] w-20 flex gap-1 px-2 py-1 rounded-full text-xs text-[#3C3C3C] font-medium">
                              <Image src="/svgs/lecture.svg" width={12} height={12} alt="lecture" />{' '}
                              Lecture
                            </span>
                          </TableCell>
                          <TableCell>{session.location}</TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ))}

                    <TableRow className="border-b border-[#f5f5f5]">
                      <TableCell className="py-4">
                        <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                          <Image src="/hotel_class.svg" alt="star" width={16} height={16} />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        Physiology
                        {sidebarExpanded && (
                          <div className="text-sm text-gray-500 mt-1">
                            Oct 1, 2023 - Nov 15, 2023
                          </div>
                        )}
                      </TableCell>
                      {!sidebarExpanded ? (
                        <>
                          <TableCell></TableCell>
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
                          <TableCell></TableCell>
                        </>
                      ) : (
                        <TableCell colSpan={4}></TableCell>
                      )}
                    </TableRow>
                    <TableRow className="border-b border-[#f5f5f5]">
                      <TableCell className="py-4">
                        <div className="w-10 h-10 rounded-[16px] bg-[#f5f5f5] flex items-center justify-center">
                          <Image src="/hotel_class.svg" alt="star" width={16} height={16} />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        Death and Dying
                        {sidebarExpanded && (
                          <div className="text-sm text-gray-500 mt-1">
                            Oct 1, 2023 - Nov 15, 2023
                          </div>
                        )}
                      </TableCell>
                      {!sidebarExpanded ? (
                        <>
                          <TableCell></TableCell>
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
                          <TableCell></TableCell>
                        </>
                      ) : (
                        <TableCell colSpan={4}></TableCell>
                      )}
                    </TableRow>
                  </>
                )}

                {/* Other year rotations would go here */}
              </TableBody>
            </Table>
          </div>

          {/* Academic Sessions Table - Only show for non-Year 2 views */}
          {showAcademicSessions && (
            <div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#f5f5f5]">
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="text-[#6c6c6c] font-medium">Academic Session</TableHead>
                    <TableHead className="text-[#6c6c6c] font-medium">Location</TableHead>
                    <TableHead className="text-[#6c6c6c] font-medium">From</TableHead>
                    <TableHead className="text-[#6c6c6c] font-medium">To</TableHead>
                    <TableHead className="text-[#6c6c6c] font-medium">Evaluation Form</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{/* Academic sessions for other years would go here */}</TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Women's Health Details Sidebar */}
        {showWomensHealthDetails && (
          <div className="h-fit">
            <CourseDetailSidebar
              courseName={womensHealthData.courseName}
              startDate={womensHealthData.startDate}
              endDate={womensHealthData.endDate}
              gradYear={womensHealthData.gradYear}
              facilitators={womensHealthData.facilitators}
              objectives={womensHealthData.objectives}
              onClose={() => setShowWomensHealthDetails(false)}
              onExpand={handleSidebarExpand}
            />
          </div>
        )}
      </div>
    </div>
  );
}
