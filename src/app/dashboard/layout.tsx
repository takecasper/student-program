'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/Header';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    router.push('/signin');
    return null;
  }

  return (
    <div className="flex h-screen bg-[#ffffff]">
      <DashboardSidebar logout={logout}>
        <div className="flex-1 overflow-hidden">
          <div className="flex bg-gray-100 justify-center p-4 h-full">
            <main className="w-full h-full bg-white rounded-xl shadow-sm flex flex-col">
              <div className="p-4 border-b">
                <DashboardHeader />
              </div>
              <div className="flex-1 overflow-auto">{children}</div>
            </main>
          </div>
        </div>
      </DashboardSidebar>
    </div>
  );
}
