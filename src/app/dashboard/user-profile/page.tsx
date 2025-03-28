"use client";
import UserProfile from "@/components/dashboard/UserProfile";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  return <UserProfile user={user} activeTab={activeTab} setActiveTab={setActiveTab} />;
}
