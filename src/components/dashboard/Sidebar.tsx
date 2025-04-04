import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid } from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { HelpCenterCard } from "./HelpCenterCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

type DashboardSidebarProps = {
  user: {
    name: string;
    avatar: string;
  } | null;
  logout: () => void;
  children: ReactNode;
};

export default function DashboardSidebar({ user, logout, children }: DashboardSidebarProps) {
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to homepage after logout
  };

  return (
    <>
      <div className="w-[264px] bg-gray-100 border-r border-[#f5f5f5] flex flex-col">
        <Link
          href="/dashboard/user-profile"
          className="p-4 border-b border-[#f5f5f5] flex items-center gap-3"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-[#333333]">{user.name}</p>
            <p className="text-xs text-[#6c6c6c]">Toronto, Canada</p>
          </div>
        </Link>

        <nav className="flex-1 py-4">
          <div className="space-y-1 px-3">
            <SidebarNavItem
              icon={<LayoutGrid className="h-4 w-4" />}
              label="My Dashboard"
              href="/dashboard"
            />
            <SidebarNavItem
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="My Program"
              href="/dashboard/program"
            />
            <SidebarNavItem
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="My Calendar"
              href="/dashboard/calendar"
            />
          </div>
        </nav>

        <div className="mt-auto border-t border-[#f5f5f5]">
          <SidebarNavItem
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M12 15L12 2M12 2L8 6M12 2L16 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 22H16C19.3137 22 22 19.3137 22 16V12H18M2 12V16C2 19.3137 4.68629 22 8 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            label="Admission"
            isFooterItem={true}
            href="/dashboard/admission"
          />
          <SidebarNavItem
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 13.01H12M9 9.01H12M5.99 13H6.01M5.99 9H6.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            label="Marketplace"
            isFooterItem={true}
            href="/dashboard/marketplace"
          />
          <SidebarNavItem
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M17 16L21 12M21 12L17 8M21 12H9M9 22C7.34315 22 6 20.6569 6 19V16M9 2C7.34315 2 6 3.34315 6 5V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            label="Logout"
            isFooterItem={true}
            onClick={handleLogout}
          />
        </div>

        <HelpCenterCard />
      </div>

      {children}
    </>
  );
}
