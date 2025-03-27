"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  // Add avatar to user object
  const userWithAvatar = {
    ...user,
    name: user?.name || "User",
    email: user?.email || "",
    avatar: "/avatar.png",
  };

  return (
    <div className="flex h-screen bg-[#ffffff]">
      <DashboardSidebar user={userWithAvatar} logout={logout}>
        <div className="flex-1 overflow-auto">
          <div className="flex bg-gray-100 justify-center p-6">
            <main className="w-full h-screen bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b">
                <DashboardHeader />
              </div>
              <div className="p-10">{children}</div>
            </main>
          </div>
        </div>
      </DashboardSidebar>
    </div>
  );
}
