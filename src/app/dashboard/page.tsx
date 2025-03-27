"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardContent from "@/components/dashboard/Content";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useAuth();

  // Add avatar to user object
  const userWithAvatar = {
    ...user,
    name: user?.name || "User",
    email: user?.email || "",
    avatar: "/avatar.png",
  };

  return <DashboardContent user={userWithAvatar} activeTab={activeTab} setActiveTab={setActiveTab} />;
}
