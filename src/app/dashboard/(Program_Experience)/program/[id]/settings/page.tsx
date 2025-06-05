'use client';

import Image from 'next/image';
import { CircleUser } from 'lucide-react';
import { useEffect, useState } from 'react';

import AddEvaluationForm from './components/AddEvaluationForm';

import SiteSettings from './components/Site';
import UserRole from './components/RoleUser';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import GradeSheet from './components/GradeSheet';
import EvaluationForms from './components/EvaluationForms';
import CurriculumRotation from './components/RotationCurriculum';

import { useProgram } from '@/store/program';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

import { programCards } from '@/data/programCards';

export default function ProgramPage() {
  const program = useProgram(state => state.program);
  const setTitle = useBreadcrumbStore(state => state.setTitle);

  const [settingsView, setSettingsView] = useState<number>(0);
  const [subMenuSettingsView, setSubMenuSettingsView] = useState<number>(3);

  // For Course
  const [isConfiguring, setIsConfiguring] = useState<boolean>(false);

  // For Rotation
  const [isSettingUpRotation, setIsSettingUpRotation] = useState<boolean>(false);

  // For Evaluation Forms
  const [isSettingUpEvaluationForms, setIsSettingUpEvaluationForms] = useState<boolean>(false);

  useEffect(() => {
    setTitle(`Program / ${program ? `${program.name} - ${program.year} / Settings` : ''}`);
  }, [setTitle, program]);

  const menuItems = [
    {
      id: 0,
      label: 'Curriculum & Rotation',
      icon: <Image width={16} height={16} src="/svgs/golf_course.svg" alt="Golf Course" />,
      subMenus: programCards,
    },
    {
      id: 1,
      label: `Learner's List`,
      icon: <CircleUser color="#4e4e4e" width={16} height={16} />,
    },
    // {
    //   id: 2,
    //   label: 'Evaluation forms',
    //   icon: <Image width={16} height={16} src="/svgs/calendar_view_week.svg" alt="Form" />,
    // },
    // {
    //   id: 3,
    //   label: 'Grade sheet',
    //   icon: <Image width={16} height={16} src="/svgs/sports_score.svg" alt="Grade" />,
    // },
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

  const showSideBar = !isConfiguring && !isSettingUpRotation && !isSettingUpEvaluationForms;
  const isHidden = isSettingUpEvaluationForms;

  return (
    <div className="p-6 flex gap-2">
      {showSideBar && (
        <>
          <div className="basis-1/5 mt-[2rem]">
            <ul className="flex flex-col gap-2 ml-5">
              {menuItems.map(item => (
                <li key={item.id} className="relative">
                  <div>
                    {settingsView === item.id && (
                      <div className="w-[5px] h-[26px] bg-[#364699] absolute left-[5px] top-[16px] m-auto"></div>
                    )}

                    <Button
                      onClick={() => setSettingsView(item.id)}
                      className={`${settingsView === item.id ? '!bg-[#f5f5f5]' : 'bg-transparent'} h-[58px] cursor-pointer text-[#4e4e4e] text-[14px] font-medium hover:text-[#364699] w-full hover:bg-[#f5f5f5] flex items-center gap-2 justify-start !pl-[1rem]`}
                    >
                      {item.icon} {item.label}
                    </Button>
                  </div>

                  {item.subMenus && settingsView === item.id && (
                    <div>
                      {item.subMenus.map((subMenu, index) => (
                        <Button
                          key={index}
                          onClick={() => setSubMenuSettingsView(index)}
                          className={`${subMenuSettingsView === index ? '!bg-[#f5f5f5] text-[#364699]' : 'bg-transparent text-[#4e4e4e]'} h-[58px] cursor-pointer text-[14px] font-medium hover:text-[#364699] w-full hover:bg-[#f5f5f5] flex items-center gap-2 justify-between !pl-[1rem]`}
                        >
                          {subMenu.year}

                          <Switch className='data-[state=checked]:bg-[#364699]' id="airplane-mode" />

                          {/* {subMenu.status === 'COMPLETE' && (
                            <span className="text-[#70C0B8] text-xs font-bold px-2 py-2 rounded-[10px] bg-white border-[1px] border-[#D9D9D9]">
                              COMPLETE
                            </span>
                          )}
                          {subMenu.status === 'WIP' && (
                            <span className="text-[#F5CA66] text-xs font-bold px-2 py-2 rounded-[10px] bg-white border-[1px] border-[#D9D9D9]">
                              WIP
                            </span>
                          )} */}
                        </Button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[1px] bg-[#f5f5f5] h-auto"></div>
        </>
      )}

      {isSettingUpEvaluationForms && (
        <div className="basis-5/5">
          <AddEvaluationForm setIsSettingUpEvaluationForms={setIsSettingUpEvaluationForms} />
        </div>
      )}

      {/* Content */}
      <div
        className={`${isHidden ? 'hidden' : 'flex'} ${!showSideBar ? 'basis-5/5 ' : 'basis-4/5 '}`}
      >
        {settingsView === 0 && (
          <CurriculumRotation
            isConfiguring={isConfiguring}
            setIsConfiguring={setIsConfiguring}
            currentSelection={subMenuSettingsView}
            isSettingUpRotation={isSettingUpRotation}
            setIsSettingUpRotation={setIsSettingUpRotation}
            isSettingUpEvaluationForms={isSettingUpEvaluationForms}
            setIsSettingUpEvaluationForms={setIsSettingUpEvaluationForms}
          />
        )}

        {settingsView === 1 && <UserRole />}

        {settingsView === 2 && (
          <EvaluationForms
            isSettingUpEvaluationForms={isSettingUpEvaluationForms}
            setIsSettingUpEvaluationForms={setIsSettingUpEvaluationForms}
          />
        )}

        {settingsView === 3 && <GradeSheet />}

        {settingsView === 4 && <SiteSettings />}
      </div>
    </div>
  );
}
