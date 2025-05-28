import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Button } from '../ui/button';
import { SidebarNavItem } from './SidebarNavItem';
import { HelpCenterCard } from './HelpCenterCard';
import MarketPlacePopover from './AdmissionPopver';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useUserStore } from '@/store/user';

import SchoolIcon from '../../../public/svgs/workflow.svg';
import WorkflowIcon from '../../../public/svgs/school.svg';
import DashboardIcon from '../../../public/svgs/dashboard.svg';
import GolfCourseIcon from '../../../public/svgs/golf_course.svg';
import CalendarIcon from '../../../public/svgs/calendar_month.svg';

type DashboardSidebarProps = {
  logout: () => void;
  children: ReactNode;
};

export default function DashboardSidebar({ logout, children }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const userStore = useUserStore(state => state.user);

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
              <Image alt="Program Experience Logo" width={140} height={40} src="/svgs/logo.svg" />
            </Link>

            <Button className="bg-[#D9D9D9] hover:bg-[#bcb8b8] cursor-pointer w-[18px] h-full rounded-[5px] p-0">
              <Image alt="Arrow down" width={8} height={5} src="/svgs/arrow-down.svg" />
            </Button>
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
            <SidebarNavItem
              label={userType === 'student' ? 'My Calendar' : 'Calendar'}
              href="/dashboard/calendar"
              icon={
                <CalendarIcon
                  className={`${pathname === '/dashboard/calendar' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
                />
              }
            />

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
                      className={`${pathname === '/dashboard/workflow' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
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
              <SchoolIcon
                className={`${pathname === '/dashboard/my-admission' || pathname === '/dashboard/admission' ? 'fill-[#364799]' : 'fill-[#818181]'}`}
              />
            }
          />

          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
          >
            <SidebarNavItem
              label="Marketplace"
              isFooterItem={true}
              href="/dashboard/marketplace"
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
                    d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
                  />
                  <path
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
                  />
                  <path
                    strokeWidth="1.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13.01H12M9 9.01H12M5.99 13H6.01M5.99 9H6.01"
                  />
                </svg>
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
