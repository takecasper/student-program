import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Button } from '../ui/button';
import { SidebarNavItem } from './SidebarNavItem';
import { HelpCenterCard } from './HelpCenterCard';
import MarketPlacePopover from './AdmissionPopver';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { RadioGroup } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useUserStore } from '@/store/user';

import WorkflowIcon from '../../../public/svgs/workflow.svg';
import SchoolIcon from '../../../public/svgs/school.svg';
import DashboardIcon from '../../../public/svgs/dashboard.svg';
import GolfCourseIcon from '../../../public/svgs/golf_course.svg';
import CalendarIcon from '../../../public/svgs/calendar_month.svg';
import HatIcon from '../../../public/svgs/hat.svg';
import StoreIcon from '../../../public/svgs/store.svg';

type DashboardSidebarProps = {
  logout: () => void;
  children: ReactNode;
};

const universities = [
  {
    name: 'University of Toronto',
    logo: '/svgs/university-of-toronto-logo.svg',
  },
  {
    name: 'Queen University',
    logo: '/images/queen-university-logo.png',
    active: true,
  },
  {
    name: 'Mc Master University',
    logo: '/images/mcmaster-university.png',
  },
  {
    name: 'King University',
    logo: '/images/Kings.png',
  },
];

export default function DashboardSidebar({ logout, children }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const userStore = useUserStore(state => state.user);

  const [selected, setSelected] = useState('Queen University');
  const [isOpen, setIsOpen] = useState(false);

  if (userStore === null) return null;

  const handleLogout = async () => {
    await logout();
    router.push('/'); // Redirect to homepage after logout
  };

  const userType = userStore?.type;

  console.log('pathname', pathname);

  return (
    <>
      <div className="w-[180px] bg-gray-100 border-r border-[#f5f5f5] flex flex-col">
        {userType === 'student' ? (
          <Link
            href="/dashboard/user-profile"
            className="p-4 pr-0 border-b border-[#f5f5f5] flex items-center gap-3"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={userStore.avatar} alt={userStore.name} />
              <AvatarFallback>
                {userStore.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-[#333333]">{userStore?.name}</p>
              <p className="text-xs text-[#6c6c6c]">{userStore?.address}</p>
            </div>
          </Link>
        ) : (
          <div className="flex w-full justify-between p-4 pr-0 border-b border-[#f5f5f5] items-center gap-3">
            <Link href="/dashboard">
              <Image
                className="max-h-[40px] object-contain"
                alt="Program Experience Logo"
                width={140}
                height={40}
                src={universities.find(u => u.name === selected)!.logo}
              />
            </Link>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-[#D9D9D9] hover:bg-[#bcb8b8] cursor-pointer w-[18px] h-full rounded-[5px] p-0">
                  <Image alt="Arrow down" width={8} height={5} src="/svgs/arrow-down.svg" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  {/* Top selected university logo */}
                  <div className="flex justify-center mb-2">
                    {universities.find(u => u.name === selected)?.logo && (
                      <Image
                        width={140}
                        height={40}
                        alt={selected + ' Logo'}
                        className="object-contain"
                        src={universities.find(u => u.name === selected)!.logo}
                      />
                    )}
                  </div>

                  <div className="border-t" />

                  {/* Radio group */}
                  <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    className="py-2 pb-0 gap-3"
                  >
                    {universities.map(uni => (
                      <div
                        key={uni.name}
                        className="flex items-center justify-between rounded-md px-3 py-2 m-0 hover:bg-muted transition"
                        onClick={() => setSelected(uni.name)}
                      >
                        <div className="flex items-center space-x-3 cursor-pointer">
                          {/* Custom styled circle */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition
          ${selected === uni.name ? 'bg-[#6A6EEC] border-[#364699]' : 'bg-white border-[#D9D9D9]'}`}
                          >
                            {selected === uni.name && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          <span className="text-[#333333DE] text-[16px]">{uni.name}</span>
                        </div>

                        {selected === uni.name && (
                          <span className="text-sm text-muted-foreground">Active</span>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        <nav className="flex-1 py-4">
          <div className="space-y-1 pl-3 pr-0">
            <SidebarNavItem
              href="/dashboard"
              label="My Dashboard"
              icon={
                <DashboardIcon
                  className={` ${pathname === '/dashboard' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                />
              }
            />
            <SidebarNavItem
              label={userType === 'student' ? 'My Program' : 'Program'}
              href={`/dashboard/${userType === 'student' ? 'my-program' : 'program'}`}
              // icon={<Image src="/svgs/golf_course.svg" width={16} height={16} alt="Program" />}
              icon={
                <GolfCourseIcon
                  className={`${pathname.includes('program') ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                />
              }
            />

            {userType === 'student' && (
              <SidebarNavItem
                label={'My Calendar'}
                href="/dashboard/calendar"
                icon={
                  <CalendarIcon
                    className={`${pathname === '/dashboard/calendar' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                  />
                }
              />
            )}

            {userType === 'student' && (
              <SidebarNavItem
                label="Procedure Log"
                href="/dashboard/procedure"
                icon={
                  <Image src="/svgs/schedule.svg" width={16} height={16} alt="procedure logs" />
                }
              />
            )}

            {userType === 'program_experience' && (
              <>
                <SidebarNavItem
                  label="Log"
                  href="/dashboard/logs"
                  icon={
                    <Image src="/svgs/schedule.svg" width={16} height={16} alt="schedule logs" />
                  }
                />
                <SidebarNavItem
                  label="Users & Roles"
                  href="/dashboard/useroles"
                  icon={
                    <Image src="/svgs/settings.svg" width={16} height={16} alt="account roles" />
                  }
                />
                <SidebarNavItem
                  label="Workflow"
                  href="/dashboard/workflow"
                  icon={
                    <WorkflowIcon
                      className={`${pathname === '/dashboard/work' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                    />
                  }
                />
              </>
            )}
          </div>
        </nav>

        <div className="mt-auto pl-3 border-t border-[#f5f5f5]">
          <SidebarNavItem
            label="Admission"
            isFooterItem={true}
            href={`${userType === 'student' ? '/dashboard/my-admission' : '/dashboard/admission'}`}
            icon={
              userType === 'program_experience' ? (
                <HatIcon
                  className={`${pathname === '/dashboard/my-admission' || pathname === '/dashboard/admission' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                />
              ) : (
                <SchoolIcon
                  className={`${pathname === '/dashboard/my-admission' || pathname === '/dashboard/admission' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                />
              )
            }
          />

          <div className="relative" onMouseEnter={() => setIsOpen(true)}>
            <SidebarNavItem
              label="Marketplace"
              isFooterItem={true}
              href="/dashboard/marketplace"
              icon={
                <StoreIcon
                  className={`${pathname === '/dashboard/marketplace' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                />
              }
            />

            {isOpen && <MarketPlacePopover setIsOpen={setIsOpen} />}
          </div>

          <SidebarNavItem
            label="Logout"
            isFooterItem={true}
            onClick={handleLogout}
            icon={
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16L21 12M21 12L17 8M21 12H9M9 22C7.34315 22 6 20.6569 6 19V16M9 2C7.34315 2 6 3.34315 6 5V8"
                />
              </svg>
            }
          />
        </div>

        <HelpCenterCard />
      </div>

      {children}
    </>
  );
}
