/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import TodoListItem from '../ToDoListItem';
import SummaryCard from './SummaryCard';
import CourseCard from './CourseCard';
import CategoryCard from './CategoryCard';
import SuggestedCourseCard from './SuggestedCourseCard';
import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
// import SummaryDropCard from './SummaryDropCard';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';
import SummaryDropCard from './SummaryDropCard';
import ScheduleListItem from '../ScheduleListItem';

const ratingOptions = [
  { label: 'Day View', value: 'day' },
  { label: 'Weekly View', value: 'weekly' },
];

export default function DashboardContent() {
  const { user } = useAuth();
  const [scheduleState, setScheduleState] = useState(false);
  if (!user) return null;
  const [viewMode, setViewMode] = useState<string>('day');

  return (
    <div className="p-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-[#333333]">DASHBOARD</h2>
          <div className="flex gap-4">
            <div className="flex items-center justify-center rounded-[16px] border border-[#f0f0f0] bg-white px-2 py-2 shadow-sm">
              <div className="flex-1">
                <SummaryCard iconSrc="hotel_class.svg" value={1} title="Ongoing Course" />
              </div>
              <div className="w-px h-10 bg-[#eee] mx-6" />
              <div className="flex-1">
                <SummaryCard iconSrc="hotel_class.svg" value={3} title="Ongoing Course" />
              </div>
            </div>
            <SummaryDropCard iconSrc="hotel_class.svg" title="Add/Drop Scheduling" />
          </div>

          <div className="space-y-4 flex flex-col w-[700px] ">
            <h2 className="text-lg font-medium text-[#333333]">MY COURSE</h2>

            <Tabs defaultValue="s2">
              <TabsList className="bg-transparent border-b border-[#f5f5f5] justify-start p-0 h-auto border-none">
                {[
                  { value: 's1', label: 'S1' },
                  { value: 's2', label: 'S2 - current' },
                  { value: 's3', label: 'S3' },
                  { value: 's4', label: 'S4' },
                ].map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-[10px] py-1 px-4 data-[state=active]:bg-[#364699] data-[state=active]:text-white border border-[#d9d9d9] bg-white text-[#333333] mr-2"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CourseCard
                number="01"
                title="Clinical Anatomy"
                dateRange="July 2024 - Sept 20, 2024"
                progress={100}
                isCompleted={true}
              />
              <CourseCard
                number="02"
                title="Immunology"
                dateRange="Jan 2025 - May 2025"
                progress={65}
                isCompleted={false}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-[#333333]">SUGGESTED COURSES & TESTS</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SuggestedCourseCard />

              <CategoryCard
                imageSrc="/category1.png"
                category="CATEGORY"
                title="Social Skill"
                description="Test - 1 Hour Session"
              />

              <CategoryCard
                imageSrc="/category1.png"
                category="CATEGORY"
                title="Social Skill"
                description="Test - 2 Hours Session"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pr-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#555] tracking-wide uppercase">
              Schedule / To Do&apos;s
            </h2>
            <div className="cursor-pointer w-32">
              <Select.Root value={viewMode} onValueChange={(value: string) => setViewMode(value)}>
                <Select.Trigger
                  className="cursor-pointer inline-flex items-center justify-between w-full rounded-md border border-gray-300 px-2 py-1 bg-white text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={viewMode}
                >
                  <Select.Value />
                  <Select.Icon className="ml-2">
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="z-50 w-[var(--radix-select-trigger-width)] rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden"
                    position="popper"
                  >
                    <Select.Viewport className="text-sm">
                      {ratingOptions.map(option => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="group flex justify-between items-center p-3 cursor-pointer select-none hover:bg-[#364699] hover:text-white data-[state=checked]:bg-gray-100 data-[state=checked]:text-[#333333DE]"
                        >
                          <Select.ItemText className="font-medium text-xs">
                            {option.label}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3">
              {scheduleState
                ? [
                    { day: 'Wed', date: '28', time: '09:00 - 11:00', isTest: true },
                    { day: 'Thu', date: '29', time: '09:00 - 11:00', isForm: true },
                    { day: 'Fri', date: '30', time: '09:00 - 11:00', isSession: true },
                    { day: 'Sat', date: '31', time: '09:00 - 11:00', isSession: true },
                    { day: 'Mon', date: '02', time: '09:00 - 11:00', isSession: true },
                    { day: 'Tue', date: '03', time: '09:00 - 11:00', isSession: true },
                    { day: 'Wed', date: '04', time: '09:00 - 11:00', isSession: true },
                    { day: 'Thu', date: '05', time: '09:00 - 11:00', isSession: true },
                    { day: 'Fri', date: '06', time: '09:00 - 11:00', isSession: true },
                    { day: 'Sat', date: '07', time: '09:00 - 11:00', isSession: true },
                    { day: 'Sun', date: '08', time: '09:00 - 11:00', isSession: true },
                    { day: 'Mon', date: '09', time: '09:00 - 11:00', isSession: true },
                  ].map((item, index) => (
                    <TodoListItem
                      key={index}
                      day={item.day}
                      date={item.date}
                      time={item.time}
                      sessionName="Session Name"
                      courseName="Course Name"
                      isTest={item.isTest}
                      isForm={item.isForm}
                      isSession={item.isSession}
                    />
                  ))
                : [
                    {
                      day: 'Wed',
                      date: '28',
                      sessionName: 'Prenatal Screening Panel',
                      time: '9:00am–11:00am',
                      location: 'Online',
                      type: 'Lecture',
                      instructor: 'Allen',
                    },
                    {
                      day: 'Thu',
                      date: '29',
                      sessionName: 'Health Session',
                      time: '1:00pm–2:30pm',
                      location: 'Room 204',
                      type: 'Seminar',
                      instructor: 'Jane',
                    },
                    {
                      day: 'Fri',
                      date: '30',
                      sessionName: 'Nutrition Workshop',
                      time: '10:00 am – 12:00 pm',
                      location: 'Online',
                      type: 'Workshop',
                      instructor: 'Michael',
                    },
                    {
                      day: 'Fri',
                      date: '30',
                      sessionName: 'Nutrition Workshop',
                      time: '10:00 am – 12:00 pm',
                      location: 'Online',
                      type: 'Workshop',
                      instructor: 'Michael',
                    },
                    {
                      day: 'Fri',
                      date: '30',
                      sessionName: 'Nutrition Workshop',
                      time: '10:00 am – 12:00 pm',
                      location: 'Online',
                      type: 'Workshop',
                      instructor: 'Michael',
                    },
                    {
                      day: 'Fri',
                      date: '30',
                      sessionName: 'Nutrition Workshop',
                      time: '10:00 am – 12:00 pm',
                      location: 'Online',
                      type: 'Workshop',
                      instructor: 'Michael',
                    },
                    {
                      day: 'Fri',
                      date: '30',
                      sessionName: 'Nutrition Workshop',
                      time: '10:00 am – 12:00 pm',
                      location: 'Online',
                      type: 'Workshop',
                      instructor: 'Michael',
                    },
                  ].map((item, index) => <ScheduleListItem key={index} {...item} />)}
            </div>
          </ScrollArea>

          <div className="fixed bottom-6 right-6 z-50">
            <ChatbotInterface />
          </div>
        </div>
      </div>
    </div>
  );
}
