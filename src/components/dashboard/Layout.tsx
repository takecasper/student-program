import { ReactNode } from 'react';
import DashboardSidebar from './Sidebar';
import DashboardHeader from './Header';
import { useAuth } from '@/context/AuthContext';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  // Add avatar to user object
  const userWithAvatar = user
    ? {
        ...user,
        avatar: '/avatar.png',
      }
    : null;

  return (
    <div className="flex h-screen bg-[#ffffff]">
      <DashboardSidebar user={userWithAvatar} logout={logout}>
        <div className="flex-1 overflow-auto">
          <DashboardHeader />
          <main className="p-8">{children}</main>
        </div>
      </DashboardSidebar>
    </div>
  );
}
