'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ViewCourse from './components/viewCourse';
import { Card, CardContent } from '@/components/ui/card';

import { useProgram } from '@/store/program';
import { useBreadcrumbStore } from '@/store/breadcrumbs';

import { programCards } from '@/data/programCards';

import CalendarSVG from '../../../../../../public/svgs/calendar_month.svg';

type Course = {
  year: string;
  course: string;
};

export default function ProgramPage() {
  const router = useRouter();

  const [showCourse, setShowCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<null | Course>(null);

  const program = useProgram(state => state.program);
  const setTitle = useBreadcrumbStore(state => state.setTitle);

  const handleSettingsRedirect = () => {
    if (program) {
      router.push(`/dashboard/program/${program.id}/settings`);
    }
  };

  const handleCalenderRedirect = () => {
    router.push('/dashboard/calendar');
  };

  useEffect(() => {
    setTitle(`Program / ${program ? `${program.name} - ${program.year}` : ''}`);
  }, [setTitle, program]);

  return (
    <div className="p-6 px-20">
      {/* Header */}
      {showCourse ? (
        <ViewCourse
          setShowCourse={setShowCourse}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-sm font-medium text-[#333333]">{`${program ? `${program.name} - ${program.year}` : ''}`}</h1>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleSettingsRedirect}
                className="group h-9 w-9 hover:w-auto hover:px-2 border-[#d9d9d9] cursor-pointer"
              >
                <Settings className="h-4 w-4 text-[#6c6c6c]" />
                <p className="group-hover:flex hidden text-[12px] text-[#858585]">Configure</p>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {programCards.map((card, index) => (
              <Card
                key={index}
                className={`${
                  card.lock ? 'opacity-50 pointer-events-none' : ''
                } shadow gap-0 hover:shadow-md border-1 border-[#D9D9D9] overflow-hidden flex flex-col justify-start p-2 relative rounded-[10px]`}
              >
                {card.lock && (
                  <div
                    className={`absolute top-4 right-4 text-xs font-medium w-[33px] h-[30px] flex items-center justify-center rounded-[10px] z-10 ${
                      card.status === 'CURRENT'
                        ? 'bg-white text-[#364699]'
                        : 'bg-white text-[#6c6c6c]'
                    }`}
                  >
                    <LockKeyhole width={16} height={16} color="#4e4e4e" />
                  </div>
                )}

                <div
                  className={`relative ${index === 0 ? 'border-b-2 border-[#D9D9D9] rounded-[20px]' : ''}`}
                >
                  <Image
                    width={500}
                    height={300}
                    quality={100}
                    alt="program"
                    src="/program.png"
                    priority={index < 2}
                    className="w-full h-40 object-cover rounded-[2px]"
                  />

                  <span
                    className={`${card.status === 'CURRENT' ? 'text-[#00A59B]' : 'text-[#333333DE]'} font-bold block border border-[#D9D9D9] py-1 px-2 w-max text-[12px] rounded-[10px] bg-white absolute bottom-3 right-3`}
                  >
                    {card.status}
                  </span>
                </div>

                <CardContent className="p-4 px-0 flex-grow">
                  <h3 className="text-sm font-medium text-[#333333DE] mb-4">{card.year}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      {card.content.map((item, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowCourse(true);
                            setSelectedCourse({
                              year: card.year,
                              course: item.name,
                            });
                          }}
                          className={`${item.name === 'CLINICAL PHASE' ? 'px-0 border-none shadow-none' : 'px-[6px] border-[#d9d9d9]'} ${item.lock ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} rounded-[8px] w-auto text-xs h-6  text-black font-bold`}
                        >
                          {item.name === 'CLINICAL PHASE' ? (
                            <>
                              <Image
                                width={24}
                                height={24}
                                alt="clinical phase"
                                className="object-fit"
                                src="/svgs/Clinical Icon.svg"
                              />
                              CLINICAL PHASE
                            </>
                          ) : (
                            item.name
                          )}
                        </Button>
                      ))}
                    </div>

                    <Button
                      onClick={handleCalenderRedirect}
                      className="!p-0 !px-0 cursor-pointer bg-[#fff] hover:bg-gray-300 w-[30px] h-[30px] flex items-center justify-center rounded-[4px] border border-[#3333331A]"
                    >
                      <CalendarSVG
                        width={24}
                        height={24}
                        className="object-fit w-[24px] h-[24px]"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
