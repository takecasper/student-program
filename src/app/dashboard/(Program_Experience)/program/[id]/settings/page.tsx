/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, CircleUser } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserRole from '@/components/programSettings/userRole';

import { useProgram } from '@/store/program';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

export default function ProgramPage() {
  const router = useRouter();

  const program = useProgram(state => state.program);
  const setTitle = useBreadcrumbStore(state => state.setTitle);

  const [settingsView, setSettingsView] = useState<number>(0);

  const handleViewContent = () => {};

  useEffect(() => {
    setTitle(`Program / ${program ? `${program.name} - ${program.year} / Settings` : ''}`);
  }, [setTitle, program]);

  const menuItems = [
    {
      id: 0,
      label: 'User & Role',
      icon: <CircleUser color="#4e4e4e" width={16} height={16} />,
    },
    {
      id: 1,
      label: 'Curriculum & Rotation',
      icon: <Image width={16} height={16} src="/svgs/golf_course.svg" alt="Golf Course" />,
    },
    {
      id: 2,
      label: 'Evaluation forms',
      icon: <Image width={16} height={16} src="/svgs/calendar_view_week.svg" alt="Form" />,
    },
    {
      id: 3,
      label: 'Grade sheet',
      icon: <Image width={16} height={16} src="/svgs/sports_score.svg" alt="Grade" />,
    },
    {
      id: 4,
      label: 'Site',
      icon: <Image width={16} height={16} src="/svgs/distance.svg" alt="Navigation" />,
    },
    {
      id: 5,
      label: 'MSPE letter',
      icon: <Image width={16} height={16} src="/svgs/mail.svg" alt="Mail" />,
    },
  ];

  return (
    <div className="p-6 px-20 flex gap-2">
      <div className="basis-1/5 mt-[2rem]">
        <ul className="flex flex-col gap-2 ml-5">
          {menuItems.map(item => (
            <li key={item.id} className="relative">
              {settingsView === item.id && (
                <div className="w-[5px] h-[26px] bg-[#364699] absolute left-[5px] top-0 bottom-0 m-auto"></div>
              )}

              <Button
                onClick={() => setSettingsView(item.id)}
                className={`${settingsView === item.id ? '!bg-[#f5f5f5]' : 'bg-transparent'} h-[58px] cursor-pointer text-[#4e4e4e] text-[14px] font-medium hover:text-[#364699] w-full hover:bg-[#f5f5f5] flex items-center gap-2 justify-start !pl-[1rem]`}
              >
                {item.icon} {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[1px] bg-[#f5f5f5] h-auto"></div>

      {/* Content */}
      <div className="basis-4/5">{settingsView === 0 && <UserRole />}</div>
    </div>
  );
}
